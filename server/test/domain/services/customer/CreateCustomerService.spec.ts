import { InMemoryCustomerRepository } from '@/test/infra/repositories/inMemoryCustomerRepository';

import { CreateCustomerService } from '@/src/domain/services/customer/CreateCustomerService';

describe('Create an customer', () => {
  it('should create an customer', async () => {
    const inMemoryCustomerRepository = new InMemoryCustomerRepository();
    const createCustomerService = new CreateCustomerService(inMemoryCustomerRepository);

    const data = {
      name: '_anycustumer',
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

    expect(customer).toEqual(
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
  });
});
