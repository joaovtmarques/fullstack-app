import { FindUserByIdService } from './../../../../domain/services/user/FindUserByIdService';
import { PrismaUserRepository } from '@/src/infra/repositories/prisma/PrismaUserRepository';

import { FindUserByIdController } from '../FindUserByIdController';

export const findUserByIdFactory = () => {
  const userRepository = new PrismaUserRepository();
  const findUserByIdService = new FindUserByIdService(userRepository);
  const findUserByIdController = new FindUserByIdController(findUserByIdService);
  return findUserByIdController;
};
