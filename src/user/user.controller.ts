import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { searchedInfoReqDto } from './dto/searchedInfo.req.dto';
import { searchedInfoResDto } from './dto/searchedInfo.res.dto';
import { kakaoLoginReqDto } from './dto/kakaoLogin.req.dto';
import { kakaoLoginResDto } from './dto/kakaoLogin.res.dto';
import { kakaoSignupCallbackReqDto } from './dto/kakaoSignupCallback.req.dto';
import { kakaoSignupCallbackResDto } from './dto/kakaoSignupCallback.res.dto';
import { searchAgenciesReqDto } from './dto/searchAgencies.req.dto';
import { searchAgenciesResDto } from './dto/searchAgencies.res.dto';
import { refilterAgenciesReqDto } from './dto/refilterAgencies.req.dto';
import { refilterAgenciesResDto } from './dto/refilterAgencies.res.dto';
import { getAgencyDetailReqDto } from './dto/getAgencyDetail.req.dto';
import { getAgencyDetailResDto } from './dto/getAgencyDetail.res.dto';
import { searchRatePlansReqDto } from './dto/searchRatePlans.req.dto';
import { searchRatePlansResDto } from './dto/searchRatePlans.res.dto';
import { chooseAgencyReqDto } from './dto/chooseAgency.req.dto';
import { chooseAgencyResDto } from './dto/chooseAgency.res.dto';
import { confirmVisitReqDto } from './dto/confirmVisit.req.dto';
import { confirmVisitResDto } from './dto/confirmVisit.res.dto';
import { getUserReservationsResDto } from './dto/getUserReservations.res.dto';
import { getUserReservationsReqDto } from './dto/getUserReservations.req.dto';
import { cancelReservationReqDto } from './dto/cancelReservation.req.dto';
import { cancelReservationResDto } from './dto/cancelReservation.res.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post('searchedInfo')
  // @ApiOperation({ summary: '유저 조건 입력' })
  // @ApiResponse({
  //   status: 201,
  //   description: '조건 입력 성공',
  //   type: searchedInfoResDto,
  // })
  // @ApiBadRequestResponse({ description: '조건 입력 실패' })
  // async searchedInfo(
  //   @Body() dto: searchedInfoReqDto,
  // ): Promise<searchedInfoResDto> {
  //   return this.userService.searchedInfo(dto);
  // }

  @Post('kakaoLogin')
  @ApiOperation({ summary: '카카오 로그인' })
  @ApiResponse({
    status: 201,
    description: '로그인 성공',
    type: kakaoLoginResDto,
  })
  @ApiBadRequestResponse({ description: '로그인 실패' })
  @ApiNotFoundResponse({ description: '해당 카카오 아이디 보유 유저 없음' })
  async kakaoLogin(@Body() dto: kakaoLoginReqDto): Promise<kakaoLoginResDto> {
    return this.userService.kakaoLogin(dto);
  }

  @Post('kakaoSignupCallback')
  @ApiOperation({ summary: '카카오 회원가입 콜백' })
  @ApiResponse({
    status: 201,
    description: '회원가입 콜백 성공',
    type: kakaoSignupCallbackResDto,
  })
  @ApiBadRequestResponse({ description: '회원가입 콜백 실패' })
  @ApiNotFoundResponse({ description: '해당 카카오 아이디 보유 유저 없음' })
  async kakaoSignupCallback(
    @Body() dto: kakaoSignupCallbackReqDto,
  ): Promise<kakaoSignupCallbackResDto> {
    return this.userService.kakaoSignupCallback(dto);
  }

  @Post('searchAgencies')
  @ApiOperation({ summary: '판매점 검색' })
  @ApiResponse({
    status: 201,
    description: '판매점 검색 성공',
    type: searchAgenciesResDto,
  })
  // 리스트로 res 되게 변경
  @ApiBadRequestResponse({ description: '판매점 검색 실패' })
  @ApiNotFoundResponse({ description: '조건에 맞는 판매점 없음' })
  async searchAgencies(
    @Body() dto: searchAgenciesReqDto,
  ): Promise<searchAgenciesResDto> {
    return this.userService.searchAgencies(dto);
  }

  // @Post('refilterAgencies')
  // @ApiOperation({ summary: '판매점 재필터링' })
  // @ApiResponse({
  //   status: 201,
  //   description: '판매점 재필터링 성공',
  //   type: refilterAgenciesResDto,
  // })
  // @ApiBadRequestResponse({ description: '판매점 재필터링 실패' })
  // @ApiNotFoundResponse({ description: '조건에 맞는 판매점 없음' })
  // async refilterAgencies(
  //   @Body() dto: refilterAgenciesReqDto,
  // ): Promise<refilterAgenciesResDto> {
  //   return this.userService.refilterAgencies(dto);
  // }

  @Post('getAgencyDetail')
  //get 으로 하면 id 취탈가능성 존재
  //그러므로 get >> post
  @ApiOperation({ summary: '판매점 상세정보 조회' })
  @ApiResponse({
    status: 201,
    description: '판매점 상세정보 조회 성공',
    type: getAgencyDetailResDto,
  })
  @ApiBadRequestResponse({ description: '판매점 상세정보 조회 실패' })
  @ApiNotFoundResponse({ description: '해당 판매점 없음' })
  async getAgencyDetail(
    @Body() dto: getAgencyDetailReqDto,
  ): Promise<getAgencyDetailResDto> {
    return this.userService.getAgencyDetail(dto);
  }

  @Post('searchRatePlans')
  @ApiOperation({ summary: '요금제 검색' })
  @ApiResponse({
    status: 201,
    description: '요금제 검색 성공',
    type: searchRatePlansResDto,
  })
  @ApiBadRequestResponse({ description: '요금제 검색 실패' })
  @ApiNotFoundResponse({ description: '조건에 맞는 요금제 없음' })
  async searchRatePlans(
    @Body() dto: searchRatePlansReqDto,
  ): Promise<searchRatePlansResDto> {
    return this.userService.searchRatePlans(dto);
  }

  @Post('chooseAgency')
  // 이름 변경
  @ApiOperation({ summary: '판매점 선택' })
  @ApiResponse({
    status: 201,
    description: '판매점 선택 성공',
    type: chooseAgencyResDto,
  })
  @ApiBadRequestResponse({ description: '판매점 선택 실패' })
  @ApiNotFoundResponse({ description: '해당 판매점 없음' })
  async chooseAgency(
    @Body() dto: chooseAgencyReqDto,
  ): Promise<chooseAgencyResDto> {
    return this.userService.chooseAgency(dto);
  }

  // @Post('confirmVisit')
  // @ApiOperation({ summary: '방문 확정' })
  // @ApiResponse({
  //   status: 201,
  //   description: '방문 확정 성공',
  //   type: confirmVisitResDto,
  // })
  // @ApiBadRequestResponse({ description: '방문 확정 실패' })
  // @ApiNotFoundResponse({ description: '해당 예약 없음' })
  // async confirmVisit(
  //   @Body() dto: confirmVisitReqDto,
  // ): Promise<confirmVisitResDto> {
  //   return this.userService.confirmVisit(dto);
  // }

  @Get('getUserReservations')
  @ApiOperation({ summary: '유저 예약 내역 조회' })
  @ApiResponse({
    status: 201,
    description: '유저 예약 내역 조회 성공',
    type: getUserReservationsResDto,
  })
  @ApiBadRequestResponse({ description: '유저 예약 내역 조회 실패' })
  @ApiNotFoundResponse({ description: '해당 유저 예약 내역 없음' })
  async getUserReservations(
    @Query() dto: getUserReservationsReqDto,
  ): Promise<getUserReservationsResDto> {
    return this.userService.getUserReservations(dto);
  }

  @Delete('cancelReservation')
  @ApiOperation({ summary: '예약 취소' })
  @ApiResponse({
    status: 201,
    description: '예약 취소 성공',
    type: cancelReservationResDto,
  })
  @ApiBadRequestResponse({ description: '예약 취소 실패' })
  @ApiNotFoundResponse({ description: '해당 예약 없음' })
  async cancelReservation(
    @Body() dto: cancelReservationReqDto,
  ): Promise<cancelReservationResDto> {
    return this.userService.cancelReservation(dto);
  }
}
