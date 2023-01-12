import { app } from '@/src/app';
import supertest from 'supertest';

describe('Find user by id', () => {
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

  it('should find user by id', async () => {
    const data = {
      username: '_any@email.com',
      password: '_anypass',
    };

    const response = await supertest(app).post('/users').send(data);

    const user = await supertest(app)
      .get(`/users/${response.body.id}`)
      .auth(token.body.token, { type: 'bearer' })
      .send();

    expect(user.status).toBe(200);
    expect(user.body).toEqual(
      expect.objectContaining({
        id: expect.any(String),
        username: '_any@email.com',
      })
    );
  });
});
