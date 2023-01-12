import { UserModel } from '@/src/domain/models';
import prismaClient from '@/src/prisma';

import { CreateUserData, UserRepository } from '../UserRepository';

export class PrismaUserRepository implements UserRepository {
  async create(data: CreateUserData): Promise<UserModel> {
    return await prismaClient.user.create({
      data,
    });
  }

  async findByEmail(username: string): Promise<UserModel | null> {
    return await prismaClient.user.findFirst({
      where: {
        username,
      },
    });
  }

  async findById(id: string): Promise<UserModel | null> {
    return await prismaClient.user.findFirst({
      where: {
        id,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await prismaClient.user.delete({
      where: {
        id,
      },
    });
  }
}
