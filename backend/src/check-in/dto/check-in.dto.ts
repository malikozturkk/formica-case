import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class CheckInDto {
  @ApiProperty({ example: "öztürk", description: 'Surname of the owner ticket' })
  @IsString()
  @IsNotEmpty()
  surname: string;

  @ApiProperty({ example: 12345, description: 'PNR of the owner ticket' })
  @IsNotEmpty()
  @Type(() => Number) 
  @IsInt({ message: 'PNR must be an integer' })
  pnr: number;
}