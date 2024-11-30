import { IsEmail, IsEnum, IsOptional, IsString, Length, Matches, IsArray, ArrayMinSize } from 'class-validator';
import { Role, StatusUser } from '@prisma/client';

export class CreateUserEntity {
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsString({ message: 'Senha é obrigatória' })
  @Length(6, 20, { message: 'Senha deve ter entre 6 e 20 caracteres' })
  password: string;

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

  @IsOptional()
  @IsString({ message: 'CRP deve ser uma string' })
  @Matches(/^\d{4,6}$/, { message: 'CRP deve ser um número com 4 a 6 dígitos' })
  crp?: string;

  @IsOptional()
  @IsString({ message: 'Telefone de emergência é obrigatório para pacientes' })
  emergencyPhone?: string;

  @IsOptional()
  @IsString({ message: 'Nome do contato de emergência é obrigatório para pacientes' })
  emergencyContactName?: string;

  @IsString({ message: 'Nome completo é obrigatório' })
  @Length(3, 50, { message: 'Nome completo deve ter entre 3 e 50 caracteres' })
  fullName: string;
}
