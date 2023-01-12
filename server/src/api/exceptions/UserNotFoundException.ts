import { BaseError } from '@/src/shared/classes/baseError';
import { HttpStatusCode } from '@/src/shared/types/httpStatusCode';

export class UserNotFoundException extends BaseError {
  message: string;
  methodName: string;

  constructor(message: string, methodName: string) {
    super(message, methodName);

    this.message = message;
    this.methodName = methodName;
    this.httpCode = HttpStatusCode.NOT_FOUND;
  }
}
