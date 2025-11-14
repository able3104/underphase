import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Seller } from './Seller.entity';
import { ApiProperty } from '@nestjs/swagger';
import { PriceList } from './PriceList.entity';

@Entity()
export class Agency {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: '판매점 ID (PK)',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: '판매점명',
    example: '가야 SKT 판매점',
  })
  name: string;

  @ManyToOne(() => Seller, (seller) => seller.agencies)
  @ApiProperty({
    description: '대리점 정보',
    example: {
      id: 1,
      name: 'SKT 대리점 가야점',
      user_name: 'seller_gaya_skt',
      password_hashed: '$2b$10$EixZaYV',
      create_time: '2023-01-01T00:00:00.000Z',
      delete_time: null,
    },
  })
  seller: Seller;

  @Column()
  @ApiProperty({
    description: '리뷰 점수',
    example: 4.5,
  })
  review_score: number;

  @Column()
  @ApiProperty({
    description: '리뷰 수',
    example: 15,
  })
  reviews: number;

  @Column()
  @ApiProperty({
    description: '판매점 주소',
    example: '부산광역시 가야동',
  })
  address: string;

  @Column()
  @ApiProperty({
    description: '판매점 전화번호',
    example: '051-123-4567',
  })
  phone_number: string;

  @Column()
  @ApiProperty({
    description: '판매점 이미지 URL',
    example: 'http://under-phase.com/agency_image.jpg',
  })
  image_URL: string;

  @Column()
  @ApiProperty({
    description: '생성 시간',
    example: '2023-01-01T00:00:00.000Z',
  })
  create_time: Date;

  @Column()
  @ApiProperty({
    description: '삭제 시간',
    example: null,
  })
  delete_time: Date | null;

  @OneToMany(() => PriceList, (priceList) => priceList.agency)
  priceLists: PriceList[];
}
