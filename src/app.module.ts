import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { envSchema } from './env';
import * as dotenv from 'dotenv';
import { AuthenticationModule } from './modules/auth/auth.module';
import { PrismaService } from './prisma/prisma.service';
import { MulterModule } from '@nestjs/platform-express';

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
  ],
  controllers: [],
  providers: [PrismaService],
})
export class AppModule {}
