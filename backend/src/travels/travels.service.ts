import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { TravelsTransformer } from './travels.transformer';

@Injectable()
export class TravelsService {
  constructor(private prisma: PrismaService) {}

  async getTravels() {
    const travels = await this.prisma.travels.findMany({
      orderBy: {
        departureTime: 'asc',
      },
    });

    return travels.map(TravelsTransformer.transform);
  }
}
