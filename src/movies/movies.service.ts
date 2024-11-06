import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { MoviesRepository } from './movies.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/auth/user.entity';

@Injectable()
export class MoviesService { 
    
    
    constructor( 
        private moviesRepository : MoviesRepository
    ) {}



    async getAll() :  Promise<Movie[]> {
        return await this.moviesRepository.find();
    }

    async getMyMovies(user :User) : Promise<Movie[]> {
        const movies = await this.moviesRepository.find({
            where : {user : user}
        });

        return movies;
    }

    async getOne(id:number) : Promise<Movie> {
        const movie = await this.moviesRepository.getOne(id); 
        // 위에 await 이 없으면 movie가 없어도 null이 아니라 promise 객체로 인식돼서 하단의 조건문에 들어가질 못함

        if(!movie) { // 가져오려는 movie가 없다면 에러화면이라도 내보내기 위함
            throw new NotFoundException(`movie with id ${id} not found`);
        }
        return movie;
    }

    // 본인이 생성한 movie 만을 지울 수 있음
     async deleteOne(id:number, user:User) { // delete는 비동기 함수
        const result =  await this.moviesRepository.delete({id, user});
        if(result.affected == 0) { // 지우려던 게시물이 없다면
            throw new NotFoundException(`Can't find a Movie with id ${id}`);
        }
    }

    async create(movieData:CreateMovieDto, user:User) {
        //create 는 동기 메서드. user는 ...을 써서 펼치지 않고 뭉쳐서 담는다
        const movie = this.moviesRepository.create({...movieData, user: user}); 
        await this.moviesRepository.save(movie);
        return movie;
    }

    async update(id:number, updateData:UpdateMovieDto) {
        const movie = await this.getOne(id);
        const newMovie = await this.moviesRepository.save({...movie, ...updateData});
        // 객체의 속성이 겹치면 뒤에 있는게 덮어쓰고 +=
        return newMovie;
    }
}
