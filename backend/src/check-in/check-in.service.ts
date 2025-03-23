import { Injectable, Logger } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TicketStatus, Users } from '@prisma/client';
import { CheckInValidationPipe } from './check-in-validation.pipe';
import { TicketGateway } from 'src/gateways/ticket.gateway';

@Injectable()
export class CheckInService {
  private readonly logger = new Logger(CheckInService.name);
  constructor(
    private prisma: PrismaService,
    private checkInValidationPipe: CheckInValidationPipe,
    private ticketGateway: TicketGateway,
  ) {}

  async checkIn(surname: string, ticketNumber: number, user: Users) {
    this.logger.log(`User ${user.firstName} (ID: ${user.id}) is attempting to check in.`);

    const ticket = await this.checkInValidationPipe.transform({ surname, ticketNumber, user });

    const updatedTicket = await this.updateTicketStatus(ticket.ticketNumber);
    this.ticketGateway.sendTicketUpdate(updatedTicket.ticketNumber, updatedTicket.status);
    return updatedTicket;
  }

  private async updateTicketStatus(ticketNumber: number) {
    const updatedTicket = await this.prisma.tickets.update({
      where: { ticketNumber },
      data: { status: TicketStatus.CHECKEDIN },
    });

    this.logger.log(`Ticket ID ${ticketNumber} successfully checked in.`);
    return updatedTicket;
  }
}
