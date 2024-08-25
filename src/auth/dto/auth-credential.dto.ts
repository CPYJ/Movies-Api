import { IsString, Matches, MaxLength, MinLength } from "class-validator";

export class AuthCredentialDto {

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username : string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    // 영어랑 숫자만 받을 수 있게끔
    @Matches(/^[a-zA-Z0-9]*$/, {
        message : 'password only accepts english and number' // 위반 될 경우 내보내는 메시지
    })
    password : string;
}