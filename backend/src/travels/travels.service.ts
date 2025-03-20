import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class TravelsService {
  constructor(private prisma: PrismaService) {}

  async getTravels() {
    const travels = await this.prisma.travels.findMany({
      orderBy: {
        departureTime: 'asc',
      },
    });

    return travels.map((travel) => {
      const duration = this.calculateDuration(travel.departureTime, travel.arrivalTime);
      return {
        ...travel,
        duration,
      };
    });
  }

  private calculateDuration(departureTime: Date, arrivalTime: Date): { hours: number; minutes: number } {
    const diff = arrivalTime.getTime() - departureTime.getTime();
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return { hours, minutes };
  }
}