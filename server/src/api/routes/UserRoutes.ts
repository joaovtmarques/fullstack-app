import { Router } from 'express';

import { createUserFactory, deleteUserFactory, findUserByIdFactory } from '../controllers/user';
import { EnsureAutheticatedMiddleware } from '../middlewares/EnsureAuthenticatedMiddleware';

const user = Router();

user.post('/users', (req, res, next) => createUserFactory().handle({ req, res, next }));
user.get('/users/:id', EnsureAutheticatedMiddleware, (req, res, next) =>
  findUserByIdFactory().handle({ req, res, next })
);
user.delete('/users/:id', EnsureAutheticatedMiddleware, (req, res, next) =>
  deleteUserFactory().handle({ req, res, next })
);

export { user };
