import { UserRepository } from '@/src/infra/repositories';
import { sign } from 'jsonwebtoken';

export class GenerateToken {
  // eslint-disable-next-line no-unused-vars
  constructor(private userRepository: UserRepository) {}

  async execute(userId: string) {
    const user = await this.userRepository.findById(userId);

    if (!user) {
      throw new Error('n achei');
    }

    return sign(user, `${process.env.JWT_SECRET}`, {
      subject: user.id,
      expiresIn: '5d',
    });
  }
}
