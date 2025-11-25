import {
  Controller,
  Get,
  Header,
  HttpCode,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { authorizeReqDto } from './dto/authorize.req.dto';
import { authorizeResDto } from './dto/authorize.res.dto';
import { OauthService } from './oauth.service';
import { AuthGuard } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { ApiOperation } from '@nestjs/swagger';

@Controller('oauth')
export class OauthController {
  constructor(
    private readonly oauthService: OauthService,
    private readonly configService: ConfigService,
  ) {}

  @Get('authorize')
  @ApiOperation({ summary: '카카오 서버에 인가 코드 요청' })
  // @Header('Content-Type', 'text/html')
  async authorize(@Res() res): Promise<void> {
    return await this.oauthService.authorize(res);
  }

  @Post('callback')
  async callbackRedirect(@Query() query, @Res() res): Promise<void> {
    return await this.callbackRedirect(query, res);
  }

  // @Get('kakao') // 카카오 서버를 거쳐서 도착하게 될 엔드포인트
  // @UseGuards(AuthGuard('kakao')) // kakao.strategy를 실행시켜 줍니다.
  // @HttpCode(301)
  // async kakaoLogin(@Req() req: Request, @Res() res: Response) {
  //   const { accessToken, refreshToken } = await this.oauthService.getJWT(
  //     req.user.kakaoId,
  //   );
  //   res.cookie('accessToken', accessToken, { httpOnly: true });
  //   res.cookie('refreshToken', refreshToken, { httpOnly: true });
  //   res.cookie('isLoggedIn', true, { httpOnly: false });
  //   return res.redirect(this.configService.get('CLIENT_URL'));
  // }
}
