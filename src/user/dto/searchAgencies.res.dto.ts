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

  @ApiProperty({
    description: '판매점 고유 id',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: '판매점 이름',
    example: 'SKT 대리점 가야점',
  })
  agency_name: string;

  @ApiProperty({
    description: '판매점 주소',
    example: '부산진구 가야동',
  })
  agency_address: string;

  @ApiProperty({
    description: '판매점 전화번호',
    example: '01012345678',
  })
  agency_phone_number: string;

  @ApiProperty({
    description: '핸드폰 기기명',
    example: 'S25',
  })
  phone_name: string;

  @ApiProperty({
    description: '핸드폰 제조사',
    example: 'Galaxy',
  })
  phone_brand: string;

  @ApiProperty({
    description: '핸드폰 가격',
    example: 300000,
  })
  phone_price: number;

  @ApiProperty({
    description: '할부시 월정액',
    example: 51000,
  })
  monthly_expenditure: number;

  @ApiProperty({
    description: '추가적인 혜택 여부',
    example: true,
  })
  additional_benefit: boolean;

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
