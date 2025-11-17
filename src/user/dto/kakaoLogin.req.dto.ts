import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';

export class kakaoLoginReqDto {
  @IsNotEmpty()
  @IsNumber()
  @ApiProperty({
    description: '카카오 ID',
    example: 999888777,
  })
  kakao_id: number;
}
