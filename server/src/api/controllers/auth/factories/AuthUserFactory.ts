import { AuthUserService } from '@/src/domain/services/auth/AuthUserService';
import { PrismaUserRepository } from '@/src/infra/repositories/prisma/PrismaUserRepository';
import { AuthUserController } from '../AuthUserController';

export const authUserFactory = () => {
  const userRepository = new PrismaUserRepository();
  const authUser = new AuthUserService(userRepository);
  const authUserController = new AuthUserController(authUser);
  return authUserController;
};
