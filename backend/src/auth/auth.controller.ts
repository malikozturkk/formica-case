import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiBody } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Authentication')
@Controller({ path: 'auth', version: 'v1' })
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User Login', description: 'Authenticate user with email and password' })
  @ApiBody({ 
    type: LoginDto, 
    description: 'User login payload' 
  })
  login(@Body() loginDto: LoginDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh-token')
  @ApiOperation({ summary: 'Refresh Access Token', description: 'Generate a new access token using refresh token' })
  refreshToken(@Body('refresh_token') refreshToken: string) {
    return this.authService.refreshToken(refreshToken);
  }
}
