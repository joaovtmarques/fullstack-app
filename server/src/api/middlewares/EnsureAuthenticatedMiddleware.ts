import { BaseError } from '@/src/shared/classes/baseError';
import { HttpStatusCode } from '@/src/shared/types/httpStatusCode';
import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

export function EnsureAutheticatedMiddleware(req: Request, res: Response, next: NextFunction) {
  const { authorization } = req.headers;

  if (!authorization)
    next(new BaseError('Token is missing', 'authenticateUser', HttpStatusCode.UNAUTHORIZED));

  const [, token] = authorization!.split(' ');

  try {
    verify(token, `${process.env.JWT_SECRET}`);

    return next();
  } catch (err) {
    next(new BaseError('Token invalid', 'authenticateUser', HttpStatusCode.UNAUTHORIZED));
  }
}
