import {
  BadRequestException,
  Body,
  Controller,
  Post,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateUserEntity } from 'src/entities/create-user.entitiy';
import { CreateUserUseCase } from './create-user-use-case';

@Controller('/auth')
export class CreateUserController {
  constructor(private readonly createUserUseCase: CreateUserUseCase) {}

  @Post('/signup')
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async handle(@Body() body: CreateUserEntity) {
    const result = await this.createUserUseCase.execute(body);
    return result;
  }
}
