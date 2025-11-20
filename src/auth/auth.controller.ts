// src/auth/auth.controller.ts

import { Controller, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // 1. 카카오 로그인 시작 엔드포인트
  // /auth/kakao 요청 시 카카오 로그인 페이지로 리다이렉트
  // @Get('kakao')
  // @UseGuards(AuthGuard('kakao'))
  // async kakaoAuth(@Req() req) {
  //   // 이 함수는 실행되지 않고, Passport가 카카오로 리다이렉트 처리합니다.
  // }

  // // 2. 카카오 로그인 콜백 엔드포인트
  // // 카카오 인증 후 Redirect URI로 돌아오는 요청을 처리
  // @Get('kakao/callback')
  // @UseGuards(AuthGuard('kakao'))
  // async kakaoAuthRedirect(@Req() req, @Res() res) {
  //   // req.user에는 KakaoStrategy의 validate()에서 반환된 정보(JWT 토큰 포함)가 들어있습니다.
  //   const jwt = req.user.access_token;

  //   // 💡 클라이언트에게 JWT 토큰을 전달하는 방식
  //   // - 프론트엔드 URL로 리다이렉트하며 쿼리 파라미터나 쿠키에 토큰을 담아 전달하는 것이 일반적입니다.
  //   res.redirect(`http://underphae.com/oauth`);
  // }
}
