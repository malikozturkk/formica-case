import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TicketSchedulerService } from './ticket-scheduler.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  imports: [ScheduleModule.forRoot()],
  providers: [TicketSchedulerService, PrismaService],
})
export class TicketSchedulerModule {}
