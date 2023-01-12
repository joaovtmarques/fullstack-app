import { CreateCustomerService } from '@/src/domain/services/customer/CreateCustomerService';
import { HttpRequest } from '@/src/shared/types/httpRequest';
import { HttpStatusCode } from '@/src/shared/types/httpStatusCode';
import { validateCreateCustomerData } from '../../validators';

export class CreateCustomerController {
  constructor(private createCustomerService: CreateCustomerService) {}

  async handle({ req, res, next }: HttpRequest) {
    const valid = validateCreateCustomerData(req.body);

    if (valid.error) return res.status(HttpStatusCode.BAD_REQUEST).send(valid.error.details);

    const data = req.body;

    const customer = await this.createCustomerService.execute(data);

    return res.status(201).send(customer);
  }
}
