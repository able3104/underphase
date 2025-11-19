import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class modifyListReqDto {
  @IsNotEmpty()
  @ApiProperty({
    description: '수정할 가격표 정보 목록',
    type: [Object],
    example: [
      {
        phone_name: 'S25',
        phone_brand: 'samsung',
        telecom: 'SKT',
        subscription_type: 'New',
        rebatedPrice: 35,
      },
      {
        phone_name: 'S25+',
        phone_brand: 'samsung',
        telecom: 'SKT',
        subscription_type: 'New',
        rebatedPrice: 55,
      },
    ],
  })
  priceList: {
    phone_name: string;
    phone_brand: string;
    telecom: string;
    subscription_type: string;
    rebatedPrice: number;
  }[];
}
