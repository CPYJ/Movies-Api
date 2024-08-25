import { Module } from '@nestjs/common';
import { MoviesModule } from './movies/movies.module';
import { AppController } from './app.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { typeOrmConfig } from './configs/typeorm.config';
import { AuthModule } from './auth/auth.module';


@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig), //db 연결 설정
    MoviesModule, AuthModule],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
