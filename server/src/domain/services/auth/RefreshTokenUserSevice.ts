import prismaClient from '@/src/prisma';
import { UserRepository } from '@/src/infra/repositories';
import { BaseError } from '@/src/shared/classes/baseError';
import { HttpStatusCode } from '@/src/shared/types/httpStatusCode';
import { GenerateToken } from '../../provider';

export class RefreshTokenUserService {
  // eslint-disable-next-line no-unused-vars
  constructor(private userRepository: UserRepository) {}

  async execute(rToken: string) {
    const refreshToken = await prismaClient.refreshToken.findFirst({
      where: {
        id: rToken,
      },
    });

    if (!refreshToken) {
      throw new BaseError('Invalid refresh token', 'refreshToken', HttpStatusCode.BAD_REQUEST);
    }

    const generateToken = new GenerateToken(this.userRepository);
    const token = await generateToken.execute(refreshToken.userId);

    return { token };
  }
}
