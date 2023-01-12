import { app } from '@/src/app';

import supertest from 'supertest';
import request, { Response } from 'supertest';

describe('Refresh token user', () => {
  let user: Response;

  const data = {
    username: '_any@email.com',
    password: '_anypass',
  };

  beforeEach(async () => {
    user = await request(app).post('/users').send(data);
  });

  afterEach(async () => {
    await request(app).delete(`/users/${user.body.id}`).send();
  });

  it('should generate refresh token', async () => {
    const token = await supertest(app).post('/login').send(data);

    const response = await supertest(app)
      .post('/refresh-token')
      .send({ refreshToken: token.body.refreshToken.id });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );
  });

  it('should return error when refresh token is invalid', async () => {
    const response = await supertest(app)
      .post('/refresh-token')
      .send({ refreshToken: '_anyrefreshtoken' });

    expect(response.status).toBe(400);
    expect(response.body.message).toEqual('Invalid refresh token');
    expect(response.body.method).toEqual('refreshToken');
    expect(response.body.statusCode).toEqual(400);
  });
});
