import { PrismaCustomerRepository } from '@/src/infra/repositories/prisma/PrismaCustomerRepository';
import { FindAllCustomersService } from '@/src/domain/services/customer/FindAllCustomersService';
import { FindAllCustomersController } from './../FindAllCustomersController';

export const findAllCustomersFactory = () => {
  const customerRepository = new PrismaCustomerRepository();
  const findAllCustomers = new FindAllCustomersService(customerRepository);
  const findAllCustomersController = new FindAllCustomersController(findAllCustomers);
  return findAllCustomersController;
};
