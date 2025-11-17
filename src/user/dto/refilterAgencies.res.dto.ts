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
        auth_tag: 'Yes',
        address: '부산진구 개금동',
        phone_number: '01012312355',
        monthly_expenditure: 63000,
        additional_benefit: 'No',
      },
      {
        id: 17,
        agency_name: 'KT 대리점 가야점',
        auth_tag: 'Yes',
        address: '부산진구 가야동',
        phone_number: '01015648569',
        monthly_expenditure: 65000,
        additional_benefit: 'Yes',
      },
    ],
  })
  agency: {
    id: number;
    agency_name: string;
    auth_tag: boolean;
    address: string;
    phone_number: number;
    monthly_expenditure: number;
    additional_benefit: boolean;
  }[];
}
