import { Injectable, Query, Res } from '@nestjs/common';
import { authorizeReqDto } from './dto/authorize.req.dto';
import { authorizeResDto } from './dto/authorize.res.dto';
import { response } from 'express';
import { ConfigService } from '@nestjs/config';
import { KakaoLogin } from './kakaologin';

@Injectable()
export class OauthService {
  constructor(
    private readonly configService: ConfigService,
    private readonly kakaoLogin: KakaoLogin,
  ) {}

  async authorize(@Res() res): Promise<void> {
    const _hostName = 'https://kauth.kakao.com';
    const _restApiKey = this.configService.get<string>('KAKAO_CLIENT_ID'); // * 입력필요
    // 카카오 로그인 RedirectURI 등록
    const _redirectUrl = this.configService.get<string>('KAKAO_CALLBACK_URL');
    const url = `${_hostName}/oauth/authorize?client_id=${_restApiKey}&redirect_uri=${_redirectUrl}&response_type=code`;
    return res.redirect(url);
  }

  async callbackRedirect(@Query() query, @Res() res): Promise<void> {
    // console.debug(query.code);
    const _restApiKey = this.configService.get<string>('KAKAO_CLIENT_ID'); // * 입력필요
    const _redirect_uri = this.configService.get<string>('KAKAO_CALLBACK_URL');
    const _hostName = `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${_restApiKey}&redirect_uri=${_redirect_uri}&code=${query.code}`;
    const _headers = {
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8',
      },
    };
    this.kakaoLogin
      .login(_hostName, _headers)
      .then((e) => {
        // console.log(`TOKEN : ${e.data['access_token']}`);
        this.kakaoLogin.setToken(e.data['access_token']);
        return res.send(`
          <div>
            <h2>축하합니다!</h2>
            <p>카카오 로그인 성공하였습니다 :)</p>
            <a href="/kakaoLogin">메인으로</a>
          </div>
        `);
      })
      .catch((err) => {
        // console.log(err);
        return res.send('error');
      });
  }

  // async getJWT(kakaoId: number) {
  //   const user = await this.kakaoValidateUser(kakaoId); // 카카오 정보 검증 및 회원가입 로직
  //   const accessToken = this.generateAccessToken(user); // AccessToken 생성
  //   const refreshToken = await this.generateRefreshToken(user); // refreshToken 생성
  //   return { accessToken, refreshToken };
  // }

  // async kakaoValidateUser(kakaoId: number): Promise<UserDocument> {
  //   let user: UserDocument =
  //     await this.usersRepository.findUserByKakaoId(kakaoId); // 유저 조회
  //   if (!user) {
  //     // 회원 가입 로직
  //     user = await this.usersRepository.create({
  //       kakaoId,
  //       provider: 'kakao',
  //     });
  //   }
  //   return user;
  // }
}
