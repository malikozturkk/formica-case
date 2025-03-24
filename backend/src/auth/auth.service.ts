import { Injectable, Logger, UnauthorizedException } from "@nestjs/common";
import { LoginDto } from "./dto/login.dto";
import { PrismaService } from "src/prisma.service";
import { JwtService } from "@nestjs/jwt";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class AuthService {
    private readonly logger = new Logger(AuthService.name);
    constructor(
        private readonly prisma: PrismaService,
        private readonly jwtService: JwtService,
        private readonly configService: ConfigService
    ) {}

    async login({ email, password }: LoginDto) {
        this.logger.log(`Login attempt for email: ${email}`);

        const user = await this.prisma.users.findUnique({ where: { email } });
        if (!user || password !== user.password) {
            this.logger.warn(`Login failed for email: ${email}`);
            throw new UnauthorizedException("Invalid credentials");
        }

        return this.generateAndSaveTokens(user);
    }

    async refreshToken(refreshToken: string) {
        try {
            const payload = this.jwtService.verify(refreshToken, {
                secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
            });

            const user = await this.prisma.users.findUnique({
                where: { id: payload.id },
            });

            if (!user || user.refreshToken !== refreshToken) {
              throw new UnauthorizedException("Invalid refresh token");
            }

            return this.generateAndSaveTokens(user);
        } catch {
          throw new UnauthorizedException(
            "Refresh token is invalid or has expired"
        );
        }
    }

    private async generateAndSaveTokens(user: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        balance: number;
    }) {
        const tokens = this.generateTokens(user);
        await this.saveRefreshToken(user.id, tokens.refresh_token);
        this.logger.log(`Tokens issued for user ID: ${user.id}`);
        return tokens;
    }

    private generateTokens({
        id,
        email,
        firstName,
        lastName,
        balance,
    }: {
        id: number;
        email: string;
        firstName: string;
        lastName: string;
        balance: number;
    }) {
        const payload = { id, email, firstName, lastName, balance };

        return {
            access_token: this.jwtService.sign(payload, {
                secret: this.configService.get<string>("JWT_SECRET"),
                expiresIn: "1d",
            }),
            refresh_token: this.jwtService.sign(payload, {
                secret: this.configService.get<string>("JWT_REFRESH_SECRET"),
                expiresIn: "30d",
            }),
        };
    }

    private async saveRefreshToken(userId: number, refreshToken: string) {
        await this.prisma.users.update({
            where: { id: userId },
            data: { refreshToken },
        });
    }
}
