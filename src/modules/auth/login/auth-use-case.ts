import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcryptjs';
import { PrismaService } from 'src/prisma/prisma.service';

interface IAuth {
  email: string;
  password: string;
}

@Injectable()
export class AuthUseCase {
  constructor(
    private prisma: PrismaService,
    private readonly jwtService: JwtService,
  ) {}

  async execute({ email, password }: IAuth) {
    try {
      email.toLowerCase();

      const user = await this.prisma.user.findUnique({
        where: {
          email,
        },
      });

      if (!user) {
        throw new BadRequestException('E-mail ou senha inválidos');
      }

      const passwordMatch = await compare(password, user?.password || '');
      if (!passwordMatch) {
        throw new BadRequestException('E-mail ou senha inválidos');
      }

      const { password: _, ...userResult } = user;

      return {
        accessToken: this.jwtService.sign({
          identifier: email,
          sub: user.id,
        }),
        user: userResult,
      };
    } catch (error) {
      throw error;
    }
  }
}
