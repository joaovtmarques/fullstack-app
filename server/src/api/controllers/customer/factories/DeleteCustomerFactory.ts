import { PrismaCustomerRepository } from '@/src/infra/repositories/prisma/PrismaCustomerRepository';
import { DeleteCustomerService } from '@/src/domain/services/customer/DeleteCustomerService';

import { DeleteCustomerController } from '../DeleteCustomerController';

export const deleteCustomerFactory = () => {
  const customerRepository = new PrismaCustomerRepository();
  const deleteCustomer = new DeleteCustomerService(customerRepository);
  const deleteCustomerController = new DeleteCustomerController(deleteCustomer);
  return deleteCustomerController;
};
