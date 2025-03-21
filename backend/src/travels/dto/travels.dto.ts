import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class BuyTicketDto {
  @ApiProperty({ example: 12, description: 'Id of the selected travel' })
  @IsInt()
  @IsNotEmpty()
  id: number;
}