import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import CreateUserDTO from '../dtos/createUser.dto';
import { User } from '../entities/user.entity';
import { PrismaService } from '../../prisma/prisma.service';

import * as bcrypt from 'bcrypt';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}
  async create(createUserDto) {
    const { email } = createUserDto;
    console.log(createUserDto.user);

    const data = createUserDto;

    const hashSalt = Number(process.env.HASH_SALT);
    const newData = {
      ...createUserDto,
      password: await bcrypt.hash(createUserDto.password, hashSalt),
    };
    console.log(newData);

    const createdUser = await this.prisma.user.create({
      data: {
        ...newData,
      },
    });
    return createdUser;
  }

  findAll() {
    return this.prisma.user.findMany();
  }

  findById(id: string) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  findByEmail(email: string) {
    const user = this.prisma.user.findUnique({
      where: {
        email,
      },
    });

    return user;
  }

  // update(id: number, updateUserDto: UpdateUserDto) {
  //   return `This action updates a #${id} user`;
  // }

  // remove(id: number) {
  //   return `This action removes a #${id} user`;
  // }
}
