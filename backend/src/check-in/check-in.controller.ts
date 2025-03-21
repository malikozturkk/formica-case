import { Body, Controller, Post, Request, UseGuards } from '@nestjs/common';
import { CheckInService } from './check-in.service';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { Users } from '@prisma/client';
import { AuthGuard } from 'src/auth/auth.guard';
import { CheckInDto } from './dto/check-in.dto';

@ApiTags('Check-in')
@Controller({ path: 'check-in', version: 'v1' })
export class CheckInController {
  constructor(private readonly checkInService: CheckInService) {}

  @Post()
  @UseGuards(AuthGuard)
  @ApiOperation({ 
    summary: 'Check-in for travel', 
    description: 'Registers the user for a trip by purchasing a ticket and confirming check-in.' 
  })
  @ApiBody({ 
    type: CheckInDto, 
    description: 'Details required to purchase a ticket and check-in for travel.' 
  })
  async checkIn(
      @Body() checkInDto: CheckInDto, 
      @Request() req: { user: Users }
  ) {
      const { surname, pnr } = checkInDto
      return this.checkInService.checkIn(surname, pnr, req.user);
  }
}