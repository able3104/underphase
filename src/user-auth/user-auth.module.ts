import { forwardRef, Module } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserAuthController } from './user-auth.controller';
import { AgencyModule } from 'src/agency/agency.module';
import { UserModule } from 'src/user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Agency } from 'src/entity/Agency.entity';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { JwtModule, JwtModuleOptions } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    forwardRef(() => AgencyModule),
    forwardRef(() => UserModule),
    TypeOrmModule.forFeature([Agency]),
    HttpModule,
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
  providers: [UserAuthService],
  controllers: [UserAuthController],
  exports: [UserAuthService, PassportModule],
})
export class UserAuthModule {}
