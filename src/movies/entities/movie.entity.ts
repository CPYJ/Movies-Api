import { User } from "src/auth/user.entity";
import { BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Movie  extends BaseEntity{

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title : string;

    @Column()
    year : number;

     @Column({nullable: true})
     genre : string;

     @ManyToOne(type => User, user => user.movies, {eager:true})
     user : User;
}