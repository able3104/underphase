import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KakaoUser } from 'src/entity/KakaoUser.entity';
import { PriceList } from 'src/entity/PriceList.entity';
import { Agency } from 'src/entity/Agency.entity';
import { Estimate } from 'src/entity/Estimate.entity';
import { SearchedInfo } from 'src/entity/SearchedInfo.entity';

@Module({
  imports: [
    // TypeOrmModule에 필요한 Entity를 등록
    TypeOrmModule.forFeature([
      KakaoUser,
      PriceList,
      Agency,
      Estimate,
      SearchedInfo,
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
})
export class UserModule {}
