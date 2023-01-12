import { CustomerRepository } from '@/src/infra/repositories';
import { BaseError } from '@/src/shared/classes/baseError';
import { HttpStatusCode } from '@/src/shared/types/httpStatusCode';

export class DeleteCustomerService {
  // eslint-disable-next-line no-unused-vars
  constructor(private customerRepository: CustomerRepository) {}

  async execute(customerId: string): Promise<void> {
    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new BaseError('Customer not found', 'deleteCustomer', HttpStatusCode.NOT_FOUND);
    }
    await this.customerRepository.delete(customer.id);
  }
}
