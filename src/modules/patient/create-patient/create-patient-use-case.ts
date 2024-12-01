import { BadRequestException, Injectable } from '@nestjs/common';
import { Role, StatusUser } from '@prisma/client';
import { PrismaService } from 'src/prisma/prisma.service';

interface ICreatePatientUseCase {
  email: string;
  status: StatusUser;
  phoneNumber: string;
  role: Role[];
  emergencyPhone?: string;
  emergencyContactName?: string;
  fullName: string;
}

@Injectable()
export class CreatePatientUseCase {
  constructor(private prisma: PrismaService) {}

  async execute(data: ICreatePatientUseCase, user: any) {
    try {
      if (!user.psychologist?.id) {
        throw new BadRequestException(
          'Somente psicólogos podem criar pacientes.',
        );
      }
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

      const createdUser = await this.prisma.user.create({
        data: {
          email: data.email,
          phoneNumber: data.phoneNumber,
          status: data.status,
          role: data.role,
          fullName: data.fullName,
        },
      });
      await this.prisma.patient.create({
        data: {
          emergencyPhone: data.emergencyPhone,
          emergencyContactName: data.emergencyContactName,
          userId: createdUser.id,
          psychologistId: user.psychologist.id,
        },
      });

      return { message: 'Paciente criado com sucesso!' };
    } catch (error) {
      throw error;
    }
  }
}
