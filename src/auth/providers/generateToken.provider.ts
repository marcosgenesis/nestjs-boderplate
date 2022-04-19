import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import { UserService } from 'src/user/service/user.service';
import { JwtService } from '@nestjs/jwt';
import { UserPayload } from '../models/UserPayload';

@Injectable()
export class GenerateToken {
  constructor(
    private readonly jwtService: JwtService,
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  async generateToken(userId: string) {
    const user = await this.prisma.user.findUnique({
      where: {
        id: userId,
      },
    });

    if (!user) {
      throw new HttpException(
        `Erro! Usuário não existe na nossa base de dados.`,
        HttpStatus.BAD_REQUEST,
      );
    }

    const payload: UserPayload = {
      name: user.name,
      email: user.email,
      id: user.id,
    };

    const createdToken = this.jwtService.sign(payload);

    return createdToken;
  }
}
