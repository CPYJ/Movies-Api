import { Injectable, NotFoundException } from '@nestjs/common';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Injectable()
export class MoviesService { // 가짜 db역할. 진짜 db는 쿼리를 날림
    private movies :Movie[] = [];

    getAll() : Movie[] {
        return this.movies;
    }

    getOne(id:number) : Movie {
        const movie = this.movies.find(movie => movie.id === id); 
        // +stringTypeNumber => number
        if(!movie) { // 가져오려는 movie가 없다면 에러화면이라도 내보내기 위함
            throw new NotFoundException(`movie with id ${id} not found`);
        }
        return movie;
    }

    deleteOne(id:number) {

        this.getOne(id); // 여기서 예외가 터지지 않는다면 아랫줄이 실행됨
        this.movies = this.movies.filter(movie => movie.id !== id );
        // movie 에는 매 요소가 들어감
    }

    create(movieData:CreateMovieDto) {
        this.movies.push({
            id: this.movies.length + 1,
            ...movieData
        });
    }

    update(id:number, updateData:UpdateMovieDto) {
        const movie = this.getOne(id);
        this.deleteOne(id);
        this.movies.push({...movie, ...updateData});
        // 객체의 속성이 겹치면 뒤에 있는게 덮어쓰고 +=
    }
}
