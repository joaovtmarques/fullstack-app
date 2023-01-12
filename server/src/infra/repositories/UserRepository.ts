/* eslint-disable no-unused-vars */
import { UserModel } from '@/src/domain/models';

export interface CreateUserData {
  username: string;
  password: string;
}

export interface UserRepository {
  create(data: CreateUserData): Promise<UserModel>;

  findByEmail(username: string): Promise<UserModel | null>;

  findById(id: string): Promise<UserModel | null>;

  delete(id: string): Promise<void>;
}
