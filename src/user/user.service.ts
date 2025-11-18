import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { searchedInfoReqDto } from './dto/searchedInfo.req.dto';
import { searchedInfoResDto } from './dto/searchedInfo.res.dto';
import { kakaoLoginReqDto } from './dto/kakaoLogin.req.dto';
import { kakaoLoginResDto } from './dto/kakaoLogin.res.dto';
import { kakaoSignupCallbackReqDto } from './dto/kakaoSignupCallback.req.dto';
import { kakaoSignupCallbackResDto } from './dto/kakaoSignupCallback.res.dto';
import { searchAgenciesReqDto } from './dto/searchAgencies.req.dto';
import { searchRatePlansResDto } from './dto/searchRatePlans.res.dto';
import { refilterAgenciesReqDto } from './dto/refilterAgencies.req.dto';
import { refilterAgenciesResDto } from './dto/refilterAgencies.res.dto';
import { getAgencyDetailReqDto } from './dto/getAgencyDetail.req.dto';
import { getAgencyDetailResDto } from './dto/getAgencyDetail.res.dto';
import { searchRatePlansReqDto } from './dto/searchRatePlans.req.dto';
import { chooseAgencyReqDto } from './dto/chooseAgency.req.dto';
import { chooseAgencyResDto } from './dto/chooseAgency.res.dto';
import { confirmVisitReqDto } from './dto/confirmVisit.req.dto';
import { confirmVisitResDto } from './dto/confirmVisit.res.dto';
import { getUserReservationsReqDto } from './dto/getUserReservations.req.dto';
import { getUserReservationsResDto } from './dto/getUserReservations.res.dto';
import { cancelReservationReqDto } from './dto/cancelReservation.req.dto';
import { cancelReservationResDto } from './dto/cancelReservation.res.dto';
import { searchAgenciesResDto } from './dto/searchAgencies.res.dto';
import { Agency } from 'src/entity/Agency.entity';
import { KakaoUser } from 'src/entity/KakaoUser.entity';
import { PriceList } from 'src/entity/PriceList.entity';
import { Estimate } from 'src/entity/Estimate.entity';
import { SearchedInfo } from 'src/entity/SearchedInfo.entity';

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
  ) {}

  async searchedInfo(dto: searchedInfoReqDto): Promise<searchedInfoResDto> {
    return 'Completed';
  }

  async kakaoLogin(dto: kakaoLoginReqDto): Promise<kakaoLoginResDto> {
    const response = new kakaoLoginResDto();
    return response;
  }

  async kakaoSignupCallback(
    dto: kakaoSignupCallbackReqDto,
  ): Promise<kakaoSignupCallbackResDto> {
    const response = new kakaoSignupCallbackResDto();
    return response;
  }

  async searchAgencies(
    dto: searchAgenciesReqDto,
  ): Promise<searchAgenciesResDto> {
    const priceList = await this.priceListRepository.find({
      where: {
        telecom: { name: dto.telecom },
        telecom_change: dto.can_change_telecom,
        phone: { name: dto.phone_name },
      },
      relations: ['agency', 'phone', 'telecom'],
    });

    if (priceList.length === 0) {
      throw new NotFoundException();
    }

    const response = new searchAgenciesResDto(priceList);
    return response;
  }

  async refilterAgencies(
    dto: refilterAgenciesReqDto,
  ): Promise<refilterAgenciesResDto> {
    const filteredPriceLists = await this.priceListRepository.find({
      where: {
        phone: {
          name: dto.phone_name,
          brand: { name: dto.phone_brand },
        },
      },
      relations: ['agency', 'phone', 'phone.brand'],
    });

    if (filteredPriceLists.length === 0) {
      throw new NotFoundException(
        '추가 필터링 조건에 맞는 판매점 가격표를 찾을 수 없습니다.',
      );
    }

    const agenciesMap = new Map<number, Agency>();
    for (const list of filteredPriceLists) {
      if (list.agency && !agenciesMap.has(list.agency.id)) {
        agenciesMap.set(list.agency.id, list.agency);
      }
    }
    const filteredAgencies = Array.from(agenciesMap.values());

    const response = new refilterAgenciesResDto();
    return response;
  }

  async getAgencyDetail(
    dto: getAgencyDetailReqDto,
  ): Promise<getAgencyDetailResDto> {
    const agencies = await this.agencyRepository.findOne({
      where: { id: dto.id },
    });
    if (!agencies) {
      throw new NotFoundException();
    }

    const response = new getAgencyDetailResDto(agencies);
    response.rating = dto.rating;

    return response;
  }

  async searchRatePlans(
    dto: searchRatePlansReqDto,
  ): Promise<searchRatePlansResDto> {
    const searchedPriceList = await this.priceListRepository.findOne({
      where: {
        phone: { name: dto.phone_name },
        telecom: { name: dto.telecom },
        agency: { name: dto.agency_name },
      },
    });

    if (!searchedPriceList) {
      throw new NotFoundException();
    }

    const response = new searchRatePlansResDto();
    response.plan_name = searchedPriceList.rate.name;
    response.price = searchedPriceList.rate.price;
    response.data = searchedPriceList.rate.data;
    response.telecom = searchedPriceList.rate.telecom.name;
    return response;
  }

  async chooseAgency(dto: chooseAgencyReqDto): Promise<chooseAgencyResDto> {
    const priceList = await this.priceListRepository.findOne({
      where: {
        agency: { name: dto.agency_name },
        phone: { name: dto.phone_name },
      },
    });

    if (!priceList) {
      throw new NotFoundException();
    }

    const estimate = new Estimate();
    estimate.phone = priceList.phone;
    estimate.priceList = priceList;
    estimate.price = priceList.price;
    estimate.rate = priceList.rate.price;

    const searchedInfo = await this.searchedInfoRepository.findOne({
      where: {
        id: dto.searchedInfo_id,
      },
    });
    if (!searchedInfo) {
      throw new NotFoundException();
    }

    estimate.searchedInfo = searchedInfo;
    //searchedInfo_id를 계속 들고 있어야 하나?

    const authCode = this.generateNumericCode(10);
    const auth_code: string = await authCode;
    estimate.auth_code = auth_code;

    await this.estimateRepository.save(estimate);

    const response = new chooseAgencyResDto();
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

  async confirmVisit(dto: confirmVisitReqDto): Promise<confirmVisitResDto> {
    const estimate = await this.estimateRepository.findOne({
      where: { id: dto.reservation_id },
    });
    if (!estimate) {
      throw new NotFoundException();
    }

    estimate.is_visitable = dto.is_visitable;
    estimate.visit_time = dto.visit_time;

    const response = new confirmVisitResDto();
    return response;
  }

  //auth 필요
  //auth 가드 구현후 작성하자
  async getUserReservations(
    dto: getUserReservationsReqDto,
  ): Promise<getUserReservationsResDto> {
    const response = new getUserReservationsResDto();
    return response;
  }

  async cancelReservation(
    dto: cancelReservationReqDto,
  ): Promise<cancelReservationResDto> {
    const estimate = await this.estimateRepository.findOne({
      where: { id: dto.reservation_id },
    });
    if (!estimate) {
      throw new NotFoundException();
    }

    const currentTime: Date = new Date();

    estimate.delete_time = currentTime;

    const response = new cancelReservationResDto();
    return response;
  }
}
