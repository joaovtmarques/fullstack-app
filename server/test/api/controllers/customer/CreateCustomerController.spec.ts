import { app } from '@/src/app';
import supertest from 'supertest';

describe('Create an customer', () => {
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

  it('should create an customer', async () => {
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

    expect(customer.status).toBe(201);
    expect(customer.body).toEqual(
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

    await supertest(app)
      .delete(`/customers/${customer.body.id}`)
      .auth(token.body.token, { type: 'bearer' })
      .send();
  });

  it('should return error when data to create customer is not provided', async () => {
    const customer = await supertest(app)
      .post('/customers')
      .auth(token.body.token, { type: 'bearer' })
      .send({});

    expect(customer.status).toBe(400);
  });
});
