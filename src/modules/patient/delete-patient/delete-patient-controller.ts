import {
    Body,
    Controller,
    Get,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe,
    Param,
    Delete
  } from '@nestjs/common';

  import { DeletePatientByIdUseCase } from './delete-patient-by-id-use-case';
  import { JwtAuthGuard } from 'src/service/jwt/jwt-auth.guard';
  
  @Controller('/patients')
  export class DeletePatientController {
    constructor( private readonly deletePatientByIdUseCase: DeletePatientByIdUseCase) {}
  
    @Delete('/:id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async handleById(@Param('id') id: string, @Req() req) {
      const user = req.user;
      const result = await this.deletePatientByIdUseCase.execute(id, user);
      return result;
    }

  }
  