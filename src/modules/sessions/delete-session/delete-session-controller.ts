import {
  Body,
  Controller,
  Post,
  Req,
  UseGuards,
  UsePipes,
  ValidationPipe,
  Delete,
  Param,
} from '@nestjs/common';
import { DeleteSessionUseCase } from './delete-session-use-case';
import { JwtAuthGuard } from 'src/service/jwt/jwt-auth.guard';

@Controller('/sessions')
export class DeleteSessionController {
  constructor(private readonly deleteSessionUseCase: DeleteSessionUseCase) {}

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
  async handle(@Param('id') id: string, @Req() req) {
    const user = req.user;
    const result = await this.deleteSessionUseCase.execute(id, user);
    return result;
  }
}
