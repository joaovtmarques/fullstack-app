import { FindUserByIdService } from '@/src/domain/services/user/FindUserByIdService';
import { HttpRequest } from '@/src/shared/types/httpRequest';
import { UserNotFoundException } from '../../exceptions/UserNotFoundException';

export class FindUserByIdController {
  // eslint-disable-next-line no-unused-vars
  constructor(private findUserByIdService: FindUserByIdService) {}

  async handle({ req, res, next }: HttpRequest) {
    const { id } = req.params;

    const user = await this.findUserByIdService.execute(id);

    if (user) {
      return res.status(200).send(user);
    }

    next(new UserNotFoundException(`User {${id}} not found`, 'findUserById'));
  }
}
