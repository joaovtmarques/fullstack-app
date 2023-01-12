/* eslint-disable no-unused-vars */
import { CustomerModel } from '@/src/domain/models';
import { CreateCustomerRequest } from '@/src/domain/services/customer/UpdateCustomerService';

export interface CreateCustomerData {
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

export interface CustomerRepository {
  create(data: CreateCustomerData): Promise<CustomerModel>;

  findAll(): Promise<CustomerModel[]>;

  findById(customerId: string): Promise<CustomerModel | null>;

  update(customerId: string, data: CreateCustomerRequest): Promise<CustomerModel>;

  delete(customerId: string): Promise<void>;
}
