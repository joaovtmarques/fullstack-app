import { FindCustomerByIdService } from '@/src/domain/services/customer/FindCustomerByIdService';
import { HttpRequest } from '@/src/shared/types/httpRequest';
import { HttpStatusCode } from '@/src/shared/types/httpStatusCode';
import { CustomerNotFoundException } from '../../exceptions/CustomerNotFoundException';

export class FindCustomerByIdController {
  constructor(private findCustomerById: FindCustomerByIdService) {}

  async handle({ req, res, next }: HttpRequest) {
    const { id } = req.params;

    const customer = await this.findCustomerById.execute(id);

    if (customer) {
      return res.status(HttpStatusCode.OK).send(customer);
    }

    next(new CustomerNotFoundException(`Customer {${id}} not found`, 'findCustomerById'));
  }
}
