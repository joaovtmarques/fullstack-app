import { HttpRequest } from '@/src/shared/types/httpRequest';
import { FindAllCustomersService } from '@/src/domain/services/customer/FindAllCustomersService';
import { HttpStatusCode } from '@/src/shared/types/httpStatusCode';

export class FindAllCustomersController {
  constructor(private findAllCustomersService: FindAllCustomersService) {}

  async handle({ req, res, next }: HttpRequest) {
    const customers = await this.findAllCustomersService.execute();

    return res.status(HttpStatusCode.OK).send(customers);
  }
}
