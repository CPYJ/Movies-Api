import { Inject, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportSerializer, PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserRepository } from "./auth.repository";
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {

    @Inject()
    private userRepository : UserRepository;

    constructor() {
        super({
            secretOrKey : jwtConfig.secret,
            jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken()
            // jwt 토큰을 http 요청의 헤더에서 추출하는 방법 설정
        })
    }


    async validate(payload) { // 토큰이 유효한지 확인되면 실행되는 메서드
        const user = await this.userRepository.findOne({
            where : {username : payload.username}
        });
        if(!user) throw new UnauthorizedException();

        return user;
    }
}