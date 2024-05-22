import { IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMovieDto {

    @IsString() // validation
    readonly title:string;

    @IsNumber()
    readonly year:number;

    @IsOptional()
    @IsString({each : true}) // 모든 요소를 유효성 검사한다는 뜻
    readonly genres:string[]; 
}