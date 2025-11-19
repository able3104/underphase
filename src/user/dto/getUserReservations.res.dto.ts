import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class getUserReservationsResDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '예약 고유 id',
    example: 123,
  })
  reservation_id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점 명',
    example: '실버실버 대리점',
  })
  agency_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '개통 예약 내역 상태',
    example: 'Pending',
  })
  status: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점 방문 시간',
    example: '2025-12-03 14:00',
  })
  visit_time: string;
}
