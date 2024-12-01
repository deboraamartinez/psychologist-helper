import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { CreateSessionEntity } from 'src/entities/create-session.entity';
import { CreateSessionUseCase } from './create-session-use-case';
import { JwtAuthGuard } from 'src/service/jwt/jwt-auth.guard';

@Controller('/sessions')
export class CreateSessionController {
  constructor(private readonly createSessionUseCase: CreateSessionUseCase) {}

  @Post('')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async handle(@Body() body: CreateSessionEntity, @Req() req) {
    const user = req.user;
    const result = await this.createSessionUseCase.execute(body, user);
    return result;
  }
}
