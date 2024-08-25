import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { MoviesRepository } from "src/movies/movies.repository";
import { DataSource } from "typeorm";
import * as config from 'config';

const dbConfig = config.get('db');

export const typeOrmConfig : TypeOrmModuleOptions = {
    type: dbConfig.type,
    host : dbConfig.host || process.env.RDS_HOSTNAME,
    port: dbConfig.port,
    username : dbConfig.username,
    password : dbConfig.password,
    database : dbConfig.database,
    entities : [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize : dbConfig.synchronize
}

// export const typeOrmConfig  = new DataSource({
//     type: 'postgres',
//     host : 'localhost',
//     port: 5432,
//     username : 'postgres',
//     password : 'user',
//     database : 'movie-app',
//     entities : [__dirname + '/../**/*.entity.{js,ts}'],
//     synchronize : true,
//     repositories : 
// });