import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { PrismaService } from './prisma.service';
import { PrismaModule } from './prisma.module';
import { TravelsModule } from './travels/travels.module';

@Module({
  imports: [AuthModule, PrismaModule, TravelsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
