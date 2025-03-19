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
}