import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  HttpException,
  Post,
  Query,
  Res,
  Response,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOperation,
  ApiResponse,
} from '@nestjs/swagger';
import { kakaoLoginReqDto } from './dto/kakaoLogin.req.dto';
import { kakaoLoginResDto } from './dto/kakaoLogin.res.dto';
import { kakaoSignupCallbackReqDto } from './dto/kakaoSignupCallback.req.dto';
import { kakaoSignupCallbackResDto } from './dto/kakaoSignupCallback.res.dto';
import { searchAgenciesReqDto } from './dto/searchAgencies.req.dto';
import { searchAgenciesResDto } from './dto/searchAgencies.res.dto';
import { getAgencyDetailReqDto } from './dto/getAgencyDetail.req.dto';
import { getAgencyDetailResDto } from './dto/getAgencyDetail.res.dto';
import { chooseAgencyReqDto } from './dto/chooseAgency.req.dto';
import { chooseAgencyResDto } from './dto/chooseAgency.res.dto';
import { confirmVisitReqDto } from './dto/confirmVisit.req.dto';
import { confirmVisitResDto } from './dto/confirmVisit.res.dto';
import { cancelReservationReqDto } from './dto/cancelReservation.req.dto';
import { cancelReservationResDto } from './dto/cancelReservation.res.dto';
import { registerQuoteReqDto } from './dto/registerQuote.req.dto';
import { resisterQuoteResDto } from './dto/registerQuote.res.dto';
import { getQuoteReqDto } from './dto/getQuote.req.dto';
import { getQuoteResDto } from './dto/getQuote.res.dto';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  // @Post('kakaoLogin')
  // @ApiOperation({ summary: '카카오 로그인' })
  // @ApiResponse({
  //   status: 201,
  //   description: '로그인 성공',
  //   type: kakaoLoginResDto,
  // })
  // @ApiBadRequestResponse({ description: '로그인 실패' })
  // @ApiNotFoundResponse({ description: '해당 카카오 아이디 보유 유저 없음' })
  // async kakaoLogin(@Body() dto: kakaoLoginReqDto): Promise<kakaoLoginResDto> {
  //   return this.userService.kakaoLogin(dto);
  // }

  // @Get('kakaoSignupCallback')
  // @ApiOperation({ summary: '카카오 회원가입 콜백' })
  // @ApiResponse({
  //   status: 201,
  //   description: '회원가입 콜백 성공',
  //   type: kakaoSignupCallbackResDto,
  // })
  // @ApiBadRequestResponse({ description: '회원가입 콜백 실패' })
  // @ApiNotFoundResponse({ description: '해당 카카오 아이디 보유 유저 없음' })
  // async kakaoSignupCallback(@Query('code') code: string, @Res() res: Response) {
  //   try {
  //     const token = await this.authService.getKakaoAccessToken(code);
  //   } catch {
  //     return new HttpException('kakao login failed', 500);
  //   }
  // }

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

  @Post('registerQuote')
  @ApiOperation({ summary: '견적서 등록' })
  @ApiResponse({
    status: 201,
    description: '견적서 등록 성공',
    type: resisterQuoteResDto,
  })
  @ApiBadRequestResponse({ description: '견적서 등록 실패' })
  async registerQuote(
    @Body() dto: registerQuoteReqDto,
  ): Promise<resisterQuoteResDto> {
    return this.userService.registerQuote(dto);
  }

  @Get('getQuote')
  @ApiOperation({ summary: '견적서 조회' })
  @ApiResponse({
    status: 201,
    description: '견적서 조회 성공',
    type: getQuoteResDto,
  })
  @ApiBadRequestResponse({ description: '견적서 조회 실패' })
  @ApiNotFoundResponse({ description: '해당 견적서 없음' })
  async getQuote(@Query() dto: getQuoteReqDto): Promise<getQuoteResDto> {
    return this.userService.getQuote(dto);
  }
}
