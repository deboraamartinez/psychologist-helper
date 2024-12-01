import {
    Body,
    Controller,
    Get,
    Req,
    UseGuards,
    UsePipes,
    ValidationPipe,
    Param
  } from '@nestjs/common';

  import { FindPatientsUseCase } from './find-patient-use-case';
  import { FindPatientByIdUseCase } from './find-patient-by-id-use-case';
  import { JwtAuthGuard } from 'src/service/jwt/jwt-auth.guard';
  
  @Controller('/patients')
  export class FindPatientController {
    constructor(private readonly findPatientUseCase: FindPatientsUseCase, private readonly findPatientByIdUseCase: FindPatientByIdUseCase) {}
  
    @Get('/:id')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async handleById(@Param('id') id: string, @Req() req) {
      const user = req.user;
      const result = await this.findPatientByIdUseCase.execute(id, user);
      return result;
    }
    
    @Get('')
    @UseGuards(JwtAuthGuard)
    @UsePipes(new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }))
    async handle(@Req() req) {
      const user = req.user;
      const result = await this.findPatientUseCase.execute(user);
      return result;
    }
  }
  