import { Controller, Get } from '@nestjs/common';
import { TravelsService } from './travels.service';
import { ApiTags, ApiOperation } from '@nestjs/swagger';

@ApiTags('Travels')
@Controller({ path: 'travels', version: 'v1' })
export class TravelsController {
  constructor(private readonly travelsService: TravelsService) {}

  @Get()
  @ApiOperation({ summary: 'Get grouped travel data', description: 'Groups travels by departure location and sorts by date and time' })
  async getTravels() {
    return this.travelsService.getTravels();
  }
}