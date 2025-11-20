import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Agency } from './Agency.entity';
import { Phone } from './Phone.entity';
import { Telecom } from './Telecom.entity';
import { Estimate } from './Estimate.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Rate } from './Rate.entity';

@Entity()
export class PriceList {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: '가격표 ID (PK)',
    example: 1,
  })
  id: number;

  @ManyToOne(() => Agency, (agency) => agency.priceLists)
  @ApiProperty({
    description: '대리점 정보 (FK)',
    example: {
      id: 1,
      name: 'SKT 대리점 가야점',
    },
  })
  agency: Agency;

  @ManyToOne(() => Phone, (phone) => phone.priceLists)
  @ApiProperty({
    description: '휴대폰 기기 정보 (FK)',
    example: {
      id: 1,
      name: 'iPhone 13',
      brand: { id: 1 },
      volume: '128GB',
      color: 'Black',
    },
  })
  phone: Phone;

  @ManyToOne(() => Telecom, (telecom) => telecom.priceLists)
  @ApiProperty({
    description: '통신사 정보 (FK)',
    example: {
      id: 1,
      name: 'SKT',
    },
  })
  telecom: Telecom;

  @Column()
  @ApiProperty({
    description: '가압 유형',
    example: 'New',
  })
  subscription_type: string;

  @Column()
  @ApiProperty({
    description: '기기 가격',
    example: 800000,
  })
  price: number;

  /*
  @ManyToOne(() => Rate, (rate) => rate.pricelist)
  @ApiProperty({
    description: '요금제 정보 (FK)',
    example: {
      id: 1,
      name: '5G 프리미엄',
      price: 89000,
    },
  })
  rate: Rate;
  */

  @CreateDateColumn()
  @ApiProperty({
    description: '생성 시간',
    example: '2023-01-01T00:00:00.000Z',
  })
  create_time: Date;

  @Column()
  @ApiProperty({
    description: '삭제 시간',
    example: '',
    default: '',
  })
  delete_time: string;

  @OneToMany(() => Estimate, (estimate) => estimate.priceList)
  estimates: Estimate[];
}
