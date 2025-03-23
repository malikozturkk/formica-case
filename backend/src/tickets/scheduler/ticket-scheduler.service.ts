import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma.service';
import { TicketStatus } from '@prisma/client';
import { toZonedTime } from 'date-fns-tz';
import { TicketGateway } from 'src/gateways/ticket.gateway';

@Injectable()
export class TicketSchedulerService {
  private readonly logger = new Logger(TicketSchedulerService.name);

  constructor(
    private readonly prisma: PrismaService,
    private readonly ticketGateway: TicketGateway,
  ) {}

  @Cron('*/1 * * * *')
  async checkAndUpdateTicketStatuses() {
    const timeZone = 'Europe/Istanbul';
    const now = new Date();
    const istanbulNow = toZonedTime(now, timeZone);

    this.logger.log(`Checking ticket statuses for -> ${istanbulNow} tickets`);

    const travels = await this.prisma.travels.findMany({
      where: {
        departureTime: { lte: istanbulNow },
        tickets: {
          some: {
            status: { in: [TicketStatus.ACQUIRED, TicketStatus.CHECKEDIN] },
          },
        },
      },
      include: {
        tickets: true,
      },
    });

    for (const travel of travels) {
      const checkedInTickets = travel.tickets.filter((ticket) => ticket.status === TicketStatus.CHECKEDIN);
      const acquiredTickets = travel.tickets.filter((ticket) => ticket.status === TicketStatus.ACQUIRED);

      if (checkedInTickets.length > 0) {
        await this.prisma.tickets.updateMany({
          where: { id: { in: checkedInTickets.map((t) => t.id) } },
          data: { status: TicketStatus.USED },
        });

        checkedInTickets.forEach((ticket) => {
          this.ticketGateway.sendTicketUpdate(ticket.ticketNumber, TicketStatus.USED);
        });

        this.logger.log(`Marked ${checkedInTickets.length} tickets as USED`);
      }

      if (acquiredTickets.length > 0) {
        await this.prisma.tickets.updateMany({
          where: { id: { in: acquiredTickets.map((t) => t.id) } },
          data: { status: TicketStatus.EXPIRED },
        });

        acquiredTickets.forEach((ticket) => {
          this.ticketGateway.sendTicketUpdate(ticket.ticketNumber, TicketStatus.EXPIRED);
        });

        this.logger.log(`Marked ${acquiredTickets.length} tickets as EXPIRED`);
      }
    }
  }
}
