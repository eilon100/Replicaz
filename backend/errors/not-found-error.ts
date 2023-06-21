import { AbstractError } from './abstract-error';

export class NotFoundError extends AbstractError {
  statusCode = 404;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, NotFoundError.prototype);
  }

  serializeErrors() {
    return [{ message: 'Resource not found' }];
  }
}
