import {
  Body,
  Controller,
  Get,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Param,
} from '@nestjs/common';
import { FindPsychologistUseCase } from './find-psychologist-use-case';
import { JwtAuthGuard } from 'src/service/jwt/jwt-auth.guard';

@Controller('/psychologist')
export class FindPsychologistController {
  constructor(
    private readonly findPsychologistUseCase: FindPsychologistUseCase,
  ) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async handle(@Req() req) {
    const user = req.user;
    const result = await this.findPsychologistUseCase.execute(user);
    return result;
  }
}
