import { CustomerRepository } from '@/src/infra/repositories';
import { BaseError } from '@/src/shared/classes/baseError';
import { HttpStatusCode } from '@/src/shared/types/httpStatusCode';

import { CustomerModel } from '../../models';

export interface CreateCustomerRequest {
  name: string;
  email: string;
  phoneNumber: string;
  cpf: string;
  address: {
    street: string;
    district: string;
    zipcode: string;
    city: string;
    state: string;
  };
}

export class UpdateCustomerService {
  // eslint-disable-next-line no-unused-vars
  constructor(private customerRepository: CustomerRepository) {}

  async execute(customerId: string, data: CreateCustomerRequest): Promise<CustomerModel> {
    const customer = await this.customerRepository.findById(customerId);

    if (!customer) {
      throw new BaseError('Customer not found', 'updateCustomer', HttpStatusCode.NOT_FOUND);
    }

    return await this.customerRepository.update(customerId, data);
  }
}
