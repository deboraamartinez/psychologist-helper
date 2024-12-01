import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NodemailerService } from 'src/service/nodemailer/nodemailer.service';

@Injectable()
export class DeleteSessionUseCase {
  constructor(
    private prisma: PrismaService,
    private nodemailer: NodemailerService,
  ) {}

  async execute(id: string, user: any) {
    try {
      const session = await this.prisma.session.findUnique({
        where: { id: id },
        include: {
          patient: {
            include: {
              user: true,
            },
          },
        },
      });

      if (!session) {
        throw new BadRequestException('Sessão não encontrada.');
      }

      await this.prisma.session.delete({
        where: { id: id },
      });

      await this.nodemailer.sendEmail({
        to: session.patient.user.email,
        subject: `Sessão com psicólogo ${user.fullName} foi cancelada`,
        content: `Olá ${session.patient.user.fullName}, a sessão agendada para ${session.date} foi cancelada pelo psicólogo ${user.fullName}.`,
      });

      return { message: 'Sessão excluída com sucesso.' };
    } catch (error) {
      throw error;
    }
  }
}
