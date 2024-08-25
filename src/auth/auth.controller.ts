import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthCredentialDto } from './dto/auth-credential.dto';
import { AuthGuard } from '@nestjs/passport';
import { GetUser } from './get-user.decorator';
import { User } from './user.entity';

@Controller('auth')
export class AuthController {

    constructor(private authService : AuthService) {}

    @Post()
    signUp(@Body() acDto : AuthCredentialDto) {
        return this.authService.createUser(acDto);
    }

    @Post('/signIn')
    signIn(@Body() acDto : AuthCredentialDto) {
        console.log('들어옴');
        return this.authService.signIn(acDto);
    }

    @Post('/test')
    @UseGuards(AuthGuard())
    test(@GetUser() user : User) {
        console.log('user', user);
    }
}
