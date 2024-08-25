import { Movie } from "src/movies/entities/movie.entity";
import { BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";

@Entity()
@Unique(['username']) // username이 중복이면 에러 던짐
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id : number;

    @Column()
    username : string;

    @Column()
    password : string;

    @OneToMany(type => Movie, movie => movie.user, {eager : false})
    movies : Movie[];

}