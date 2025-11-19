import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { AgencyService } from './agency.service';
import { agencyLoginReqDto } from './dto/agencyLogin.req.dto';
import { agencyLoginResDto } from './dto/agencyLogin.res.dto';
import { agencyPasswordResetReqDto } from './dto/agencyPasswordReset.req.dto';
import { agencyPasswordResetResDto } from './dto/agencyPasswordReset.res.dto';
import { enrollPriceListReqDto } from './dto/enrollPriceList.req.dto';
import { enrollPriceListResDto } from './dto/enrollPriceList.res.dto';
import { modifyListReqDto } from './dto/modifyList.req.dto';
import { modifyListResDto } from './dto/modifyList.res.dto';
import { deletePriceListReqDto } from './dto/deletePriceList.req.dto';
import { deletePriceListResDto } from './dto/deletePriceList.res.dto';
import { registerRatePlanReqDto } from './dto/registerRatePlan.req.dto';
import { registerRatePlanResDto } from './dto/registerRatePlan.res.dto';
import { getAgencyDetailReqDto } from 'src/user/dto/getAgencyDetail.req.dto';
import { getAgencyDetailResDto } from 'src/user/dto/getAgencyDetail.res.dto';
import { getAgencyRatePlansResDto } from './dto/getAgencyRatePlans.res.dto';
import { getAgencyRatePlansReqDto } from './dto/getAgencyRatePlans.req.dto';
import { deleteRatePlanReqDto } from './dto/deleteRatePlan.req.dto';
import { deleteRatePlanResDto } from './dto/deleteRatePlan.res.dto';
import { checkReservationResDto } from './dto/checkReservation.res.dto';
import { checkReservationReqDto } from './dto/checkReservation.req.dto';
import { getAgencyReservationsResDto } from './dto/getAgencyReservations.res.dto';
import { getAgencyReservationsReqDto } from './dto/getAgencyReservations.req.dto';
import { getRatePlanDetailReqDto } from './dto/getRatePlanDetail.req.dto';
import { getRatePlanDetailResDto } from './dto/getRatePlanDetail.res.dto';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';

@Controller('agency')
export class AgencyController {
  constructor(private readonly agencyService: AgencyService) {}

  @Post('agencyLogin')
  @ApiOperation({ summary: '판매점 로그인' })
  @ApiResponse({
    status: 201,
    description: '로그인 성공',
    type: agencyLoginResDto,
  })
  @ApiBadRequestResponse({ description: '로그인 실패' })
  @ApiNotFoundResponse({ description: '해당 정보 보유 판매점 유저 없음' })
  async agencyLogin(
    @Body() dto: agencyLoginReqDto,
  ): Promise<agencyLoginResDto> {
    return this.agencyService.agencyLogin(dto);
  }

  @Post('agencyPasswordReset')
  @ApiOperation({ summary: '판매점 비밀번호 찾기' })
  @ApiResponse({
    status: 201,
    description: '비밀번호 찾음',
    type: agencyPasswordResetResDto,
  })
  @ApiBadRequestResponse({ description: '해당 판매점 아이디 보유 유저 없음' })
  async agencyPasswordReset(
    @Body() dto: agencyPasswordResetReqDto,
  ): Promise<agencyPasswordResetResDto> {
    return this.agencyService.agencyPasswordReset(dto);
  }

  @Post('enrollPriceList')
  @ApiOperation({ summary: '가격 리스트 등록' })
  @ApiResponse({
    status: 201,
    description: '등록 성공',
    type: enrollPriceListResDto,
  })
  @ApiBadRequestResponse({ description: '등록 실패' })
  async enrollPriceList(
    @Body() dto: enrollPriceListReqDto,
  ): Promise<enrollPriceListResDto> {
    return this.agencyService.enrollPriceList(dto);
  }

  @Post('modifyPriceList')
  @ApiOperation({ summary: '가격 리스트 수정' })
  @ApiResponse({
    status: 201,
    description: '수정 성공',
    type: modifyListResDto,
  })
  @ApiBadRequestResponse({ description: '수정 실패' })
  @ApiNotFoundResponse({ description: '해당 정보 보유 가격 리스트 없음' })
  async modifyPriceList(
    @Body() dto: modifyListReqDto,
  ): Promise<modifyListResDto> {
    return this.agencyService.modifyPriceList(dto);
  }

  @Delete('deletePriceList')
  @ApiOperation({ summary: '가격 리스트 삭제' })
  @ApiResponse({
    status: 201,
    description: '삭제 성공',
    type: deletePriceListResDto,
  })
  @ApiBadRequestResponse({ description: '삭제 실패' })
  @ApiNotFoundResponse({ description: '해당 정보 보유 가격 리스트 없음' })
  async deletePriceList(
    @Body() dto: deletePriceListReqDto,
  ): Promise<deletePriceListResDto> {
    return this.agencyService.deletePriceList(dto);
  }

  @Post('registerRatePlan')
  @ApiOperation({ summary: '요금제 등록' })
  @ApiResponse({
    status: 201,
    description: '등록 성공',
    type: registerRatePlanResDto,
  })
  @ApiBadRequestResponse({ description: '등록 실패' })
  async registerRatePlan(
    @Body() dto: registerRatePlanReqDto,
  ): Promise<registerRatePlanResDto> {
    return this.agencyService.registerRatePlan(dto);
  }

  @Get('getAgencyRatePlans')
  @ApiOperation({ summary: '요금제 리스트 조회' })
  @ApiResponse({
    status: 201,
    description: '조회 성공',
    type: getAgencyRatePlansResDto,
  })
  @ApiBadRequestResponse({ description: '조회 실패' })
  @ApiNotFoundResponse({ description: '해당 정보 보유 요금제 리스트 없음' })
  async getAgencyRatePlans(
    @Query() dto: getAgencyRatePlansReqDto,
  ): Promise<getAgencyRatePlansResDto> {
    return this.agencyService.getAgencyRatePlans(dto);
  }

  @Get('getRatePlanDetail')
  @ApiOperation({ summary: '요금제 상세 정보 단건 조회' })
  @ApiResponse({
    status: 201,
    description: '상세 조회 성공',
    type: getRatePlanDetailResDto,
  })
  @ApiBadRequestResponse({ description: '상세 조회 실패' })
  @ApiNotFoundResponse({ description: '해당 정보 보유 요금제 리스트 없음' })
  async getRatePlanDetail(
    @Query() dto: getRatePlanDetailReqDto,
  ): Promise<getRatePlanDetailResDto> {
    return this.agencyService.getRatePlanDetail(dto);
  }

  @Delete('deleteRatePlan')
  @ApiOperation({ summary: '요금제 리스트 삭제' })
  @ApiResponse({
    status: 201,
    description: '삭제 성공',
    type: deleteRatePlanResDto,
  })
  @ApiBadRequestResponse({ description: '삭제 실패' })
  @ApiNotFoundResponse({ description: '해당 정보 보유 요금제 리스트 없음' })
  async deleteRatePlan(
    @Body() dto: deleteRatePlanReqDto,
  ): Promise<deleteRatePlanResDto> {
    return this.agencyService.deleteRatePlan(dto);
  }

  @Post('checkReservation')
  @ApiOperation({ summary: '개통 예약 요청 건 처리' })
  @ApiResponse({
    status: 201,
    description: '예약 상태 처리 성공',
    type: checkReservationResDto,
  })
  @ApiBadRequestResponse({ description: '예약 상태 처리 실패' })
  @ApiNotFoundResponse({ description: '해당 정보 보유 예약 없음' })
  async checkReservations(
    @Body() dto: checkReservationReqDto,
  ): Promise<checkReservationResDto> {
    return this.agencyService.checkReservations(dto);
  }

  @Get('getAgencyReservations')
  @ApiOperation({ summary: '해당 판매점의 모든 예약 내역 조회' })
  @ApiResponse({
    status: 201,
    description: '조회 성공',
    type: getAgencyReservationsResDto,
  })
  @ApiBadRequestResponse({ description: '조회 실패' })
  @ApiNotFoundResponse({ description: '예약 없음' })
  async getAgencyReservations(
    @Query() dto: getAgencyReservationsReqDto,
  ): Promise<getAgencyReservationsResDto> {
    return this.agencyService.getAgencyReservations(dto);
  }
}
