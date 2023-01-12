import { PrismaCustomerRepository } from '@/src/infra/repositories/prisma/PrismaCustomerRepository';
import { FindCustomerByIdController } from '../FindCustomerByIdController';
import { FindCustomerByIdService } from '@/src/domain/services/customer/FindCustomerByIdService';

export const findCustomerByIdFactory = () => {
  const customerRepository = new PrismaCustomerRepository();
  const findCustomerById = new FindCustomerByIdService(customerRepository);
  const findCustomerByIdController = new FindCustomerByIdController(findCustomerById);
  return findCustomerByIdController;
};
