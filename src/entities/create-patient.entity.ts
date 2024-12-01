import { IsEmail, IsEnum, IsOptional, IsString, Length, Matches, IsArray, ArrayMinSize } from 'class-validator';
import { Role, StatusUser } from '@prisma/client';

export class CreatePatientEntity {
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsEnum(StatusUser, { message: 'Status inválido' })
  status: StatusUser;

  @IsString({ message: 'Número de telefone é obrigatório' })
  @Matches(/^\+\d{1,3}\d{1,4}\d{4,10}$/, { 
    message: 'Telefone deve estar no formato internacional +XX[DDD][Número]' 
  })
  phoneNumber: string;

  @IsArray({ message: 'Role deve ser uma lista' })
  @ArrayMinSize(1, { message: 'Pelo menos uma role deve ser fornecida' })
  @IsEnum(Role, { each: true, message: 'Role inválida' })
  role: Role[];

  @IsString({ message: 'Telefone de emergência é obrigatório para pacientes' })
  emergencyPhone?: string;

  @IsString({ message: 'Nome do contato de emergência é obrigatório para pacientes' })
  emergencyContactName?: string;

  @IsString({ message: 'Nome completo é obrigatório' })
  @Length(3, 50, { message: 'Nome completo deve ter entre 3 e 50 caracteres' })
  fullName: string;
}
