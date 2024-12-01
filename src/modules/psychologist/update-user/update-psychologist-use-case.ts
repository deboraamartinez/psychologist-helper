import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class UpdatePsychologistUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(user: any, data: any) {
    const { userId } = user;

    const psychologist = await this.prisma.psychologist.findFirst({
      where: { id: userId },
      include: {
        user: true,
      },
    });

    if (!psychologist) {
      throw new NotFoundException('Psicólogo não encontrado.');
    }

    return this.prisma.psychologist.update({
      where: { id: userId },
      data: {
        crp: data.crp || psychologist.crp,
        user: {
          update: {
            fullName: data.fullName || psychologist.user.fullName,
            phoneNumber: data.phoneNumber || psychologist.user.phoneNumber,
            email: data.email || psychologist.user.email,
          },
        },
      },
      include: {
        user: true,
      },
    });
  }
}
