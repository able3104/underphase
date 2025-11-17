import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class getAgencyDetailResDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점 고유 id',
    example: 5,
  })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점명',
    example: '실버실버 대리점',
  })
  agency_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점 주소',
    example: '부산진구 개금동',
  })
  address: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '대리점 전화번호',
    example: '01012312355',
  })
  phone_number: number;

  //운영시간을 시작 시간과 마감 시간으로 분리
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '',
  })
  start_time: string;

  end_time: string;

  rating: number;

  desciption: string;
}
