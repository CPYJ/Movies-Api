import { Body, Controller, Delete, Get, Logger, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { MoviesService } from './movies.service';
import { Movie } from './entities/movie.entity';
import { CreateMovieDto } from './dto/create-movie.dto';
import { UpdateMovieDto } from './dto/update-movie.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from 'src/auth/get-user.decorator';
import { User } from 'src/auth/user.entity';

@Controller('movies')
@UseGuards(AuthGuard())
export class MoviesController {

    private logger = new Logger('moviesController');
    constructor(private readonly moviesService : MoviesService){}

    @Get()
    getAll() : Promise<Movie[]>{
        
        return this.moviesService.getAll();
    }

    // @Get("/search")
    // search(@Query("year") searchingYear : string) { 
    //     // 이 메서드가 하단의 메서드보다 아래에 있으면 경로인 "/search"를 id로 판단
    //     return `searching for a movie made after: ${searchingYear}`;
    // }

    @Get("/getMyMovies")
    getMyMovies(@GetUser() user: User) : Promise<Movie[]>{
        this.logger.verbose(`User ${user.username} trying to get her movies`);

        return this.moviesService.getMyMovies(user);
    }

    @Get("/:id")
    getOne(@Param("id") movieId:number) : Promise<Movie>{
        return this.moviesService.getOne(movieId);
    }

    @Post()
    create(@Body() movieData : CreateMovieDto, @GetUser() user:User): Promise<Movie>{
        this.logger.verbose(`User ${user.username} is creatung a new movie. Payload : ${JSON.stringify(movieData)}`);
        return this.moviesService.create(movieData, user);
    }

    @Delete('/:id')
    remove(@Param('id') movieId:number, @GetUser() user : User) : Promise<void> {
        return this.moviesService.deleteOne(movieId, user);
    }


    @Patch('/:id')
    patch(@Param('id') movieId:number, @Body() updateData:UpdateMovieDto) {
        return this.moviesService.update(movieId, updateData);
    }

    
    

}
