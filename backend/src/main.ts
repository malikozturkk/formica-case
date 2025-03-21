import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.CLIENT_BASE_URL || 'http://formica-case.local',
    credentials: true,
  });

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    whitelist: true,  
    forbidNonWhitelisted: true, 
  }));

  const config = new DocumentBuilder()
    .setTitle('Train Ticket App')
    .setDescription('This Swagger document defines the backend flow for purchasing train tickets. It outlines the endpoints, request/response structures, and authentication details required for the train ticket purchasing process.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger', app, document);

  await app.listen(process.env.PORT ?? 4000, '0.0.0.0');
}
bootstrap();