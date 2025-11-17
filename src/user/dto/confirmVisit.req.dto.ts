import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class confirmVisitReqDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '예약 고유 id',
    example: 123,
  })
  reservation_id: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: '해당 판매점 방문 가능 여부',
    example: true,
  })
  is_visitable: boolean;
}
