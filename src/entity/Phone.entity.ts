import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Brand } from './Brand.entity';
import { Search } from '@nestjs/common';
import { SearchedInfo } from './SearchedInfo.entity';
import { Estimate } from './Estimate.entity';
import { PriceList } from './PriceList.entity';
import { ApiProperty } from '@nestjs/swagger';

@Entity()
export class Phone {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: '휴대폰 기기 ID (PK)',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: '휴대폰 기기명',
    example: 'iPhone 13',
  })
  name: string;

  @ManyToOne(() => Brand, (brand) => brand.phones)
  @ApiProperty({
    description: '제조사 정보 (FK)',
    example: {
      id: 1,
      name: 'Apple',
      image_URL: 'http://apple.com/logo.png',
    },
  })
  brand: Brand;

  @Column()
  @ApiProperty({
    description: '저장 용량',
    example: '128GB',
  })
  volume: string;

  @Column()
  @ApiProperty({
    description: '색상',
    example: 'Black',
  })
  color: string;

  @Column()
  @ApiProperty({
    description: '기기 이미지 URL',
    example: 'http://apple.com/iphone13_black.png',
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

  @OneToMany(() => SearchedInfo, (searchedInfo) => searchedInfo.phone)
  searchedInfos: SearchedInfo[];

  @OneToMany(() => Estimate, (estimate) => estimate.phone)
  estimates: Estimate[];

  @OneToMany(() => PriceList, (priceList) => priceList.phone)
  priceLists: PriceList[];
}
