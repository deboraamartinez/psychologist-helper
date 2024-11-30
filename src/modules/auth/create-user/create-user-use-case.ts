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
  
      const [foundedUser, foundedUserByPhone] = await this.prisma.$transaction([
        this.prisma.user.findFirst({
          where: { email: data.email },
        }),
        this.prisma.user.findFirst({
          where: { phoneNumber: data.phoneNumber },
        }),
      ]);

      if (foundedUser) {
        throw new BadRequestException('Este e-mail já está em uso');
      }

      if (foundedUserByPhone) {
        throw new BadRequestException('Este número de telefone já está em uso');
      }

      const passwordHash = await hash(data.password, 10);

      await this.prisma.$transaction(async (tx) => {
        const user = await tx.user.create({
          data: {
            email: data.email,
            password: passwordHash,
            phoneNumber: data.phoneNumber,
            status: data.status,
            role: data.role,
            fullName: data.fullName,
          },
        });

        if (data.role.includes('PATIENT')) {
          if (!data.emergencyPhone || !data.emergencyContactName) {
            throw new BadRequestException(
              'Paciente deve ter telefone e contato de emergência',
            );
          }
          await tx.patient.create({
            data: {
              emergencyPhone: data.emergencyPhone,
              emergencyContactName: data.emergencyContactName,
              userId: user.id,
            },
          });
        } else if (data.role.includes('PSYCHOLOGIST')) {
          if (!data.crp) {
            throw new BadRequestException('Psicólogo deve ter CRP');
          }

          await tx.psychologist.create({
            data: {
              crp: data.crp,
              userId: user.id,
            },
          });
        }
      });

      return { message: 'Usuário criado com sucesso!' };
    } catch (error) {
      throw error;
    }
  }
}
