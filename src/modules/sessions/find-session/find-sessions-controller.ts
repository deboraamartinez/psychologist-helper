import {
  Controller,
  Get,
  Req,
  UseGuards,
  ValidationPipe,
} from '@nestjs/common';
import { FindSessionUseCase } from './find-sessions-use-case';
import { JwtAuthGuard } from 'src/service/jwt/jwt-auth.guard';

@Controller('/sessions')
export class FindSessionController {
  constructor(private readonly findSessionUseCase: FindSessionUseCase) {}

  @Get('')
  @UseGuards(JwtAuthGuard)
  async handle(@Req() req) {
    const user = req.user;
    const result = await this.findSessionUseCase.execute(user);
    return result;
  }
}
