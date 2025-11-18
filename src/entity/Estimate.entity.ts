import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Phone } from './Phone.entity';
import { PriceList } from './PriceList.entity';
import { SearchedInfo } from './SearchedInfo.entity';
import { BillImage } from './BillImage.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Estimate {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: '견적서 ID (PK)',
    example: 1,
  })
  id: number;

  @ManyToOne(() => Phone, (phone) => phone.estimates)
  @ApiProperty({
    description: '기기 정보 (FK)',
    example: {
      id: 1,
      name: 'iPhone 13',
      brand: {
        id: 1,
      },
      volume: '128GB',
      color: 'Black',
      image_URL: 'http://apple.com/iphone13_black.png',
      create_time: '2023-01-01T00:00:00.000Z',
      delete_time: null,
    },
  })
  phone: Phone;

  @ManyToOne(() => PriceList, (priceList) => priceList.estimates)
  @ApiProperty({
    description: '판매점 별 가격표 정보 (FK)',
    example: {
      id: 1,
      agency: { id: 1 },
      phone: { id: 1 },
      telecom: { id: 1 },
    },
  })
  priceList: PriceList;

  @Column()
  @ApiProperty({
    description: '가격',
    example: 500000,
  })
  price: number;

  @Column()
  @ApiProperty({
    description: '요금제',
    example: 60000,
  })
  rate: number;

  @ManyToOne(() => SearchedInfo, (searchedInfo) => searchedInfo.estimates)
  @ApiProperty({
    description: '유저 검색 정보 (FK)',
    example: {
      id: 1,
    },
  })
  searchedInfo: SearchedInfo;

  @Column()
  @ApiProperty({
    description: '인증 코드',
    example: 'ABC123DEF456',
  })
  auth_code: string;

  @Column()
  @ApiProperty({
    description: '방문 확정 여부',
    example: true,
    default: false,
  })
  is_visitable: boolean;

  @Column()
  @ApiProperty({
    description: '방문 시간',
    example: '14:00',
    default: null,
  })
  visit_time: string;

  @CreateDateColumn()
  @ApiProperty({
    description: '생성 시간',
    example: '2023-01-01T00:00:00.000Z',
  })
  create_time: Date;

  @Column()
  @ApiProperty({
    description: '삭제 시간',
    example: null,
    default: null,
  })
  delete_time: Date;

  @OneToMany(() => BillImage, (billImage) => billImage.estimate)
  billImages: BillImage[];
}
