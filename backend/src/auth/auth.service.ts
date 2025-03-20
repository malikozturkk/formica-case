import { Injectable, Logger, UnauthorizedException } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';
import { PrismaService } from 'src/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService
  ) {}

  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    this.logger.log(`Login attempt for email: ${email}`);

    const user = await this.prisma.users.findUnique({
      where: { email },
    });

    if (!user || password !== user.password) {
      this.logger.warn(`Login failed for email: ${email}`);
      throw new UnauthorizedException('Geçersiz kimlik bilgileri');
    }

    const tokens = await this.generateTokens(user.id, user.email, user.firstName, user.lastName, user.balance);
    await this.saveRefreshToken(user.id, tokens.refresh_token);

    this.logger.log(`Login successful for email: ${email}`);
    
    return tokens;
  }

  async refreshToken(refreshToken: string) {
    try {
      const payload = this.jwtService.verify(refreshToken, {
        secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      });

      const user = await this.prisma.users.findUnique({
        where: { id: payload.id },
      });

      if (!user || user.refreshToken !== refreshToken) {
        throw new UnauthorizedException('Geçersiz refresh token');
      }

      const tokens = await this.generateTokens(user.id, user.email, user.firstName, user.lastName, user.balance);
      await this.saveRefreshToken(user.id, tokens.refresh_token);

      return tokens;
    } catch (error) {
      throw new UnauthorizedException('Refresh token geçersiz veya süresi dolmuş');
    }
  }

  private async generateTokens(userId: number, email: string, firstName: string, lastName: string, balance: number) {
    const payload = { id: userId, email, firstName, lastName, balance };

    const accessToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_SECRET'),
      expiresIn: '1h',
    });

    const refreshToken = this.jwtService.sign(payload, {
      secret: this.configService.get<string>('JWT_REFRESH_SECRET'),
      expiresIn: '30d',
    });

    return { access_token: accessToken, refresh_token: refreshToken };
  }

  private async saveRefreshToken(userId: number, refreshToken: string) {
    await this.prisma.users.update({
      where: { id: userId },
      data: { refreshToken },
    });
  }
}
