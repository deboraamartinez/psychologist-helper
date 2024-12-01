import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FindPsychologistUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(user: any) {
    const { userId } = user;

    return this.prisma.psychologist.findFirst({
      where: { id: userId },
      include: {
        user: true,
      },
    });
  }
}
