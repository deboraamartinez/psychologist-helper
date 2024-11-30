import { IsEmail, IsString, Length } from 'class-validator';

export class LoginUserEntity {
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsString({ message: 'Senha é obrigatória' })
  @Length(6, 20, { message: 'Senha deve ter entre 6 e 20 caracteres' })
  password: string;
}
