import { Router } from 'express';

import { authUserFactory } from '../controllers/auth';
import { refreshTokenUserFactory } from '../controllers/refreshTokenUser';

const auth = Router();

auth.post('/login', (req, res, next) => authUserFactory().handle({ req, res, next }));
auth.post('/refresh-token', (req, res, next) =>
  refreshTokenUserFactory().handle({ req, res, next })
);

export { auth };
