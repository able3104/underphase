import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import * as admin from 'firebase-admin'; // 👈 Firebase Admin SDK 임포트
import * as path from 'path';
import * as fs from 'fs';
import { cwd } from 'process';

async function bootstrap() {
  // ----------------------------------------------------
  // 🔑 Firebase Admin SDK 초기화 로직 추가
  // ----------------------------------------------------
  if (admin.apps.length === 0) {
    try {
      // 💡 환경 변수를 사용하여 서비스 계정 키 파일 경로를 설정합니다.
      // 예: SERVICE_ACCOUNT_KEY_PATH=config/firebase-keys/underphase-ad033-admin-key.json
      const serviceAccountPath = process.env.SERVICE_ACCOUNT_KEY_PATH;

      if (!serviceAccountPath) {
        throw new Error(
          '환경 변수 SERVICE_ACCOUNT_KEY_PATH가 설정되지 않았습니다.',
        );
      }

      const absolutePath = path.resolve(cwd(), serviceAccountPath);

      console.log(
        `[DEBUG] Attempting to load Firebase Service Account from: ${absolutePath}`,
      );

      // 파일 내용을 동기적으로 읽기
      const serviceAccountJson = fs.readFileSync(absolutePath, 'utf8');
      const serviceAccount = JSON.parse(serviceAccountJson);

      // Admin SDK 초기화
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount),
      });
      console.log('✅ Firebase Admin SDK initialized successfully in main.ts.');
    } catch (e) {
      console.error('❌ Firebase Admin SDK initialization critical failure:');
      console.error(`Error details: ${e.message}`);
      console.error(
        'Check if SERVICE_ACCOUNT_KEY_PATH is correct and the file exists.',
      );
      // 초기화 실패 시 앱 시작을 중단할지 결정할 수 있습니다.
      // throw e;
    }
  }
  // ----------------------------------------------------

  const app = await NestFactory.create(AppModule, { cors: true });
  // const whitelist = ['http://localhost:3001'];
  // app.enableCors({
  //   origin: function (origin, callback) {
  //     if (!origin || whitelist.indexOf(origin) !== -1) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error('Not allowed by CORS'));
  //     }
  //   },
  //   allowedHeaders: '*',
  //   methods: 'GET,PUT,PATCH,POST,DELETE,UPDATE,OPTIONS',
  //   credentials: true,
  // });
  const config = new DocumentBuilder()
    .setTitle('Under Phase API')
    .setDescription('The Under Phase API description')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  app.useGlobalPipes(new ValidationPipe());

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
