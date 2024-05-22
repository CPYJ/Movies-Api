import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe({
    whitelist : true, // 요청에 포함된 데이터 중 dto에 정의된 속성만 허용하고 나머지는 무시
    forbidNonWhitelisted : true, // Dto에 정의되지 않은 속성이 요청에 포함되면 해당 요청 자체를 거부 -> 예외 발생
    transform:true, // 유저들이 보낸 것을 우리가 받기를 원하는 타입으로 변환해줌

  }));
  // 유효성 검사 파이프
  await app.listen(3000);
}
bootstrap();
