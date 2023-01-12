import { CreateUserService } from '@/src/domain/services/user/CreateUserService';
import { PrismaUserRepository } from '@/src/infra/repositories/prisma/PrismaUserRepository';

import { CreateUserController } from '../CreateUserController';

export const createUserFactory = () => {
  const userRepository = new PrismaUserRepository();
  const createUser = new CreateUserService(userRepository);
  const createUserController = new CreateUserController(createUser);
  return createUserController;
};
