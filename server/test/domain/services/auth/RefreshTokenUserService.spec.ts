import { BaseError } from '@/src/shared/classes/baseError';
import { HttpStatusCode } from '@/src/shared/types/httpStatusCode';
import { InMemoryUserRepository } from '@/test/infra/repositories/inMemoryUserRepository';
import { CreateUserService } from '../../../../src/domain/services/user/CreateUserService';
import { AuthUserService } from '../../../../src/domain/services/auth/AuthUserService';
import { RefreshTokenUserService } from '../../../../src/domain/services/auth/RefreshTokenUserSevice';

describe('Refresh token user', () => {
  it('should return the refresh token', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const authUserService = new AuthUserService(inMemoryUserRepository);
    const createUserService = new CreateUserService(inMemoryUserRepository);

    const data = {
      username: '_any@email.com',
      password: '_anypassword',
    };

    await createUserService.execute(data);

    const token = await authUserService.execute({
      username: data.username,
      password: data.password,
    });

    expect(token).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        refreshToken: expect.any(Object),
      })
    );
  });

  it('should return a new token based on a refresh token', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const authUserService = new AuthUserService(inMemoryUserRepository);
    const createUserService = new CreateUserService(inMemoryUserRepository);
    const refreshTokenService = new RefreshTokenUserService(inMemoryUserRepository);

    const data = {
      username: '_any@email.com',
      password: '_anypassword',
    };

    await createUserService.execute(data);

    const token = await authUserService.execute({
      username: data.username,
      password: data.password,
    });

    expect(token).toEqual(
      expect.objectContaining({
        token: expect.any(String),
        refreshToken: expect.any(Object),
      })
    );

    const newToken = await refreshTokenService.execute(token.refreshToken.id);

    expect(newToken).toEqual(
      expect.objectContaining({
        token: expect.any(String),
      })
    );
  });

  it('should return error when providing invalid refresh token', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const refreshTokenService = new RefreshTokenUserService(inMemoryUserRepository);

    const action = async () => await refreshTokenService.execute('_invalidrefreshtoken');

    expect(action()).rejects.toThrow(
      new BaseError('Invalid refresh token', 'refreshToken', HttpStatusCode.BAD_REQUEST)
    );
  });
});
