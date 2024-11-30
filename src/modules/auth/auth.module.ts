import { Module } from '@nestjs/common';
import { CreateUserController } from './create-user/create-user-controller';
import { CreateUserUseCase } from './create-user/create-user-use-case';
import { PrismaService } from 'src/prisma/prisma.service';
import { AuthController } from './login/auth-controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthUseCase } from './login/auth-use-case';
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
            expiresIn: configService.get<string>('JWT_EXPIRES_IN'),
          },
        };
      },
    }),
  ],
  controllers: [
    CreateUserController,
    AuthController
  ],
  providers: [
    PrismaService,
    CreateUserUseCase,
    AuthUseCase,
  ],
})
export class AuthenticationModule {}