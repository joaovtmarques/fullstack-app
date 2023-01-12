import { RefreshTokenUserService } from '../../../../domain/services/auth/RefreshTokenUserSevice';
import { RefreshTokenUserController } from '../RefreshTokenUserController';
import { PrismaUserRepository } from '@/src/infra/repositories/prisma/PrismaUserRepository';

export const refreshTokenUserFactory = () => {
  const userRepository = new PrismaUserRepository();
  const refreshTokenUser = new RefreshTokenUserService(userRepository);
  const refreshTokenUserController = new RefreshTokenUserController(refreshTokenUser);
  return refreshTokenUserController;
};
