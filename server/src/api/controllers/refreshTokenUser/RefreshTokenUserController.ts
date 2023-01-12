import { RefreshTokenUserService } from '@/src/domain/services/auth/RefreshTokenUserSevice';
import { BaseError } from '@/src/shared/classes/baseError';
import { HttpRequest } from '@/src/shared/types/httpRequest';

export class RefreshTokenUserController {
  constructor(private refreshTokenUserService: RefreshTokenUserService) {}

  async handle({ req, res, next }: HttpRequest) {
    try {
      const { refreshToken } = req.body;

      const token = await this.refreshTokenUserService.execute(refreshToken);

      return res.status(200).send(token);
    } catch (err) {
      if (err instanceof BaseError) next(new BaseError(err.message, err.methodName, err.httpCode));
    }
  }
}
