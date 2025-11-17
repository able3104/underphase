import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class searchAgenciesReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '사용자 전화번호',
    example: '010-1234-5678',
  })
  phone_number: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '사용자 휴대폰 제조사',
    example: 'Apple',
  })
  phone_brand: string;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty({
    description: '통신사 변경 가능 여부',
    example: true,
  })
  can_change_telecom: boolean;
}
