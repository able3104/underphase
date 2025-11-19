import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class refilterAgenciesResDto {
  @IsNotEmpty()
  @ApiProperty({
    description: '해당되는 판매점 목록',
    type: [Object],
    example: [
      {
        id: 5,
        agency_name: '실버실버 대리점',
        agency_address: '부산진구 개금동',
        agency_phone_number: '01012312355',
        phone_name: '17',
        phone_brand: 'Apple',
        phone_price: 500000,
        monthly_expenditure: 63000,
        additional_benefit: false,
        auth_tag: true,
      },
      {
        id: 17,
        agency_name: 'KT 대리점 가야점',
        agency_address: '부산진구 가야동',
        agency_phone_number: '01015648569',
        phone_name: '17',
        phone_brand: 'Apple',
        phone_price: 550000,
        monthly_expenditure: 66000,
        additional_benefit: true,
        auth_tag: true,
      },
    ],
  })
  agency: {
    id: number;
    agency_name: string;
    agency_address: string;
    agency_phone_number: string;
    phone_name: string;
    phone_brand: string;
    phone_price: number;
    monthly_expenditure: number;
    additional_benefit: boolean;
    auth_tag: boolean;
  }[];
}
