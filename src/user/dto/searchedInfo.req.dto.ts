import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsSemVer, IsString } from 'class-validator';

export enum Telecom {
  SKT = 'SKT',
  KT = 'KT',
  LG = 'LG',
}

export class searchedInfoReqDto {
  @ApiProperty({
    description: '휴대폰 기종',
    example: '갤럭시 S25',
  })
  @IsNotEmpty()
  @IsString()
  phone_name: string;

  @ApiProperty({
    description: '휴대폰 제조사',
    example: 'samsung',
  })
  @IsNotEmpty()
  @IsString()
  phone_brand: string;

  @ApiProperty({
    description: '통신사',
    example: Telecom.SKT,
    enum: Telecom,
  })
  @IsNotEmpty()
  @IsString()
  telecom: Telecom;

  @IsBoolean()
  @ApiProperty({
    description: '통신사 이동 가능 여부',
    example: true,
  })
  @IsNotEmpty()
  can_change_telecom: boolean;
}
