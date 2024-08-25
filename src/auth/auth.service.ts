import { ConflictException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './auth.repository';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {

    constructor(private userRepository : UserRepository, private jwtService : JwtService) {}



    async createUser(acDto : AuthCredentialDto) :Promise<void> {

        // 비밀번호 암호화
        const salt = await bcrypt.genSalt();
        acDto.password = await bcrypt.hash(acDto.password, salt);

        const user = this.userRepository.create(acDto);

        try {
            await this.userRepository.save(user);
        } catch(error) {
            console.log(error);
            if (error.code === '23505') {
                throw new ConflictException('Existing username');
            }
            else throw new InternalServerErrorException();
        }
        
    }


    async signIn(acDto : AuthCredentialDto) : Promise<{accessToken : string}> {

        const user = await this.userRepository.findOne({
            where : {username : acDto.username}
        });

        // 입력한 비밀번호, 암호화된 비밀번호 순으로 적어야 함
        if(user && await bcrypt.compare(acDto.password, user.password )) { // 유저 토큰 생성. ( Secret + Payload ) 하여 jwt 생성
            const payload = {username : acDto.username};
            const accessToken = await this.jwtService.sign(payload); // jwt 생성. 헤더를 자동으로 넣어줌

            return {accessToken}; // accessToken을 json 형태로 반환

        } else {
            console.log('들어옴 서비스');
            throw new UnauthorizedException('login failed');
        }

    }
    
}
