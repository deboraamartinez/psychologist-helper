import {
  Body,
  Controller,
  Get,
  Put,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { UpdatePsychologistUseCase } from './update-psychologist-use-case';
import { JwtAuthGuard } from 'src/service/jwt/jwt-auth.guard';

@Controller('/psychologist')
export class UpdatePsychologistController {
  constructor(
    private readonly updatePsychologistUseCase: UpdatePsychologistUseCase,
  ) {}


  @Put('')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async update(@Req() req, @Body() body) {
    const user = req.user;
    const result = await this.updatePsychologistUseCase.execute(user, body);
    return result;
  }
}
