import { app } from '@/src/app';
import supertest from 'supertest';

describe('Find all customers', () => {
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
    await supertest(app)
      .delete(`/users/${user.body.id}`)
      .auth(token.body.token, { type: 'bearer' })
      .send();
  });

  it('should find all customers', async () => {
    const customers = await supertest(app)
      .get('/customers')
      .auth(token.body.token, { type: 'bearer' })
      .send({});

    expect(customers.body).toEqual(
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
