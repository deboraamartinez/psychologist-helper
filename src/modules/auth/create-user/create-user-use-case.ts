import { BadRequestException, Injectable } from '@nestjs/common';
import { Role, StatusUser } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';
import { hash } from 'bcryptjs';
//import { NodemailerService } from 'src/service/nodemailer/nodemailer.service';

interface ICreateUserUseCase {
  email: string;
  password: string;
  status: StatusUser;
  phoneNumber: string;
  role: Role[];
  crp?: string;
  emergencyPhone?: string;
  emergencyContactName?: string;
  fullName: string;
}

@Injectable()
export class CreateUserUseCase {
  constructor(private prisma: PrismaService) {}

  async execute(data: ICreateUserUseCase) {
    try {
      const foundedUser = await this.prisma.user.findFirst({
        where: { email: data.email },
      });
      if (foundedUser) {
        throw new BadRequestException('Este e-mail já está em uso');
      }
  
      const foundedUserByPhone = await this.prisma.user.findFirst({
        where: { phoneNumber: data.phoneNumber },
      });
      if (foundedUserByPhone) {
        throw new BadRequestException('Este número de telefone já está em uso');
      }

      if (!data.crp) {
        throw new BadRequestException('Psicólogo deve ter CRP');
      }
  
      const passwordHash = await hash(data.password, 10);
  
      const user = await this.prisma.user.create({
        data: {
          email: data.email,
          password: passwordHash,
          phoneNumber: data.phoneNumber,
          status: data.status,
          role: data.role,
          fullName: data.fullName,
        },
      });
  
      await this.prisma.psychologist.create({
        data: {
          crp: data.crp,
          userId: user.id,
        },
      });
  
      return { message: 'Usuário criado com sucesso!' };
    } catch (error) {
      throw error;
    }
  }
  
}
