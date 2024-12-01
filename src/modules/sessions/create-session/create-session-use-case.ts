import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSessionEntity } from 'src/entities/create-session.entity';
import { NodemailerService } from 'src/service/nodemailer/nodemailer.service';
import CreateSession from 'src/resources/templates-email/create-session';

@Injectable()
export class CreateSessionUseCase {
  constructor(
    private prisma: PrismaService,
    private nodemailer: NodemailerService,
  ) {}

  async execute(data: CreateSessionEntity, user: any) {
    try {
      const patient = await this.prisma.patient.findUnique({
        where: { id: data.patientId },
        include: {
          user: true,
        },
      });

      if (!patient) {
        throw new BadRequestException('Paciente não encontrado.');
      }

      const existingSession = await this.prisma.session.findFirst({
        where: {
          psychologistId: user.psychologist.id,
          date: new Date(data.date),
        },
      });

      if (existingSession) {
        throw new BadRequestException(
          'Já existe uma sessão agendada com este psicólogo no mesmo dia e horário.',
        );
      }

      const session = await this.prisma.session.create({
        data: {
          date: new Date(data.date),
          patientId: data.patientId,
          psychologistId: user.psychologist.id,
          status: data.status || 'SCHEDULED',
        },
      });

      await this.nodemailer.sendEmail({
        to: patient.user.email,
        subject: `Sessão criada com psicólogo ${user.fullName}`,
        content: CreateSession(
          user.fullName,
          patient.user.fullName,
          data.date,
          user.phoneNumber,
        ),
      });

      return session;
    } catch (error) {
      throw error;
    }
  }
}
