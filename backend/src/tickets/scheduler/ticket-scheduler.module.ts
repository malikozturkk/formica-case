import { Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { TicketSchedulerService } from './ticket-scheduler.service';
import { PrismaService } from 'src/prisma.service';
import { GatewayModule } from 'src/gateways/gateway.module';

@Module({
  imports: [ScheduleModule.forRoot(), GatewayModule],
  providers: [TicketSchedulerService, PrismaService],
})
export class TicketSchedulerModule {}
