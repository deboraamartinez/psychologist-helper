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
      // Validate if the user is a psychologist
      if (!user.psychologist?.id) {
        throw new BadRequestException('Somente psicólogos podem criar pacientes.');
      }

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

      await this.prisma.$transaction(async (tx) => {
        // Create the user entry
        const createdUser = await tx.user.create({
          data: {
            email: data.email,
            phoneNumber: data.phoneNumber,
            status: data.status,
            role: data.role,
            fullName: data.fullName,
          },
        });

        // Create the patient entry and associate it with the psychologist
        await tx.patient.create({
          data: {
            emergencyPhone: data.emergencyPhone,
            emergencyContactName: data.emergencyContactName,
            userId: createdUser.id,
            psychologistId: user.psychologist.id, // Link to the psychologist
          },
        });
      });

      return { message: 'Paciente criado com sucesso!' };
    } catch (error) {
      throw error;
    }
  }
}
