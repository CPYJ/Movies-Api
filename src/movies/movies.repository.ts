import { DataSource, EntityRepository, Repository } from "typeorm";
import { Movie } from "./entities/movie.entity";
import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateMovieDto } from "./dto/create-movie.dto";

@Injectable()
export class MoviesRepository extends Repository<Movie>{

    // 0.3ver typeorm 에 필수적인 부분
        constructor(private dataSource : DataSource) {
            super(Movie, dataSource.createEntityManager());
        }

    
    async getOne(id:number) : Promise<Movie> {
         const movie = await this.findOne({  // this는 리포지토리를 가리킴
            where: {id : id}
        });
        return movie;
    }


}