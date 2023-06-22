import { AbstractError } from './abstract-error';

export class NotAuthorizedError extends AbstractError {
  statusCode = 401;

  constructor(message?: string) {
    const defaultMessage = 'אין הרשאות';

    super(message || defaultMessage);

    this.message = message || defaultMessage;

    Object.setPrototypeOf(this, NotAuthorizedError.prototype);
  }

  serializeErrors() {
    return [{ message: this.message }];
  }
}
