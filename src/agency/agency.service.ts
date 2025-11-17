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
    return 'Completed';
  }

  async agencyPasswordReset(
    dto: agencyPasswordResetReqDto,
  ): Promise<agencyPasswordResetResDto> {
    return 'Completed';
  }

  async enrollPriceList(
    dto: enrollPriceListReqDto,
  ): Promise<enrollPriceListResDto> {
    return 'Completed';
  }

  async modifyPriceList(dto: modifyListReqDto): Promise<modifyListResDto> {
    return 'Completed';
  }

  async deletePriceList(
    dto: deletePriceListReqDto,
  ): Promise<deletePriceListResDto> {
    return 'Completed';
  }

  async registerRatePlan(
    dto: registerRatePlanReqDto,
  ): Promise<registerRatePlanResDto> {
    return 'Completed';
  }

  async getAgencyRatePlans(
    dto: getAgencyRatePlansReqDto,
  ): Promise<getAgencyRatePlansResDto> {
    return 'Completed';
  }

  async getRatePlanDetail(
    dto: getRatePlanDetailReqDto,
  ): Promise<getRatePlanDetailResDto> {
    return 'Completed';
  }

  async deleteRatePlan(
    dto: deleteRatePlanReqDto,
  ): Promise<deleteRatePlanResDto> {
    return 'Completed';
  }

  async checkReservations(
    dto: checkReservationReqDto,
  ): Promise<checkReservationResDto> {
    return 'Completed';
  }

  async getAgencyReservations(
    dto: getAgencyReservationsReqDto,
  ): Promise<getAgencyReservationsResDto> {
    return 'Completed';
  }
}
