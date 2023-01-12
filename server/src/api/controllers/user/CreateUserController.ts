/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
import { CreateUserService } from '@/src/domain/services/user/CreateUserService';
import { HttpRequest } from '@/src/shared/types/httpRequest';
import { HttpStatusCode } from '@/src/shared/types/httpStatusCode';

import { validateCreateUserData } from '../../validators/CreateUserValidator';

export class CreateUserController {
  constructor(private createUserService: CreateUserService) {}

  async handle({ req, res, next }: HttpRequest) {
    const valid = validateCreateUserData(req.body);

    if (valid.error) {
      return res.status(HttpStatusCode.BAD_REQUEST).send(valid.error.details);
    }

    const { username, password } = req.body;

    const user = await this.createUserService.execute({ username, password });

    return res.status(HttpStatusCode.CREATED).send(user);
  }
}
