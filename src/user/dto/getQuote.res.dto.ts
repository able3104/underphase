import { Rate } from 'src/entity/Rate.entity';
import { discountSimpleDto } from './registerQuote.req.dto';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class benefitSimpleDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '특별 혜택명',
    example: '스마트폰 케이스 쇼핑몰 5,000원 할인',
  })
  description: string;
}

export class getQuoteResDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '소비자 이름',
    example: '박민준',
  })
  customer_name: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점 이름',
    example: '가야 SKT 판매점',
  })
  agency_name: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점 리뷰 평점',
    example: 115000,
  })
  agency_rating: number;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점 주소',
    example: '부산광역시 가야동',
  })
  agency_address: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '판매점 전화번호',
    example: '0511234567',
  })
  agency_phone_number: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '휴대폰 제조사명',
    example: 'samsung',
  })
  phone_brand: string;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '휴대폰 기기명',
    example: 'S25',
  })
  phone_name: string;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '휴대폰 판매 가격',
    example: 300000,
  })
  phone_price: number;
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty({
    description: '휴대폰 원가',
    example: 1000000,
  })
  phone_original_price: number;

  @IsNotEmpty()
  @ApiProperty({
    description: '요금제 정보',
    example: {
      name: '115',
      price: 115000,
    },
  })
  phone_plan: Rate;
  @IsNotEmpty()
  @ApiProperty({
    description: '할인 정보',
    example: {
      name: '추가 할인',
      price: 10000,
    },
    default: {
      name: '추가 할인',
      price: 10000,
    },
  })
  discount: discountSimpleDto;
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    description: '가입 유형',
    example: 'New',
  })
  subscription_type: string;

  @IsNotEmpty()
  @ApiProperty({
    description: '특별 혜택 목록',
    type: [benefitSimpleDto],
    example: [
      {
        description: '스마트폰 케이스 쇼핑몰 5,000원 할인',
      },
      {
        description: '요정 서비스 이용 시 5만원 추가 할인',
      },
      {
        description: '대리점 방문했는데 가격이 다르다면? 차액 보장!',
      },
    ],
    default: [
      {
        description: '스마트폰 케이스 쇼핑몰 5,000원 할인',
      },
      {
        description: '요정 서비스 이용 시 5만원 추가 할인',
      },
      {
        description: '대리점 방문했는데 가격이 다르다면? 차액 보장!',
      },
    ],
  })
  benefits: benefitSimpleDto[];

  constructor() {
    this.discount = { name: '', price: 0 };
  }
}
