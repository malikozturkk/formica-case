import { Module } from '@nestjs/common';
import { CheckInController } from './check-in.controller';
import { CheckInService } from './check-in.service';
import { PrismaService } from 'src/prisma.service';
import { AuthModule } from 'src/auth/auth.module'; 
import { CheckInValidationPipe } from './check-in-validation.pipe';
import { GatewayModule } from 'src/gateways/gateway.module';

@Module({
  imports: [AuthModule, GatewayModule], 
  controllers: [CheckInController],
  providers: [CheckInService, PrismaService, CheckInValidationPipe],
})
export class CheckInModule {}
