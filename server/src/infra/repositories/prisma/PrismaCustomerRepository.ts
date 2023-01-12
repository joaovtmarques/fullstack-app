import { CustomerModel } from '@/src/domain/models';
import { CreateCustomerRequest } from '@/src/domain/services/customer/UpdateCustomerService';
import prismaClient from '@/src/prisma';

import { CreateCustomerData, CustomerRepository } from './../CustomerRepository';

export class PrismaCustomerRepository implements CustomerRepository {
  async create(data: CreateCustomerData): Promise<CustomerModel> {
    return await prismaClient.customer.create({
      data: {
        name: data.name,
        email: data.email,
        phoneNumber: data.phoneNumber,
        cpf: data.cpf,
        address: {
          create: {
            street: data.street,
            district: data.district,
            zipcode: data.zipcode,
            city: data.city,
            state: data.state,
          },
        },
      },
      include: { address: true },
    });
  }

  async findAll(): Promise<CustomerModel[]> {
    return await prismaClient.customer.findMany({
      include: {
        address: true,
      },
    });
  }

  async findById(customerId: string): Promise<CustomerModel | null> {
    return await prismaClient.customer.findFirst({
      where: {
        id: customerId,
      },
      include: { address: true },
    });
  }

  async update(customerId: string, data: CreateCustomerRequest): Promise<CustomerModel> {
    return await prismaClient.customer.update({
      where: {
        id: customerId,
      },
      data: {
        name: data.name,
        email: data.email,
        cpf: data.cpf,
        phoneNumber: data.phoneNumber,
        address: {
          update: {
            street: data.address?.street,
            district: data.address?.district,
            zipcode: data.address?.zipcode,
            city: data.address?.city,
            state: data.address?.state,
          },
        },
      },
      include: { address: true },
    });
  }

  async delete(customerId: string): Promise<void> {
    await prismaClient.customer.delete({
      where: {
        id: customerId,
      },
    });
  }
}
