import { DeleteUserService } from '@/src/domain/services/user/DeleteUserService';
import { PrismaUserRepository } from '@/src/infra/repositories/prisma/PrismaUserRepository';

import { DeleteUserController } from '../DeleteUserController';

export const deleteUserFactory = () => {
  const userRepository = new PrismaUserRepository();
  const deleteUser = new DeleteUserService(userRepository);
  const deleteUserController = new DeleteUserController(deleteUser);
  return deleteUserController;
};
