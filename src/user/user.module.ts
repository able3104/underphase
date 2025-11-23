import { forwardRef, Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { KakaoUser } from 'src/entity/KakaoUser.entity';
import { PriceList } from 'src/entity/PriceList.entity';
import { Agency } from 'src/entity/Agency.entity';
import { Estimate } from 'src/entity/Estimate.entity';
import { SearchedInfo } from 'src/entity/SearchedInfo.entity';
import { AgencyModule } from 'src/agency/agency.module';
import { Phone } from 'src/entity/Phone.entity';
import { Telecom } from 'src/entity/Telecom.entity';
import { Rate } from 'src/entity/Rate.entity';

@Module({
  imports: [
    // TypeOrmModule에 필요한 Entity를 등록
    forwardRef(() => AgencyModule),
    TypeOrmModule.forFeature([
      KakaoUser,
      PriceList,
      Agency,
      Estimate,
      SearchedInfo,
      Phone,
      Telecom,
      Rate,
    ]),
  ],
  providers: [UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}
