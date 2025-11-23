import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  // const whitelist = ['http://localhost:3001', 'https://under-phase.com'];
  // app.enableCors({
  //   origin: function (origin, callback) {
  //     if (!origin || whitelist.indexOf(origin) !== -1) {
  //       callback(null, true);
  //     } else {
  //       callback(new Error('Not allowed by CORS'));
  //     }
  //   },
  //   allowedHeaders: '*',
  //   methods: 'GET,PUT,PATCH,POST,DELETE,UPDATE,OPTIONS',
  //   credentials: true,
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
