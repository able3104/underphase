// src/auth/auth.module.ts

import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { KakaoStrategy } from './kakao.strategy';

@Module({
  imports: [
    PassportModule,
    // JWT 설정 (시크릿 키와 만료 시간 설정)
    JwtModule.register({
      secret: 'YOUR_JWT_SECRET', // ⚠️ 실제 환경에서는 환경 변수로 관리하세요.
      signOptions: { expiresIn: '60m' },
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService, KakaoStrategy],
  exports: [AuthService],
})
export class AuthModule {}
