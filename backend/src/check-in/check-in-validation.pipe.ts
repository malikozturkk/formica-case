import { PipeTransform, Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TicketStatus, Users } from '@prisma/client';

@Injectable()
export class CheckInValidationPipe implements PipeTransform {
  constructor(private readonly prisma: PrismaService) {}

  private normalizeString(str: string): string {
    return str
      .normalize('NFD') 
      .replace(/[\u0300-\u036f]/g, '') 
      .toLowerCase();
  }

  async transform(value: { surname: string; ticketNumber: number; user: Users }) {
    const { surname, ticketNumber, user } = value;
    
    const ticket = await this.prisma.tickets.findUnique({
      where: { ticketNumber },
      include: { user: true },
    });

    if (!ticket || ticket.status !== TicketStatus.ACQUIRED) {
      throw new NotFoundException('Ticket not found.');
    }

    if (ticket.userId !== user.id) {
      throw new UnauthorizedException('This ticket does not belong to the user.');
    }

    const normalizedSurname = this.normalizeString(surname);
    const normalizedLastName = this.normalizeString(ticket.user.lastName.trim());
    if (normalizedSurname !== normalizedLastName) {
      throw new BadRequestException('Surname does not match the ticket holder.');
    }

    return ticket; 
  }
}
