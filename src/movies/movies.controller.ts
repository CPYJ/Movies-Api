import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';

@Controller('movies')
export class MoviesController {

    constructor(private readonly moviesService : MoviesService){}

    @Get()
    getAll(): Movie[]{
        return this.moviesService.getAll();
    }

    @Get("search")
    search(@Query("year") searchingYear : string) { 
        // 이 메서드가 하단의 메서드보다 아래에 있으면 "search"를 id로 판단
        return `searching for a movie made after: ${searchingYear}`;
    }

    @Get("/:id")
    getOne(@Param("id") movieId:number) : Movie{
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData : CreateMovieDto){
        return this.moviesService.create(movieData);
    }

    @Delete('/:id')
    remove(@Param('id') movieId:number) {
        return this.moviesService.deleteOne(movieId);
    }

    @Patch('/:id')
    patch(@Param('id') movieId:number, @Body() updateData:UpdateMovieDto) {
        return this.moviesService.update(movieId, updateData);
    }

    
    

}
