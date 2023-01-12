import { CustomerModel } from '@/src/domain/models';
import { CreateCustomerRequest } from '@/src/domain/services/customer/UpdateCustomerService';
import { CustomerRepository } from '@/src/infra/repositories';
import { CreateCustomerData } from '@/src/infra/repositories/CustomerRepository';
import crypto from 'node:crypto';

export class InMemoryCustomerRepository implements CustomerRepository {
  public items: CustomerModel[] = [];

  async create(data: CreateCustomerData): Promise<CustomerModel> {
    const customerId = crypto.randomUUID();

    const customer: CustomerModel = {
      id: customerId,
      name: data.name,
      email: data.email,
      phoneNumber: data.phoneNumber,
      cpf: data.cpf,
      address: {
        id: crypto.randomUUID(),
        street: data.street,
        district: data.district,
        zipcode: data.zipcode,
        city: data.city,
        state: data.state,
        customerId,
      },
    };

    this.items.push(customer);

    return customer;
  }

  async findAll(): Promise<CustomerModel[]> {
    return this.items;
  }

  async findById(customerId: string): Promise<CustomerModel | null> {
    let customer = null;

    this.items.forEach((item) => {
      if (item.id === customerId) {
        customer = item;
      }
    });

    return customer;
  }

  async update(customerId: string, data: CreateCustomerRequest): Promise<CustomerModel> {
    const customer = this.items.find((o, i) => {
      if (o.id === customerId) {
        this.items[i].name = data.name;
        this.items[i].email = data.email;
        this.items[i].phoneNumber = data.phoneNumber;
        this.items[i].cpf = data.cpf;
        this.items[i].address!.street = data.address?.street;
        this.items[i].address!.district = data.address?.district;
        this.items[i].address!.zipcode = data.address?.zipcode;
        this.items[i].address!.city = data.address?.city;
        this.items[i].address!.state = data.address?.state;

        return true;
      }
    });

    return customer!;
  }

  async delete(customerId: string): Promise<void> {
    this.items.forEach((item, index) => {
      if (item.id === customerId) {
        this.items.splice(index, 1);
      }
    });
  }
}
