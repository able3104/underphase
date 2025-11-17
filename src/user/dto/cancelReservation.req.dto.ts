import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class cancelReservationReqDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '예약 고유 id',
    example: 123,
  })
  reservation_id: number;
}
