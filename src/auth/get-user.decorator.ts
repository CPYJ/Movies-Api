import { ExecutionContext, createParamDecorator } from "@nestjs/common";
import { User } from "./user.entity";

// 커스텀 데코레이터 생성. 변수명이 데코레이터 이름이 됨
export const GetUser = createParamDecorator((data, ctx: ExecutionContext) : User => { 
    const req = ctx.switchToHttp().getRequest();
    return req.user;
})