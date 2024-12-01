import { Module } from '@nestjs/common';
import { CreatePatientController } from './create-patient/create-patient-controller';
import { CreatePatientUseCase } from './create-patient/create-patient-use-case';
import { FindPatientController } from './find-patient/find-patient-controller';
import { FindPatientsUseCase } from './find-patient/find-patient-use-case';
import { FindPatientByIdUseCase } from './find-patient/find-patient-by-id-use-case';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '@nestjs/config';
import { DeletePatientByIdUseCase } from './delete-patient/delete-patient-by-id-use-case';
import { DeletePatientController } from './delete-patient/delete-patient-controller';

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
  controllers: [CreatePatientController, FindPatientController, DeletePatientController],
  providers: [PrismaService, CreatePatientUseCase, FindPatientsUseCase, FindPatientByIdUseCase, DeletePatientByIdUseCase],
})
export class PatientsModule {}
