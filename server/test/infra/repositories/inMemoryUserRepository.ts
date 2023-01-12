import { UserModel } from '@/src/domain/models';
import { BaseError } from '@/src/shared/classes/baseError';
import { HttpStatusCode } from '@/src/shared/types/httpStatusCode';
import { hash } from 'bcrypt';
import crypto from 'node:crypto';

import { UserRepository } from '../../../src/infra/repositories';
import { CreateUserData } from '../../../src/infra/repositories/UserRepository';

export class InMemoryUserRepository implements UserRepository {
  public items: UserModel[] = [];

  async create(data: CreateUserData): Promise<UserModel> {
    const hashedPassword = await hash(data.password, 8);

    const user = {
      id: crypto.randomUUID(),
      username: data.username,
      password: hashedPassword,
      createdAt: new Date(),
    };

    this.items.push(user);

    return user;
  }

  async findByEmail(username: string): Promise<UserModel> {
    let user = null;

    this.items.forEach((item) => {
      if (item.username === username) {
        user = item;
      }
    });

    if (user !== null) {
      return user;
    } else {
      throw new BaseError('User not found', 'authenticateUser', HttpStatusCode.NOT_FOUND);
    }
  }

  async findById(id: string): Promise<UserModel | null> {
    let user = null;

    this.items.forEach((item) => {
      if (item.id === id) {
        user = item;
      }
    });

    return user;
  }

  async delete(id: string): Promise<void> {
    this.items.forEach((item, index) => {
      if (item.id === id) {
        this.items.splice(index, 1);
      }
    });
  }
}
