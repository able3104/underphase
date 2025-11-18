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
  @ApiProperty({ type: [PriceListSimpleDto] })
  pricelist: PriceListSimpleDto[];

  constructor(pricelistArray: PriceList[]) {
    this.pricelist = [];

    this.pricelist = pricelistArray.map((item) => ({
      id: item.id,
      agency: item.agency,
      phone: item.phone,
      telecom: item.telecom,
      telecom_change: item.telecom_change,
      price: item.price,
      rate: item.rate,
    }));
  }
}
