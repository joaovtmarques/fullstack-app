import { BaseError } from '@/src/shared/classes/baseError';
import { HttpStatusCode } from '@/src/shared/types/httpStatusCode';
import { InMemoryCustomerRepository } from '@/test/infra/repositories/inMemoryCustomerRepository';

import { CreateCustomerService } from '@/src/domain/services/customer/CreateCustomerService';
import { DeleteCustomerService } from '@/src/domain/services/customer/DeleteCustomerService';
import { FindCustomerByIdService } from '@/src/domain/services/customer/FindCustomerByIdService';

describe('Delete an user', () => {
  it('should delete an costumer', async () => {
    const inMemoryCustomerRepository = new InMemoryCustomerRepository();
    const createCustomerService = new CreateCustomerService(inMemoryCustomerRepository);
    const findCustomerByIdService = new FindCustomerByIdService(inMemoryCustomerRepository);
    const deleteCustomerService = new DeleteCustomerService(inMemoryCustomerRepository);

    const data = {
      name: 'jojojo',
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

    await deleteCustomerService.execute(customer.id);

    const customerExists = await findCustomerByIdService.execute(customer.id);

    expect(customerExists).toBeNull();
  });

  it('should return error when customer not found', async () => {
    const inMemoryCustomerRepository = new InMemoryCustomerRepository();
    const deleteCustomerService = new DeleteCustomerService(inMemoryCustomerRepository);

    const action = async () => await deleteCustomerService.execute('_anycustomerid');

    expect(action()).rejects.toThrow(
      new BaseError('Customer not found', 'deleteCustomer', HttpStatusCode.NOT_FOUND)
    );
  });
});
