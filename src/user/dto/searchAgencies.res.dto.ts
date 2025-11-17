import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class searchAgenciesResDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점 ID',
    example: 1,
  })
  id: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점 이름',
    example: 'SKT 대리점 가야점',
  })
  agency_name: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: '본인 인증 여부',
    example: true,
  })
  auth_tag: boolean;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '대리점 주소',
    example: '부산광역시 부산진구 가야동 123-45',
  })
  address: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '대리점 전화번호',
    example: '051-123-4567',
  })
  phone_number: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '월간 비용',
    example: 50000,
  })
  monthly_expenditure: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: '추가 혜택 여부',
    example: true,
  })
  additional_benefit: boolean;
}
