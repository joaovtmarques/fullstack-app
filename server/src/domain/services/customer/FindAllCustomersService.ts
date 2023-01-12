import { CustomerRepository } from '@/src/infra/repositories';
import { CustomerModel } from '../../models';

export class FindAllCustomersService {
  // eslint-disable-next-line no-unused-vars
  constructor(private customerRepository: CustomerRepository) {}

  async execute(): Promise<CustomerModel[]> {
    return this.customerRepository.findAll();
  }
}
