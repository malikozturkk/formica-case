import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { PrismaModule } from './prisma.module';
import { TravelsModule } from './travels/travels.module';
import { TicketsModule } from './tickets/tickets.module';
import { CheckInModule } from './check-in/check-in.module';
import { TicketSchedulerModule } from './tickets/scheduler/ticket-scheduler.module';

@Module({
  imports: [AuthModule, PrismaModule, TravelsModule, TicketsModule, CheckInModule, TicketSchedulerModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
