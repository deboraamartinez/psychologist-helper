import {
    IsDateString,
    IsEnum,
    IsOptional,
    IsString, 
  } from 'class-validator';
  import { SessionStatus } from '@prisma/client';
  
  export class CreateSessionEntity {
    @IsDateString({}, { message: 'A data da sessão deve estar em um formato ISO válido (YYYY-MM-DDTHH:mm:ss.sssZ).' })
    date: string;
  
    @IsString({ message: 'O ID do paciente é obrigatório.' })
    patientId: string;
  
    @IsOptional()
    @IsEnum(SessionStatus, { message: 'O status da sessão deve ser válido (SCHEDULED, COMPLETED ou CANCELLED).' })
    status?: SessionStatus = SessionStatus.SCHEDULED;
 
  }
  