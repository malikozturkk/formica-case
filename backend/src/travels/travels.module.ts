import { Module } from '@nestjs/common';
import { TravelsController } from './travels.controller';
import { TravelsService } from './travels.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [TravelsController],
  providers: [TravelsService, PrismaService],
})
export class TravelsModule {}
