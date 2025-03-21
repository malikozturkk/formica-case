import {
    ArgumentMetadata,
    BadRequestException,
    Inject,
    Injectable,
    NotFoundException,
    PipeTransform,
  } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Users } from '@prisma/client';
  import { PrismaService } from 'src/prisma.service';

  interface AuthenticatedRequest extends Request {
      user: Users;
    }
  
  @Injectable()
  export class TravelsPipe implements PipeTransform {
    constructor(private readonly prisma: PrismaService, @Inject(REQUEST) protected readonly request: AuthenticatedRequest) {}
  
    async transform(value: any, metadata: ArgumentMetadata) {
      const { id } = value;
      const user = this.request.user
  
      const travel = await this.prisma.travels.findUnique({ where: { id } });
  
      if (!travel) {
        throw new NotFoundException(`Travel with ID ${id} not found.`);
      }
  
      if (user.balance < travel.amount) {
        throw new BadRequestException(
          `Insufficient balance. Current balance: ${user.balance}, required: ${travel.amount}`,
        );
      }
  
      return { id, user, travel };
    }
  }
  