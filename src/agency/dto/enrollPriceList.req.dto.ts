import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class enrollPriceListReqDto {
  @IsNotEmpty()
  @ApiProperty({
    description: '가격표 목록',
    type: [Object],
    example: [
      {
        phone_name: 'S25',
        phone_brand: 'samsung',
        telecom: 'SKT',
        subscription_type: 'New',
        rebatedPrice: 30,
      },
      {
        phone_name: 'S25+',
        phone_brand: 'samsung',
        telecom: 'SKT',
        subscription_type: 'New',
        rebatedPrice: 50,
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
