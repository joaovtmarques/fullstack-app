import { Router } from 'express';

import {
  createCustomerFactory,
  deleteCustomerFactory,
  findAllCustomersFactory,
  findCustomerByIdFactory,
  updateCustomerFactory,
} from '../controllers/customer';
import { EnsureAutheticatedMiddleware } from '../middlewares/EnsureAuthenticatedMiddleware';

const customer = Router();

customer.post('/customers', EnsureAutheticatedMiddleware, (req, res, next) =>
  createCustomerFactory().handle({ req, res, next })
);
customer.get('/customers', EnsureAutheticatedMiddleware, (req, res, next) =>
  findAllCustomersFactory().handle({ req, res, next })
);
customer.get('/customers/:id', EnsureAutheticatedMiddleware, (req, res, next) =>
  findCustomerByIdFactory().handle({ req, res, next })
);
customer.put('/customers/:id', EnsureAutheticatedMiddleware, (req, res, next) =>
  updateCustomerFactory().handle({ req, res, next })
);
customer.delete('/customers/:id', EnsureAutheticatedMiddleware, (req, res, next) =>
  deleteCustomerFactory().handle({ req, res, next })
);

export { customer };
