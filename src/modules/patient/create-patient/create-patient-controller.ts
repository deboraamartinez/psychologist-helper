import {
    Body,
    Controller,
    Post,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe,
  } from '@nestjs/common';
  import { CreatePatientEntity } from 'src/entities/create-patient.entity';
  import { CreatePatientUseCase } from './create-patient-use-case';
  import { JwtAuthGuard } from 'src/service/jwt/jwt-auth.guard';
  
  @Controller('/patient')
  export class CreatePatientController {
    constructor(private readonly createPatientUseCase: CreatePatientUseCase) {}
  
    @Post('')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async handle(@Body() body: CreatePatientEntity, @Req() req) {
      const user = req.user;
      const result = await this.createPatientUseCase.execute(body, user);
      return result;
    }
  }
  