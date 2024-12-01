import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FindPatientByIdUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(patientId: string, user: any) {
    if (!user.role.includes('PSYCHOLOGIST')) {
      throw new NotFoundException(
        'Você não tem permissão para visualizar este paciente.',
      );
    }

    const patient = await this.prisma.patient.findUnique({
      where: { id: patientId },
      include: {
        user: true,
        sessions: true,
      },
    });

    if (!patient || patient.psychologistId !== user.psychologist.id) {
      throw new NotFoundException(
        'Paciente não encontrado ou não pertence a você.',
      );
    }

    return patient;
  }
}
