import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class searchRatePlansReqDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '핸드폰 기기명',
    example: 'S25',
  })
  phone_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '원하는 통신사',
    example: 'SKT',
  })
  telecom: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '대리점 명',
    example: '실버실버 대리점',
  })
  agency_name: string;
}
