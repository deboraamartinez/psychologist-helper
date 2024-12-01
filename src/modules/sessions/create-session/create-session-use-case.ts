import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSessionEntity } from 'src/entities/create-session.entity';

@Injectable()
export class CreateSessionUseCase {
  constructor(private prisma: PrismaService) {}

  async execute(data: CreateSessionEntity, user: any) {
    try {
      const patient = await this.prisma.patient.findUnique({
        where: { id: data.patientId },
      });

      if (!patient) {
        throw new BadRequestException('Paciente não encontrado.');
      }

      const session = await this.prisma.session.create({
        data: {
          date: new Date(data.date),
          patientId: data.patientId,
          psychologistId: user.psychologist.id,
          status: data.status || 'SCHEDULED',
        },
      });

      return session;
    } catch (error) {
      throw error;
    }
  }
}
