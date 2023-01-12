import { BaseError } from '@/src/shared/classes/baseError';
import { HttpStatusCode } from '@/src/shared/types/httpStatusCode';
import { InMemoryUserRepository } from '@/test/infra/repositories/inMemoryUserRepository';
import { CreateUserService } from '@/src/domain/services/user/CreateUserService';
import { AuthUserService } from '@/src/domain/services/auth/AuthUserService';

describe('Authenticate an user', () => {
  it('should authenticate an user', async () => {
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
      })
    );
  });

  it('should return error when user is not found', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const authUserService = new AuthUserService(inMemoryUserRepository);

    const action = async () => {
      await authUserService.execute({
        username: '_any@email.com',
        password: '_anypassword',
      });
    };

    expect(action()).rejects.toThrow(
      new BaseError('User not found', 'authenticateUser', HttpStatusCode.NOT_FOUND)
    );
  });

  it('should return error when providing wrong password', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const authUserService = new AuthUserService(inMemoryUserRepository);
    const createUserService = new CreateUserService(inMemoryUserRepository);

    const data = {
      username: '_any@email.com',
      password: '_anypassword',
    };

    await createUserService.execute(data);

    const action = async () => {
      await authUserService.execute({
        username: data.username,
        password: '_wrongpassword',
      });
    };

    expect(action()).rejects.toThrow(
      new BaseError(
        'Incorrect username or password',
        'authenticateUser',
        HttpStatusCode.BAD_REQUEST
      )
    );
  });
});
