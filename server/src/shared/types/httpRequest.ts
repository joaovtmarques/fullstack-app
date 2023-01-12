import { Request, Response, NextFunction } from 'express';

export interface HttpRequest {
  req: Request;
  res: Response;
  next: NextFunction;
}
