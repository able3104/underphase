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

  rating: number;
}
