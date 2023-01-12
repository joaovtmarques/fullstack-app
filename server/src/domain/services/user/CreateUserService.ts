import { UserModel } from '@/src/domain/models';
import { UserRepository } from '@/src/infra/repositories';
import { hash } from 'bcrypt';

interface CreateUserRequest {
  username: string;
  password: string;
}

export class CreateUserService {
  // eslint-disable-next-line no-unused-vars
  constructor(private userRepository: UserRepository) {}

  async execute(data: CreateUserRequest): Promise<UserModel> {
    const hashedPassword = await hash(data.password, 8);

    data.password = hashedPassword;

    return await this.userRepository.create(data);
  }
}
