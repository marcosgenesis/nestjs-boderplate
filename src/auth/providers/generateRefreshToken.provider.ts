import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma';
import * as dayjs from 'dayjs';
import { UserService } from 'src/user/service/user.service';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class GenerateRefreshToken {
  constructor(
    private readonly jwtService: JwtService,
    private userService: UserService,
    private prisma: PrismaService,
  ) {}

  async generateRefreshToken(userId: string) {
    const expiresIn = dayjs().add(5, 'day').unix();
    const createdRefreshToken = await this.prisma.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    });

    return createdRefreshToken;
  }
}
