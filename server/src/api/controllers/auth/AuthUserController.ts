/* eslint-disable no-unused-vars */
import { AuthUserService } from '@/src/domain/services/auth/AuthUserService';
import { BaseError } from '@/src/shared/classes/baseError';
import { HttpRequest } from '@/src/shared/types/httpRequest';
import { HttpStatusCode } from '@/src/shared/types/httpStatusCode';

export class AuthUserController {
  constructor(private authUserService: AuthUserService) {}

  async handle({ req, res, next }: HttpRequest) {
    try {
      const { username, password } = req.body;

      const token = await this.authUserService.execute({ username, password });

      return res.status(HttpStatusCode.OK).send(token);
    } catch (err) {
      if (err instanceof BaseError) next(new BaseError(err.message, err.methodName, err.httpCode));
    }
  }
}
