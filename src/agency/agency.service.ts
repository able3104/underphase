import { Injectable } from '@nestjs/common';
import { agencyLoginResDto } from './dto/agencyLogin.res.dto';
import { agencyLoginReqDto } from './dto/agencyLogin.req.dto';
import { agencyPasswordResetReqDto } from './dto/agencyPasswordReset.req.dto';
import { agencyPasswordResetResDto } from './dto/agencyPasswordReset.res.dto';
import { enrollPriceListReqDto } from './dto/enrollPriceList.req.dto';
import { enrollPriceListResDto } from './dto/enrollPriceList.res.dto';
import { modifyListResDto } from './dto/modifyList.res.dto';
import { modifyListReqDto } from './dto/modifyList.req.dto';
import { deletePriceListResDto } from './dto/deletePriceList.res.dto';
import { deletePriceListReqDto } from './dto/deletePriceList.req.dto';
import { registerRatePlanReqDto } from './dto/registerRatePlan.req.dto';
import { registerRatePlanResDto } from './dto/registerRatePlan.res.dto';
import { getAgencyRatePlansReqDto } from './dto/getAgencyRatePlans.req.dto';
import { getAgencyRatePlansResDto } from './dto/getAgencyRatePlans.res.dto';
import { getRatePlanDetailReqDto } from './dto/getRatePlanDetail.req.dto';
import { getRatePlanDetailResDto } from './dto/getRatePlanDetail.res.dto';
import { deleteRatePlanReqDto } from './dto/deleteRatePlan.req.dto';
import { deleteRatePlanResDto } from './dto/deleteRatePlan.res.dto';
import { checkReservationReqDto } from './dto/checkReservation.req.dto';
import { checkReservationResDto } from './dto/checkReservation.res.dto';
import { getAgencyReservationsReqDto } from './dto/getAgencyReservations.req.dto';
import { getAgencyReservationsResDto } from './dto/getAgencyReservations.res.dto';

@Injectable()
export class AgencyService {
  constructor() {}

  async agencyLogin(dto: agencyLoginReqDto): Promise<agencyLoginResDto> {
    const response = new agencyLoginResDto();
    response.authToken = 'ax234QW234';
    return response;
  }

  async agencyPasswordReset(
    dto: agencyPasswordResetReqDto,
  ): Promise<agencyPasswordResetResDto> {
    const response = new agencyPasswordResetResDto();
    return response;
  }

  async enrollPriceList(
    dto: enrollPriceListReqDto,
  ): Promise<enrollPriceListResDto> {
    const response = new enrollPriceListResDto();
    return response;
  }

  async modifyPriceList(dto: modifyListReqDto): Promise<modifyListResDto> {
    const priceList = [
      {
        phone_name: 'S25',
        phone_brand: 'samsung',
        telecom: 'SKT',
        subscription_type: 'New',
        rebatedPrice: 35,
      },
      {
        phone_name: 'S25+',
        phone_brand: 'samsung',
        telecom: 'SKT',
        subscription_type: 'New',
        rebatedPrice: 55,
      },
    ];
    const response = new modifyListResDto();
    response.priceList = priceList;
    return response;
  }

  async deletePriceList(
    dto: deletePriceListReqDto,
  ): Promise<deletePriceListResDto> {
    const response = new deletePriceListResDto();
    return response;
  }

  async registerRatePlan(
    dto: registerRatePlanReqDto,
  ): Promise<registerRatePlanResDto> {
    const response = new registerRatePlanResDto();
    return response;
  }

  async getAgencyRatePlans(
    dto: getAgencyRatePlansReqDto,
  ): Promise<getAgencyRatePlansResDto> {
    const rate = [
      {
        plan_name: '5G 스탠다드',
        price: 75000,
        telecom: 'SKT',
        data: 150,
      },
      {
        plan_name: '5G 프리미엄',
        price: 89000,
        telecom: 'SKT',
        data: 250,
      },
    ];
    const response = new getAgencyRatePlansResDto();
    response.rate = rate;
    return response;
  }

  async getRatePlanDetail(
    dto: getRatePlanDetailReqDto,
  ): Promise<getRatePlanDetailResDto> {
    const response = new getRatePlanDetailResDto();
    response.plan_name = '5G 스탠다드';
    response.telecom = 'SKT';
    response.price = 75000;
    response.data = 150;
    return response;
  }

  async deleteRatePlan(
    dto: deleteRatePlanReqDto,
  ): Promise<deleteRatePlanResDto> {
    const response = new deleteRatePlanResDto();
    return response;
  }

  async checkReservations(
    dto: checkReservationReqDto,
  ): Promise<checkReservationResDto> {
    const response = new checkReservationResDto();
    response.approval_status = 'approved';
    return response;
  }

  async getAgencyReservations(
    dto: getAgencyReservationsReqDto,
  ): Promise<getAgencyReservationsResDto> {
    const reservation = [
      {
        user_id: 'user1',
        phone_name: 'S25',
        phone_brand: 'samsung',
        auth_code: '1872536263',
        status: 'Pending',
      },
    ];
    const response = new getAgencyReservationsResDto();
    response.reservation = reservation;
    return response;
  }
}
