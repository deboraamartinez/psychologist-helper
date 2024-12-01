import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FindPatientsUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(user: any) {
    const { userId, role } = user;

    if (!role.includes('PSYCHOLOGIST')){
      throw new NotFoundException(
        'Você não tem permissão para visualizar pacientes.',
      );
    }

    return this.prisma.patient.findMany({
      where: { psychologistId: userId },
      include: {
        user: true,
      },
    });
  }
}
