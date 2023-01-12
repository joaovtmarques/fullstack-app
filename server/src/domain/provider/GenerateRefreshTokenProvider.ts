import dayjs from 'dayjs';

import prismaClient from '@/src/prisma';
import { RefreshTokenModel } from '../models';

export class GenerateRefreshToken {
  async execute(userId: string): Promise<RefreshTokenModel> {
    const expiresIn = dayjs().add(5, 'day').unix();

    return await prismaClient.refreshToken.create({
      data: {
        userId,
        expiresIn,
      },
    });
  }
}
