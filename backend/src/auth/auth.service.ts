import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    this.logger.log(`Login attempt for email: ${email}`);

    const user = await this.prisma.users.findUnique({
      where: { email },
    });

    if (!user) {
      this.logger.warn(`Login failed: User not found for email: ${email}`);
      throw new UnauthorizedException('Geçersiz kimlik bilgileri');
    }

    if (password !== user.password) {
      this.logger.warn(`Login failed: Incorrect password for email: ${email}`);
      throw new UnauthorizedException('Geçersiz kimlik bilgileri');
    }

    const payload = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName, 
    };

    const token = this.jwtService.sign(payload);
    this.logger.log(`Login successful for email: ${email}`);
    
    return { access_token: token };
  }
}
