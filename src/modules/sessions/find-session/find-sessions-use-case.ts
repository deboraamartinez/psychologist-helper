import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FindSessionUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(user: any) {
    const { userId, role } = user;

    return this.prisma.session.findMany({
      where: { psychologistId: userId },
      include: {
        patient: {
          include: {
            user: true
          }
        }
      }
    });
  }
}
