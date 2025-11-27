export interface PriceSettingFeildProps {
  telecom: string;

  device: string;

  options: {
    type: string;
    plan: string;
    price: number;
  }[];
}

export class getPriceListByPhoneResDto {
  priceList: PriceSettingFeildProps[];
}
