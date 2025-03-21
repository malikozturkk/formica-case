import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TravelsTransformer } from './travels.transformer';
import { BuyTicketDto } from './dto/travels.dto';
import {  Users } from '@prisma/client';

@Injectable()
export class TravelsService {
  private readonly logger = new Logger(TravelsService.name);
  constructor(private prisma: PrismaService) {}

  async getTravels() {
    const travels = await this.prisma.travels.findMany({
      orderBy: {
        departureTime: 'asc',
      },
    });

    return travels.map(TravelsTransformer.transform);
  }

  async buyTicket({ id }: BuyTicketDto, user: Users) {
    this.logger.log(`User ${user.email} is attempting to purchase ticket for travel ID ${id}.`);

    const travel = await this.prisma.travels.findUnique({ where: { id } });

    if (!travel) {
      throw new NotFoundException(`Travel with ID ${id} not found.`);
    }

    this.logger.log(`Deducting ${travel.amount} from user ${user.email}'s balance.`);
    const updatedUser = await this.prisma.users.update({
      where: { id: user.id },
      data: { balance: { decrement: travel.amount } },
      select: { balance: true },
    });

    this.logger.log(`Creating a new ticket for user ${user.email} for travel ID ${id}.`);
    const ticket = await this.prisma.tickets.create({
      data: {
        ticketNumber: Math.floor(192837465 + Math.random() * 123987465),
        userId: user.id,
        travelId: id,
      },
    });

    return {
      message: 'Ticket purchased successfully',
      ticket,
      newBalance: updatedUser.balance
    };
}
}
