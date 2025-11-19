import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class refilterAgenciesReqDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점과의 거리',
    example: 15,
  })
  distance: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '구독 유형',
    example: 'New',
  })
  subscription_type: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '핸드폰 기기명',
    example: '17+',
  })
  phone_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '핸드폰 제조사명',
    example: 'apple',
  })
  phone_brand: string;
}
