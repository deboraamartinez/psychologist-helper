import { Module } from '@nestjs/common';
import { FindPsychologistUseCase } from './find-psychologist/find-psychologist-use-case';
import { FindPsychologistController } from './find-psychologist/find-psychologist-controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';

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
  controllers: [FindPsychologistController],
  providers: [PrismaService, FindPsychologistUseCase],
})
export class PsychologistModule {}