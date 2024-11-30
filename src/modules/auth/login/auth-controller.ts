import {
    BadRequestException,
    Body,
    Controller,
    Post,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { LoginUserEntity } from 'src/entities/login.entitiy';
  import { AuthUseCase } from './auth-use-case';
  
  @Controller('/auth')
  export class AuthController {
    constructor(private readonly loginUseCase: AuthUseCase){}
  
    @Post('/login')
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async handle(@Body() body: LoginUserEntity) {
      const result = await this.loginUseCase.execute(body);
      return result;
    }
  }
  