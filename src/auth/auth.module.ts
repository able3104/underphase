// src/auth/auth.module.ts

import { forwardRef, Module } from '@nestjs/common';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { jwtStrategy } from './auth.jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agency } from 'src/entity/Agency.entity';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AgencyModule } from 'src/agency/agency.module';

@Module({
  imports: [
    forwardRef(() => AgencyModule),
    TypeOrmModule.forFeature([Agency]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
    // JWT 설정 (시크릿 키와 만료 시간 설정)
    JwtModule.registerAsync({
      imports: [ConfigModule],
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
  controllers: [AuthController],
  providers: [AuthService, jwtStrategy],
  exports: [AuthService, JwtModule, PassportModule],
})
export class AuthModule {}
