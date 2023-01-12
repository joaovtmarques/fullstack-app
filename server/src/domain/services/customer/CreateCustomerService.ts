import { CustomerRepository } from '@/src/infra/repositories';

interface CreateCustomerRequest {
  name: string;
  email: string;
  phoneNumber: string;
  cpf: string;
  street: string;
  district: string;
  zipcode: string;
  city: string;
  state: string;
}

export class CreateCustomerService {
  // eslint-disable-next-line no-unused-vars
  constructor(private customerRepository: CustomerRepository) {}

  async execute(data: CreateCustomerRequest) {
    const customer = await this.customerRepository.create(data);

    return customer;
  }
}
