import { InMemoryCustomerRepository } from '@/test/infra/repositories/inMemoryCustomerRepository';

import { CreateCustomerService } from '@/src/domain/services/customer/CreateCustomerService';
import { FindAllCustomersService } from '@/src/domain/services/customer/FindAllCustomersService';

describe('Find all customers', () => {
  it('should return all customers', async () => {
    const inMemoryCustomerRepository = new InMemoryCustomerRepository();
    const findAllCustomersService = new FindAllCustomersService(inMemoryCustomerRepository);
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

    await createCustomerService.execute(data);

    const customers = await findAllCustomersService.execute();

    expect(customers).toEqual(
      expect.arrayContaining([
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
        }),
      ])
    );
  });
});
