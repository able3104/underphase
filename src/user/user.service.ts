import { Injectable } from '@nestjs/common';
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

@Injectable()
export class UserService {
  constructor() {}

  async searchedInfo(dto: searchedInfoReqDto): Promise<searchedInfoResDto> {
    return 'Completed';
  }

  async kakaoLogin(dto: kakaoLoginReqDto): Promise<kakaoLoginResDto> {
    return 'Completed';
  }

  async kakaoSignupCallback(
    dto: kakaoSignupCallbackReqDto,
  ): Promise<kakaoSignupCallbackResDto> {
    return 'Completed';
  }

  async searchAgencies(
    dto: searchAgenciesReqDto,
  ): Promise<searchRatePlansResDto> {
    return 'Completed';
  }

  async refilterAgencies(
    dto: refilterAgenciesReqDto,
  ): Promise<refilterAgenciesResDto> {
    return 'Completed';
  }

  async getAgencyDetail(
    dto: getAgencyDetailReqDto,
  ): Promise<getAgencyDetailResDto> {
    return 'Completed';
  }

  async searchRatePlans(
    dto: searchRatePlansReqDto,
  ): Promise<searchRatePlansResDto> {
    return 'Completed';
  }

  async chooseAgency(dto: chooseAgencyReqDto): Promise<chooseAgencyResDto> {
    return 'Completed';
  }

  async confirmVisit(dto: confirmVisitReqDto): Promise<confirmVisitResDto> {
    return 'Completed';
  }

  async getUserReservations(
    dto: getUserReservationsReqDto,
  ): Promise<getUserReservationsResDto> {
    return 'Completed';
  }

  async cancelReservation(
    dto: cancelReservationReqDto,
  ): Promise<cancelReservationResDto> {
    return 'Completed';
  }
}
