import { Injectable, Logger } from '@nestjs/common';
import { Users } from '@prisma/client';
import { PrismaService } from 'src/prisma.service';
import { TravelsTransformer } from 'src/travels/travels.transformer';

@Injectable()
export class TicketsService {
  private readonly logger = new Logger(TicketsService.name);
  constructor(private prisma: PrismaService) {}

  async getAllTickets(user: Users) {
    this.logger.log(`Get all tickets for user ID ${user.id}`)
    const tickets = await this.prisma.tickets.findMany({
        where: { userId: user.id },
        include: { travel: true },
    });
    
    return tickets.map(ticket => ({
        ...ticket,
        travel: ticket.travel ? TravelsTransformer.transform(ticket.travel) : null,
    }));
  }
}
