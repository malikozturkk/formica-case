import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class LoginDto {
  @ApiProperty({ example: 'user@example.com', description: 'User email address' })
  @IsString()
  @IsNotEmpty()
  email: string;

  @ApiProperty({ example: '123123', description: 'User password' })
  @IsString()
  @IsNotEmpty()
  password: string;
}