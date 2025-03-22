import { Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { PrismaService } from 'src/prisma.service';
import { TicketStatus } from '@prisma/client';
import { toZonedTime } from 'date-fns-tz';

@Injectable()
export class TicketSchedulerService {
  private readonly logger = new Logger(TicketSchedulerService.name);

  constructor(private readonly prisma: PrismaService) {}

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
      const checkedInTickets = travel.tickets
        .filter((ticket) => ticket.status === TicketStatus.CHECKEDIN)
        .map((ticket) => ticket.id);

      const acquiredTickets = travel.tickets
        .filter((ticket) => ticket.status === TicketStatus.ACQUIRED)
        .map((ticket) => ticket.id);

      if (checkedInTickets.length > 0) {
        await this.prisma.tickets.updateMany({
          where: { id: { in: checkedInTickets } },
          data: { status: TicketStatus.USED },
        });
        this.logger.log(`Marked ${checkedInTickets.length} tickets as USED for travel ID: ${travel.id}`);
      }

      if (acquiredTickets.length > 0) {
        await this.prisma.tickets.updateMany({
          where: { id: { in: acquiredTickets } },
          data: { status: TicketStatus.EXPIRED },
        });
        this.logger.log(`Marked ${acquiredTickets.length} tickets as EXPIRED for travel ID: ${travel.id}`);
      }
    }
  }
}
