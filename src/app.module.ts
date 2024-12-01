import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import * as dotenv from 'dotenv';
import { AuthenticationModule } from './modules/auth/auth.module';
import { SessionModule } from './modules/sessions/session.module';
import { PrismaService } from './prisma/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { PatientsModule } from './modules/patient/patient.module';
import { PsychologistModule } from './modules/psychologist/psychologist.module';

dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      validate: (env) => envSchema.parse(env),
      isGlobal: true,
    }),
    MulterModule.register({
      dest: process.env.PATH_UPLOADS,
    }),
    AuthenticationModule,
    SessionModule,
    PatientsModule,
    PsychologistModule,
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
