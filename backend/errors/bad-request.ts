import { AbstractError } from './abstract-error';

export class BadRequestError extends AbstractError {
  statusCode = 403;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, BadRequestError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
