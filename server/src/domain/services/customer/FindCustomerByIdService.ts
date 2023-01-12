import { CustomerRepository } from '@/src/infra/repositories';

import { CustomerModel } from '../../models';

export class FindCustomerByIdService {
  // eslint-disable-next-line no-unused-vars
  constructor(private customerRepository: CustomerRepository) {}

  async execute(customerId: string): Promise<CustomerModel | null> {
    return await this.customerRepository.findById(customerId);
  }
}
