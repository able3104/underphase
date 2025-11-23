import { Module } from '@nestjs/common';
import { AppController } from './app.controller'; // (사용되지 않아도, 일반적으로 유지)
import { AppService } from './app.service'; // (사용되지 않아도, 일반적으로 유지)
import { UserModule } from './user/user.module';
import { AgencyModule } from './agency/agency.module';
import { ConfigModule, ConfigService } from '@nestjs/config'; // ConfigService를 직접 import
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    // 1. ConfigModule을 전역으로 설정
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: process.env.NODE_ENV === 'dev' ? '.env.development' : '.env', // (선택 사항: 환경별 파일 경로 지정)
    }),

    // 2. TypeORM 비동기 설정 (forRootAsync)
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mariadb',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),

        // 🚨 수정 2: 엔티티 경로를 명확하게 지정
        // TypeORM 0.3.x 이상에서는 autoLoadEntities를 true로 설정하는 것이 모범 사례입니다.
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),

    UserModule,
    AgencyModule,
    AuthModule,
  ],
  controllers: [], // AppController가 있다면 유지
  providers: [], // AppService가 있다면 유지
})
export class AppModule {}
