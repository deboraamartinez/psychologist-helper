import { Module } from '@nestjs/common';
import { CreateSessionController } from './create-session/create-session-controller';
import { CreateSessionUseCase } from './create-session/create-session-use-case';
import { FindSessionController } from './find-session/find-sessions-controller';
import { FindSessionUseCase } from './find-session/find-sessions-use-case';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
//import { NodemailerService } from 'src/service/nodemailer/nodemailer.service';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET_KEY'),
          signOptions: {
            expiresIn: '7d',
          },
        };
      },
    }),
  ],
  controllers: [
    CreateSessionController,
    FindSessionController,
  ],
  providers: [
    PrismaService,
    CreateSessionUseCase,
    FindSessionUseCase,
  ],
})
export class SessionModule {}
