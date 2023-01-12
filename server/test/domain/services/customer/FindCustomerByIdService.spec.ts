import { InMemoryCustomerRepository } from '@/test/infra/repositories/inMemoryCustomerRepository';

import { CreateCustomerService } from '@/src/domain/services/customer/CreateCustomerService';
import { FindCustomerByIdService } from '@/src/domain/services/customer/FindCustomerByIdService';

describe('Find customer by id', () => {
  it('should find an customer by id', async () => {
    const inMemoryCustomerRepository = new InMemoryCustomerRepository();
    const createCustomerService = new CreateCustomerService(inMemoryCustomerRepository);
    const findCustomerByIdService = new FindCustomerByIdService(inMemoryCustomerRepository);

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

    const customerFound = await findCustomerByIdService.execute(customer.id);

    expect(customerFound).toEqual(
      expect.objectContaining({
        id: expect.stringContaining(customer.id),
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
