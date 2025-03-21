import { Body, Controller, Get, Post, Request, UseGuards, UsePipes } from '@nestjs/common';
import { TravelsService } from './travels.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { BuyTicketDto } from './dto/travels.dto';
import { Users } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { TravelsPipe } from './travels.pipe';

@ApiTags('Travels')
@Controller({ path: 'travels', version: 'v1' })
export class TravelsController {
  constructor(private readonly travelsService: TravelsService) {}

  @Get()
  @ApiOperation({ summary: 'Get grouped travel data', description: 'Groups travels by departure location and sorts by date and time' })
  async getTravels() {
    return this.travelsService.getTravels();
  }

  @Post("buy")
  @UseGuards(AuthGuard)
  @UsePipes(TravelsPipe)
  @ApiOperation({ summary: 'Buy a ticket', description: 'Purchases a ticket for a travel' })
  @ApiBody({ 
      type: BuyTicketDto, 
      description: 'Buy ticket payload' 
  })
  async buyTicket(
      @Body() buyTicketDto: BuyTicketDto, 
      @Request() req: { user: Users }
  ) {
      return this.travelsService.buyTicket(buyTicketDto, req.user);
  }
}