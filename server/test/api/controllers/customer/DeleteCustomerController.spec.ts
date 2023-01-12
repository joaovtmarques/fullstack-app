import { app } from '@/src/app';
import supertest from 'supertest';

describe('Delete an customer', () => {
  let user: supertest.Response;
  let token: supertest.Response;

  beforeEach(async () => {
    user = await supertest(app)
      .post('/users')
      .send({ username: '_any@email.com.br', password: '_anypassword' });

    token = await supertest(app)
      .post('/login')
      .send({ username: '_any@email.com.br', password: '_anypassword' });
  });

  afterEach(async () => {
    await supertest(app).delete(`/users/${user.body.id}`).send();
  });

  it('should delete an customer', async () => {
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

    const customer = await supertest(app)
      .post('/customers')
      .auth(token.body.token, { type: 'bearer' })
      .send(data);

    const response = await supertest(app)
      .delete(`/customers/${customer.body.id}`)
      .auth(token.body.token, { type: 'bearer' })
      .send();

    const customerExists = await supertest(app)
      .get(`/customers/${customer.body.id}`)
      .auth(token.body.token, { type: 'bearer' })
      .send();

    expect(response.status).toBe(200);
    expect(customerExists.body.message).toEqual(`Customer {${customer.body.id}} not found`);
    expect(customerExists.body.statusCode).toEqual(404);
    expect(customerExists.body.method).toEqual('findCustomerById');
  });

  it('should return error when customer not found', async () => {
    const id = '_anycustomerid';

    const response = await supertest(app)
      .delete(`/customers/${id}`)
      .auth(token.body.token, { type: 'bearer' })
      .send();

    expect(response.status).toBe(404);
    expect(response.body.message).toEqual(`Customer {${id}} not found`);
    expect(response.body.statusCode).toEqual(404);
    expect(response.body.method).toEqual('deleteCustomer');
  });
});
