import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { kakaoLoginReqDto } from './dto/kakaoLogin.req.dto';
import { kakaoLoginResDto } from './dto/kakaoLogin.res.dto';
import { kakaoSignupCallbackReqDto } from './dto/kakaoSignupCallback.req.dto';
import { kakaoSignupCallbackResDto } from './dto/kakaoSignupCallback.res.dto';
import { searchAgenciesReqDto } from './dto/searchAgencies.req.dto';
import { getAgencyDetailReqDto } from './dto/getAgencyDetail.req.dto';
import { getAgencyDetailResDto } from './dto/getAgencyDetail.res.dto';
import { chooseAgencyReqDto } from './dto/chooseAgency.req.dto';
import { chooseAgencyResDto } from './dto/chooseAgency.res.dto';
import { confirmVisitReqDto } from './dto/confirmVisit.req.dto';
import { confirmVisitResDto } from './dto/confirmVisit.res.dto';
import { cancelReservationReqDto } from './dto/cancelReservation.req.dto';
import { cancelReservationResDto } from './dto/cancelReservation.res.dto';
import {
  AgencySimpleDto,
  searchAgenciesResDto,
} from './dto/searchAgencies.res.dto';
import { Agency } from 'src/entity/Agency.entity';
import { KakaoUser } from 'src/entity/KakaoUser.entity';
import { PriceList } from 'src/entity/PriceList.entity';
import { Estimate } from 'src/entity/Estimate.entity';
import { SearchedInfo } from 'src/entity/SearchedInfo.entity';
import { Phone } from 'src/entity/Phone.entity';
import { registerQuoteReqDto } from './dto/registerQuote.req.dto';
import { resisterQuoteResDto } from './dto/registerQuote.res.dto';
import { Telecom } from 'src/entity/Telecom.entity';
import { Rate } from 'src/entity/Rate.entity';
import { getQuoteReqDto } from './dto/getQuote.req.dto';
import { benefitSimpleDto, getQuoteResDto } from './dto/getQuote.res.dto';
import { config } from 'process';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(Agency)
    private agencyRepository: Repository<Agency>,
    @InjectRepository(KakaoUser)
    private kakaoUserRepository: Repository<KakaoUser>,
    @InjectRepository(PriceList)
    private priceListRepository: Repository<PriceList>,
    @InjectRepository(SearchedInfo)
    private searchedInfoRepository: Repository<SearchedInfo>,
    @InjectRepository(Estimate)
    private estimateRepository: Repository<Estimate>,
    @InjectRepository(Phone)
    private phoneRepository: Repository<Phone>,
    @InjectRepository(Telecom)
    private telecomRepository: Repository<Telecom>,
    @InjectRepository(Rate)
    private rateRepository: Repository<Rate>,
  ) {}

  // async searchedInfo(dto: searchedInfoReqDto): Promise<searchedInfoResDto> {
  //   const response = new searchedInfoResDto();
  //   return response;
  // }

  // async kakaoLogin(dto: kakaoLoginReqDto): Promise<kakaoLoginResDto> {
  //   const response = new kakaoLoginResDto();
  //   response.authtoken = 'XZ@12HR12J87';
  //   response.is_new_user = true;
  //   return response;
  // }

  async kakaoSignupCallback(
    dto: kakaoSignupCallbackReqDto,
  ): Promise<kakaoSignupCallbackResDto> {
    const response = new kakaoSignupCallbackResDto();

    return response;
  }

  async searchAgencies(
    dto: searchAgenciesReqDto,
  ): Promise<searchAgenciesResDto> {
    const { phone_name, phone_brand, telecom, can_change_telecom } = dto;

    // const priceList = await this.priceListRepository.find({
    //   where: {
    //     phone: {
    //       name: phone_name,
    //       brand: { name: phone_brand },
    //     },
    //     telecom: { name: telecom },
    //     delete_time: '',
    //   },
    //   relations: ['agency', 'phone', 'telecom', 'phone.brand'],
    // });
    // if (priceList.length === 0) throw new NotFoundException();

    // const agencySimpleDtos = priceList.map((pl) => {
    //   const dtoInstance = new AgencySimpleDto();
    //   dtoInstance.agency_id = pl.agency.id;
    //   dtoInstance.agency_name = pl.agency.name;
    //   dtoInstance.agency_address = pl.agency.address;

    //   // dtoInstance.agency_rating = pl.agency.;
    //   dtoInstance.telecom = pl.telecom.name;
    //   dtoInstance.subscription_type = pl.subscription_type;

    //   dtoInstance.phome_brand = pl.phone.brand.name;
    //   dtoInstance.phone_name = pl.phone.name;
    //   dtoInstance.phone_price = pl.price;

    //   dtoInstance.auth_tag = pl.agency.auth_tag;

    //   return dtoInstance;
    // });
    const agencyData: AgencySimpleDto[] = [
      {
        agency_id: 1,
        agency_name: '가야 SKT 판매점',
        agency_address: '부산광역시 가야동',
        agency_rating: 4.5,
        telecom: 'SKT',
        subscription_type: 'New',
        phome_brand: 'samsung',
        phone_name: 'S25',
        phone_price: 35,
        auth_tag: true,
      },
      {
        agency_id: 1,
        agency_name: '가야 SKT 판매점',
        agency_address: '부산광역시 가야동',
        agency_rating: 4.5,
        telecom: 'SKT',
        subscription_type: 'Change_device',
        phome_brand: 'samsung',
        phone_name: 'S25',
        phone_price: 30,
        auth_tag: true,
      },
    ];
    const response = new searchAgenciesResDto();
    response.setter(agencyData);
    // response.agency = agencySimpleDtos;

    return response;
  }

  async getAgencyDetail(
    dto: getAgencyDetailReqDto,
  ): Promise<getAgencyDetailResDto> {
    // const agencies = await this.agencyRepository.findOne({
    //   where: { id: dto.agency_id },
    // });
    // if (!agencies) {
    //   throw new NotFoundException();
    // }
    // console.log(agencies);

    // const phone = await this.phoneRepository.findOne({
    //   where: { name: dto.phone_name, brand: { name: dto.phone_brand } },
    //   relations: ['brand'],
    // });
    // if (!phone) {
    //   throw new NotFoundException();
    // }
    // console.log(phone);

    // const priceList = await this.priceListRepository.findOne({
    //   where: {
    //     agency: { id: dto.agency_id },
    //     phone: { id: phone.id },
    //     telecom: { name: dto.telecom },
    //     subscription_type: dto.subscription_type,
    //   },
    //   relations: ['agency', 'phone', 'telecom', 'phone.brand', 'telecom'],
    // });
    // if (!priceList) {
    //   throw new NotFoundException();
    // }
    // console.log(priceList);

    // const response = new getAgencyDetailResDto();
    // response.agency_id = agencies.id;
    // response.agency_name = agencies.name;
    // response.agency_address = agencies.address;
    // response.agency_phone_number = agencies.phone_number;

    // response.phone_name = phone.name;
    // response.phone_brand = phone.brand.name;
    // response.phone_price = priceList.price;
    // response.phone_original_price = priceList.original_price;

    // response.start_time = agencies.start_time;
    // response.end_time = agencies.end_time;

    const response = new getAgencyDetailResDto();
    response.agency_id = 1;
    response.agency_name = '가야 SKT 판매점';
    response.agency_address = '부산광역시 가야동';
    response.agency_phone_number = '0511234567';
    response.agency_rating = 4.5;
    response.phone_name = 'S25';
    response.phone_brand = 'samsung';
    response.phone_price = 300000;
    response.phone_original_price = 1000000;
    response.phone_image = '/images/device/galaxy/galaxy_s25.png';
    // response.start_time = '11:00';
    // response.end_time = '19:00';
    return response;
  }

  async registerQuote(dto: registerQuoteReqDto): Promise<resisterQuoteResDto> {
    const {
      agency_id,
      phone_name,
      phone_brand,
      phone_price,
      phone_plan,
      subscription_type,
    } = dto;

    // const agency = await this.agencyRepository.findOne({
    //   where: { id: agency_id },
    // });
    // if (!agency) throw new NotFoundException();
    // //console.log(agency);

    // const phone = await this.phoneRepository.findOne({
    //   where: { name: phone_name, brand: { name: phone_brand } },
    // });
    // if (!phone) throw new NotFoundException();
    // //console.log(phone);

    // const telecom = await this.telecomRepository.findOne({
    //   where: { name: dto.telecom },
    // });
    // if (!telecom) throw new NotFoundException();
    // //console.log(telecom);

    // // rate 더미 데이터 삽입
    // // const newRate = new Rate();
    // // newRate.name = phone_plan.name;
    // // newRate.price = phone_plan.price;
    // // newRate.telecom = telecom;
    // // newRate.data = 200;
    // // newRate.delete_time = '';
    // // await this.rateRepository.save(newRate);

    // const rate = await this.rateRepository.findOne({
    //   where: {
    //     name: phone_plan.name,
    //     price: phone_plan.price,
    //     telecom: { id: telecom.id },
    //   },
    // });
    // if (!rate) throw new NotFoundException();
    // //console.log(rate);

    // const priceList = await this.priceListRepository.findOne({
    //   where: {
    //     agency: { id: agency_id },
    //     phone: { id: phone.id },
    //     subscription_type: subscription_type,
    //     telecom: { id: telecom.id },
    //   },
    //   relations: ['agency', 'phone', 'telecom', 'phone.brand', 'telecom'],
    // });
    // if (!priceList) throw new NotFoundException();
    // //console.log(priceList);

    // const authCode = this.generateNumericCode(10);
    // const auth_code: string = await authCode;

    // const estimate = new Estimate();
    // estimate.phone = phone;
    // estimate.priceList = priceList;
    // estimate.price = phone_price;
    // estimate.rate = rate.price;
    // estimate.auth_code = auth_code;
    // estimate.subscription_type = subscription_type;
    // estimate.delete_time = '';

    // await this.estimateRepository.save(estimate);

    // const response = new resisterQuoteResDto();
    // response.quote_code = auth_code;
    const response = new resisterQuoteResDto();
    response.quote_code = '1872536263';

    return response;
  }

  async generateNumericCode(length: number): Promise<string> {
    let code = '';
    for (let i = 0; i < length; i++) {
      // 0부터 9까지의 무작위 숫자 생성
      code += Math.floor(Math.random() * 10).toString();
    }
    return code;
  }

  async getQuote(dto: getQuoteReqDto): Promise<getQuoteResDto> {
    // const estimate = await this.estimateRepository.findOne({
    //   where: { auth_code: dto.quoteCode },
    //   relations: [
    //     'priceList',
    //     'priceList.agency',
    //     'phone',
    //     'priceList.rate',
    //     'phone.brand',
    //   ],
    // });

    // if (!estimate) {
    //   throw new BadRequestException();
    // }

    // console.log(estimate);

    // const response = new getQuoteResDto();

    // const { priceList, phone } = estimate;

    // if (!priceList || !priceList.agency || !phone || !phone.brand) {
    //   throw new NotFoundException();
    // }
    // const agency = priceList.agency;
    // const brand = phone.brand;

    // response.customer_name = '박민준';

    // response.agency_name = agency.name;
    // response.agency_rating = agency.review_score;
    // response.agency_address = agency.address;
    // response.agency_phone_number = agency.phone_number;

    // response.phone_name = phone.name;
    // response.phone_brand = brand.name;
    // response.phone_price = estimate.price;
    // response.phone_original_price = priceList.original_price;
    // response.phone_plan = priceList.rate;

    // response.discount.name = priceList.discount_name;
    // response.discount.price = priceList.discount_price;

    // response.subscription_type = estimate.subscription_type;

    // const benefit = [
    //   { description: '스마트폰 케이스 쇼핑몰 5,000원 할인' },
    //   { description: '요정 서비스 이용 시 5만원 추가 할인' },
    //   { description: '대리점 방문했는데 가격이 다르다면? 차액 보장!' },
    // ];
    // response.benefits = benefit;

    const response = new getQuoteResDto();
    response.customer_name = '박민준';
    response.agency_name = '가야 SKT 판매점';
    response.agency_rating = 4.5;
    response.agency_address = '부산광역시 가야동';
    response.agency_phone_number = '0511234567';
    response.phone_brand = 'samsung';
    response.phone_name = 'S25';
    response.phone_price = 300000;
    response.phone_original_price = 1000000;
    response.phone_plan = {
      name: '115',
      price: 115000,
    };
    response.subscription_type = 'New';
    response.discount = {
      name: '추가 할인',
      price: 10000,
    };
    const benefit: benefitSimpleDto[] = [
      { description: '스마트폰 케이스 쇼핑몰 5,000원 할인' },
      { description: '요정 서비스 이용 시 5만원 추가 할인' },
      { description: '대리점 방문했는데 가격이 다르다면? 차액 보장!' },
    ];
    response.benefits = benefit;

    return response;
  }

  async confirmVisit(dto: confirmVisitReqDto): Promise<confirmVisitResDto> {
    // const estimate = await this.estimateRepository.findOne({
    //   where: { id: dto.reservation_id },
    // });
    // if (!estimate) {
    //   throw new NotFoundException();
    // }

    // estimate.is_visitable = dto.is_visitable;
    // estimate.visit_time = dto.visit_time;

    const response = new confirmVisitResDto();
    response.phone_name = 'S25';
    response.phone_brand = 'Galaxy';
    response.price = 300000;
    response.rating = 55000;
    response.auth_code = '1872536263';
    response.reservation_id = 123;
    response.is_visitable = true;
    response.visit_time = '2025-12-03 14:00';
    return response;
  }
}
