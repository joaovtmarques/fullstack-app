import { DeleteCustomerService } from '@/src/domain/services/customer/DeleteCustomerService';
import { BaseError } from '@/src/shared/classes/baseError';
import { HttpRequest } from '@/src/shared/types/httpRequest';
import { HttpStatusCode } from '@/src/shared/types/httpStatusCode';
import { CustomerNotFoundException } from '../../exceptions/CustomerNotFoundException';

export class DeleteCustomerController {
  constructor(private deleteCustomerService: DeleteCustomerService) {}

  async handle({ req, res, next }: HttpRequest) {
    const { id } = req.params;

    try {
      await this.deleteCustomerService.execute(id);

      return res.status(HttpStatusCode.OK).send();
    } catch (err) {
      if (err instanceof BaseError)
        return next(new CustomerNotFoundException(`Customer {${id}} not found`, err.methodName));
    }
  }
}
