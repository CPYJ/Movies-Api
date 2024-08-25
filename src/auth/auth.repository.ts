import { DataSource, Repository } from "typeorm";
import { User } from "./user.entity";
import { Injectable } from "@nestjs/common";
import { AuthCredentialDto } from "./dto/auth-credential.dto";

@Injectable()
export class UserRepository extends Repository<User> {

    constructor(private dataSource : DataSource) {
        super(User, dataSource.createEntityManager());
    }

    

}