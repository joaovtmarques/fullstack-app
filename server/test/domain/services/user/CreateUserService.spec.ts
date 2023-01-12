import { CreateUserService } from '@/src/domain/services/user/CreateUserService';
import { InMemoryUserRepository } from '@/test/infra/repositories/inMemoryUserRepository';
import { compare } from 'bcrypt';

describe('Create user', () => {
  it('should create an user', async () => {
    const inMemoryUserRepository = new InMemoryUserRepository();
    const createUserService = new CreateUserService(inMemoryUserRepository);

    const data = {
      username: '_any@email.com',
      password: '_anypass',
    };

    const user = await createUserService.execute(data);

    expect(user).toEqual(
      expect.objectContaining({
        username: '_any@email.com',
      })
    );

    expect(await compare(data.password, user.password));
  });
});
