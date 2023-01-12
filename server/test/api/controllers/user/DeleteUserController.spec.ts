import { app } from '@/src/app';
import supertest from 'supertest';

describe('Delete user', () => {
  let userResponse: supertest.Response;
  let token: supertest.Response;

  beforeEach(async () => {
    userResponse = await supertest(app)
      .post('/users')
      .send({ username: '_any@email.com.br', password: '_anypassword' });

    token = await supertest(app)
      .post('/login')
      .send({ username: '_any@email.com.br', password: '_anypassword' });
  });

  afterEach(async () => {
    await supertest(app).delete(`/users/${userResponse.body.id}`).send();
  });

  it('should delete an user', async () => {
    const data = {
      username: '_any@email.com',
      password: '_anypass',
    };

    const user = await supertest(app).post('/users').send(data);

    await supertest(app)
      .delete(`/users/${user.body.id}`)
      .auth(token.body.token, { type: 'bearer' })
      .send();

    const userExists = await supertest(app)
      .get(`/users/${user.body.id}`)
      .auth(token.body.token, { type: 'bearer' })
      .send();

    expect(userExists.status).toBe(404);
    expect(userExists.body.message).toBe(`User {${user.body.id}} not found`);
  });

  it('should return error when user to delete not found', async () => {
    const userId = '_anyuserid';

    const response = await supertest(app)
      .delete(`/users/${userId}`)
      .auth(token.body.token, { type: 'bearer' })
      .send();

    expect(response.status).toBe(404);
    expect(response.body.message).toBe(`User {${userId}} not found`);
  });
});
