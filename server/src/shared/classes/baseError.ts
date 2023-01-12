import { HttpStatusCode } from '../types/httpStatusCode';

export class BaseError extends Error {
  methodName: string;
  httpCode?: HttpStatusCode;

  constructor(message?: string, methodName?: string, httpCode?: HttpStatusCode) {
    super(message);

    this.message = message!;
    this.methodName = methodName!;
    this.httpCode = httpCode;
  }
}
