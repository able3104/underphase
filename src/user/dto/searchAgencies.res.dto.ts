import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Agency } from 'src/entity/Agency.entity';
import { Phone } from 'src/entity/Phone.entity';
import { PriceList } from 'src/entity/PriceList.entity';
import { Rate } from 'src/entity/Rate.entity';
import { Telecom } from 'src/entity/Telecom.entity';

class PriceListSimpleDto {
  id: number;
  agency: Agency;
  phone: Phone;
  telecom: Telecom;
  telecom_change: boolean;
  price: number;
  rate: Rate;
}

export class searchAgenciesResDto {
  // @ApiProperty({
  //   type: [PriceListSimpleDto],
  //   description: '가격표 목록',
  //   example: [
  //     {
  //       id: '1',
  //       agency: {
  //         name: 'SKT 대리점 가야점',
  //         address: '부산진구 가야동',
  //         phone_nmber:'01012345678'
  //       },
  //       phone: {
  //         name: 'S25',
  //         brand:{name:'Galaxy'}
  //       },

  //     }
  //   ]
  //  })
  // pricelist: PriceListSimpleDto[];
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
        telecom: 'SKT',
        monthly_expenditure: 63000,
        additional_benefit: false,
      },
      {
        id: 17,
        agency_name: 'KT 대리점 가야점',
        agency_address: '부산진구 가야동',
        agency_phone_number: '01015648569',
        phone_name: '17',
        phone_brand: 'Apple',
        telecom: 'KT',
        phone_price: 550000,
        monthly_expenditure: 66000,
        additional_benefit: true,
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
    telecom: string;
    monthly_expenditure: number;
    additional_benefit: boolean;
  }[];
  // @ApiProperty({
  //   description: '판매점 고유 id',
  //   example: 1,
  // })
  // id: number;

  // @ApiProperty({
  //   description: '판매점 이름',
  //   example: 'SKT 대리점 가야점',
  // })
  // agency_name: string;

  // @ApiProperty({
  //   description: '판매점 주소',
  //   example: '부산진구 가야동',
  // })
  // agency_address: string;

  // @ApiProperty({
  //   description: '판매점 전화번호',
  //   example: '01012345678',
  // })
  // agency_phone_number: string;

  // @ApiProperty({
  //   description: '핸드폰 기기명',
  //   example: 'S25',
  // })
  // phone_name: string;

  // @ApiProperty({
  //   description: '핸드폰 제조사',
  //   example: 'samsung',
  // })
  // phone_brand: string;

  // @ApiProperty({
  //   description: '핸드폰 가격',
  //   example: 300000,
  // })
  // phone_price: number;

  // @ApiProperty({
  //   description: '할부시 월정액',
  //   example: 51000,
  // })
  // monthly_expenditure: number;

  // @ApiProperty({
  //   description: '추가적인 혜택 여부',
  //   example: true,
  // })
  // additional_benefit: boolean;

  // constructor(pricelistArray: PriceList[]) {
  //   this.pricelist = [];

  //   this.pricelist = pricelistArray.map((item) => ({
  //     id: item.id,
  //     agency: item.agency,
  //     phone: item.phone,
  //     telecom: item.telecom,
  //     telecom_change: item.telecom_change,
  //     price: item.price,
  //     rate: item.rate,
  //   }));
  // }
}
