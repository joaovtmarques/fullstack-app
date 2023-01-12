import { UserRepository } from '@/src/infra/repositories';
import { UserModel } from '../../models';

export class FindUserByIdService {
  // eslint-disable-next-line no-unused-vars
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<UserModel | null> {
    return await this.userRepository.findById(id);
  }
}
