import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserRepository } from './auth.repository';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';
import * as config from 'config';

const jwtConfig = config.get('jwt');

@Module({
  imports : [TypeOrmModule.forFeature([User]),

    JwtModule.register({ // 토큰을 생성할 때 쓰는 부분
        secret : jwtConfig.secret,
        signOptions : {
          expiresIn : jwtConfig.expiresIn // 토큰 유효시간
        }
    }),
  
    PassportModule.register({defaultStrategy : 'jwt'})
  ],
  controllers: [AuthController],
  providers: [AuthService, UserRepository, JwtStrategy],
  exports : [JwtStrategy, PassportModule, UserRepository]
})
export class AuthModule {}
