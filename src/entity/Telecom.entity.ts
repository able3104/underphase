import { ApiProperty } from '@nestjs/swagger';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Agency } from './Agency.entity';
import { SearchedInfo } from './SearchedInfo.entity';
import { PriceList } from './PriceList.entity';

@Entity()
export class Telecom {
  @PrimaryGeneratedColumn()
  @ApiProperty({
    description: '통신사 ID (PK)',
    example: 1,
  })
  id: number;

  @Column()
  @ApiProperty({
    description: '통신사명',
    example: 'SKT',
  })
  name: string;

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

  @OneToMany(() => SearchedInfo, (searchedInfo) => searchedInfo.telecom)
  searchedInfos: SearchedInfo[];

  @OneToMany(() => PriceList, (priceList) => priceList.telecom)
  priceLists: PriceList[];
}
