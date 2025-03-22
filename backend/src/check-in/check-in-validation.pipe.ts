import { PipeTransform, Injectable, BadRequestException, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TicketStatus, Users } from '@prisma/client';
import { toZonedTime } from 'date-fns-tz';

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
    const timeZone = 'Europe/Istanbul';
    const now = new Date();
    const istanbulNow = toZonedTime(now, timeZone);
  
    const ticket = await this.prisma.tickets.findFirst({
      where: { 
        ticketNumber,
        status: TicketStatus.ACQUIRED,
        userId: user.id,
        travel: {
          departureTime: { gte: istanbulNow }
        }
      },
      include: { user: true, travel: true },
    });
  
    if (!ticket) {
      throw new NotFoundException('Ticket not found or expired.');
    }

    const normalizedSurname = this.normalizeString(surname);
    const normalizedLastName = this.normalizeString(ticket.user.lastName.trim());
    if (normalizedSurname !== normalizedLastName) {
      throw new BadRequestException('Surname does not match the ticket holder.');
    }

    return ticket; 
  }
}
