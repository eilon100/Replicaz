import { ValidationError } from 'express-validator';

import { AbstractError } from './abstract-error';

export type ValidationErrors = (
  | ValidationError
  | { msg: string; param: string }
)[];

export class RequestValidationError extends AbstractError {
  public statusCode = 422;

  constructor(private errors: ValidationErrors) {
    super(errors.map((error) => error.msg).join('\n'));

    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeErrors(): { message: string; field?: string | undefined }[] {
    return this.errors.map((error) => ({
      message: error.msg,
      field: error.param,
    }));
  }
}
