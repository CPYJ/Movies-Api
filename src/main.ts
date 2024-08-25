import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import * as config from 'config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // 유효성 검사 파이프
  app.useGlobalPipes(new ValidationPipe({
    whitelist : true, // 요청에 포함된 데이터 중 dto에 정의된 속성만 허용하고 나머지는 무시
    forbidNonWhitelisted : true, // Dto에 정의되지 않은 속성이 요청에 포함되면 해당 요청 자체를 거부 -> 예외 발생
    transform:true, // 유저들이 보낸 것을 우리가 받기를 원하는 타입으로 변환해줌

  }));

  const serverConfig = config.get('server');
  const port = serverConfig.port;
  await app.listen(port);
  Logger.log(`Application running on port ${port}`)
}
bootstrap();
