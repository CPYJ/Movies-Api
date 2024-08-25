import { Module } from '@nestjs/common';
import { MoviesController } from './movies.controller';
import { MoviesService } from './movies.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MoviesRepository } from './movies.repository';
import { Movie } from './entities/movie.entity';
import { AuthModule } from 'src/auth/auth.module';

@Module({
   // dataSource를 직접적으로 사용하기 때문에 써주진 않아도 되지만 유지보수 측면에서 유리함
   imports : [TypeOrmModule.forFeature([Movie]), AuthModule],
   controllers: [MoviesController],
   providers: [MoviesService, MoviesRepository] 
})
export class MoviesModule {}
