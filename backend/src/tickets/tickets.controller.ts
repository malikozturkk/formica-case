import { Controller, Get, Param, Request, UseGuards } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { Users } from '@prisma/client';

@ApiTags('Tickets')
@Controller({ path: 'tickets', version: 'v1' })
export class TicketsController {
  constructor(private readonly ticketsService: TicketsService) {}

  @Get()
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get All My Tickets', description: 'Get all the train tickets that belong to me' })
  async getAllTickets(@Request() req: { user: Users }) {
    return this.ticketsService.getAllTickets(req.user);
  }


  @Get(':id')
  @UseGuards(AuthGuard)
  @ApiOperation({ summary: 'Get Ticket by Id', description: 'Get my ticket with id' })
  async getTicket(@Param('id') ticketNumber: string, @Request() req: { user: Users }) {
    return this.ticketsService.getTicket(Number(ticketNumber), req.user);
  }
}