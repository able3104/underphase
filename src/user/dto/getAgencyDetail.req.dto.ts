import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class getAgencyDetailReqDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점 고유 id',
    example: 5,
  })
  id: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '요금제 금액',
    example: 55000,
  })
  rating: number;
}
