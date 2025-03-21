import { Module } from '@nestjs/common';
import { TravelsController } from './travels.controller';
import { TravelsService } from './travels.service';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module'; 

@Module({
  imports: [AuthModule], 
  controllers: [TravelsController],
  providers: [TravelsService, PrismaService],
})
export class TravelsModule {}
