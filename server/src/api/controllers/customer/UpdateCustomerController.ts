import { UpdateCustomerService } from '@/src/domain/services/customer/UpdateCustomerService';
import { BaseError } from '@/src/shared/classes/baseError';
import { HttpRequest } from '@/src/shared/types/httpRequest';
import { HttpStatusCode } from '@/src/shared/types/httpStatusCode';
import { CustomerNotFoundException } from '../../exceptions/CustomerNotFoundException';
import { validateUpdateCustomerData } from '../../validators';

export class UpdateCustomerController {
  constructor(private updateCustomerService: UpdateCustomerService) {}

  async handle({ req, res, next }: HttpRequest) {
    const { id } = req.params;
    const data = req.body;

    const valid = validateUpdateCustomerData(data);

    if (valid.error) return res.status(HttpStatusCode.BAD_REQUEST).send(valid.error.details);

    try {
      const updatedCustomer = await this.updateCustomerService.execute(id, data);

      return res.status(HttpStatusCode.OK).send(updatedCustomer);
    } catch (err) {
      if (err instanceof BaseError)
        return next(new CustomerNotFoundException(`Customer {${id}} not found`, 'updateCustomer'));
    }
  }
}
