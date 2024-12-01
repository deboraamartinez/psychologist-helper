import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import * as dotenv from 'dotenv';
import { AuthenticationModule } from './modules/auth/auth.module';
import { SessionModule } from './modules/sessions/session.module';
import { PrismaService } from './prisma/prisma.service';
import { MulterModule } from '@nestjs/platform-express';
import { PatientsModule } from './modules/patient/patient.module';

dotenv.config();

console.log('Aplicação iniciando com as seguintes configurações:');
console.log('JWT_SECRET_KEY:', process.env.JWT_SECRET_KEY);
console.log('PATH_UPLOADS:', process.env.PATH_UPLOADS);

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
    PatientsModule
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
