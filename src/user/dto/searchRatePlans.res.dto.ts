import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class searchRatePlansResDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '요금제 명',
    example: '5G Slim',
  })
  plan_name: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '요금제 가격',
    example: 55000,
  })
  price: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '매월 사용가능 데이터량',
    example: '110GB',
  })
  data: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '통신사명',
    example: 'SKT',
  })
  telecom: string;
}
