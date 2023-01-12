import { PrismaCustomerRepository } from '@/src/infra/repositories/prisma/PrismaCustomerRepository';
import { CreateCustomerService } from '@/src/domain/services/customer/CreateCustomerService';

import { CreateCustomerController } from '../CreateCustomerController';

export const createCustomerFactory = () => {
  const customerRepository = new PrismaCustomerRepository();
  const createCustomer = new CreateCustomerService(customerRepository);
  const createCustomerController = new CreateCustomerController(createCustomer);
  return createCustomerController;
};
