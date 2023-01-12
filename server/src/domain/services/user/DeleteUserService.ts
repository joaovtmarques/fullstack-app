import { UserRepository } from '@/src/infra/repositories';
import { BaseError } from '@/src/shared/classes/baseError';
import { HttpStatusCode } from '@/src/shared/types/httpStatusCode';

export class DeleteUserService {
  // eslint-disable-next-line no-unused-vars
  constructor(private userRepository: UserRepository) {}

  async execute(id: string): Promise<void> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new BaseError('User not found', 'deleteUser', HttpStatusCode.NOT_FOUND);
    }

    await this.userRepository.delete(user.id);
  }
}
