import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { KakaoStrategy } from './kakao.strategy';
import { jwtStrategy } from 'src/auth/auth.jwt';
import { OauthService } from './oauth.service';
import { AuthModule } from 'src/auth/auth.module';
import { KakaoLogin } from './kakaologin';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PassportModule,
    AuthModule,
    JwtModule.registerAsync({
      imports: [ConfigModule], // 👈 JwtModule에 ConfigModule을 가져옵니다.
      inject: [ConfigService],

      useFactory: (config: ConfigService): JwtModuleOptions => {
        const secret = config.get<string>('JWT_SECRET');
        if (!secret) {
          throw new Error('JWT_SECRET must be defined');
        }
        const expires = config.get<string>('JWT_EXPIRATION_TIME');

        // expiresIn as string or number or undefined
        let expiresIn: string | number | undefined = undefined;

        if (expires) {
          // try convert numeric string to number
          expiresIn = isNaN(Number(expires)) ? expires : Number(expires);
        }

        return {
          secret,
          signOptions: { expiresIn: expiresIn as any },
        };
      },
    }),
  ],
  providers: [KakaoStrategy, jwtStrategy, OauthService, KakaoLogin],
})
export class OauthModule {}
