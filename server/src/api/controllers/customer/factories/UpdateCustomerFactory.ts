import { PrismaCustomerRepository } from '@/src/infra/repositories/prisma/PrismaCustomerRepository';
import { UpdateCustomerController } from '../UpdateCustomerController';
import { UpdateCustomerService } from '@/src/domain/services/customer/UpdateCustomerService';

export const updateCustomerFactory = () => {
  const customerRepository = new PrismaCustomerRepository();
  const updateCustomer = new UpdateCustomerService(customerRepository);
  const updateCustomerController = new UpdateCustomerController(updateCustomer);
  return updateCustomerController;
};
