import { BaseError } from '@/src/shared/classes/baseError';
import { HttpStatusCode } from '@/src/shared/types/httpStatusCode';
import { InMemoryCustomerRepository } from '@/test/infra/repositories/inMemoryCustomerRepository';

import { CreateCustomerService } from '@/src/domain/services/customer/CreateCustomerService';
import { UpdateCustomerService } from '@/src/domain/services/customer/UpdateCustomerService';

describe('Update an customer', () => {
  it('should update an customer', async () => {
    const inMemoryCustomerRepository = new InMemoryCustomerRepository();
    const updateCustomerService = new UpdateCustomerService(inMemoryCustomerRepository);
    const createCustomerService = new CreateCustomerService(inMemoryCustomerRepository);

    const data = {
      name: '_anycustomer',
      email: '_any@email.com',
      phoneNumber: '00000000000',
      cpf: '000.000.000-00',
      street: '_anystreet, 000',
      district: '_anydistrict',
      zipcode: '00000000',
      city: '_anycity',
      state: '_anystate',
    };

    const customer = await createCustomerService.execute(data);

    const updatedCustomer = await updateCustomerService.execute(customer.id, {
      name: '_anyupdatedname',
      email: customer.email,
      phoneNumber: '11111111111',
      cpf: customer.cpf,
      address: {
        street: '_anyupdatedstreet',
        district: customer.address!.district,
        zipcode: customer.address!.zipcode,
        city: customer.address!.city,
        state: customer.address!.state,
      },
    });

    expect(updatedCustomer).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        name: expect.any(String),
        email: expect.any(String),
        phoneNumber: expect.any(String),
        cpf: expect.any(String),
        address: expect.objectContaining({
          id: expect.any(String),
          street: expect.any(String),
          district: expect.any(String),
          zipcode: expect.any(String),
          city: expect.any(String),
          state: expect.any(String),
          customerId: expect.any(String),
        }),
      })
    );

    expect(updatedCustomer).toEqual(
      expect.objectContaining({
        id: expect.stringContaining(customer.id),
        name: expect.stringContaining('_anyupdatedname'),
        email: expect.stringContaining(customer.email),
        phoneNumber: expect.stringContaining('11111111111'),
        cpf: expect.stringContaining(customer.cpf),
        address: expect.objectContaining({
          id: expect.stringContaining(customer.address!.id),
          street: expect.stringContaining('_anyupdatedstreet'),
          district: expect.stringContaining(customer.address!.district),
          zipcode: expect.stringContaining(customer.address!.zipcode),
          city: expect.stringContaining(customer.address!.city),
          state: expect.stringContaining(customer.address!.state),
          customerId: expect.stringContaining(customer.address!.customerId),
        }),
      })
    );
  });

  it('should return error when customer is not found', async () => {
    const inMemoryCustomerRepository = new InMemoryCustomerRepository();
    const updateCustomerService = new UpdateCustomerService(inMemoryCustomerRepository);

    const action = async () => {
      await updateCustomerService.execute('_anycustomerid', {
        name: '_anycustomer',
        email: '_any@email.com',
        phoneNumber: '00000000000',
        cpf: '000.000.000-00',
        address: {
          street: '_anystreet, 000',
          district: '_anydistrict',
          zipcode: '00000000',
          city: '_anycity',
          state: '_anystate',
        },
      });
    };

    expect(action).rejects.toThrow(
      new BaseError('Customer not found', 'updateCustomer', HttpStatusCode.NOT_FOUND)
    );
  });
});
