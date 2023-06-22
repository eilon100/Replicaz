import { RequestHandler } from 'express';
import { validationResult } from 'express-validator';
import { RequestValidationError } from '../errors/validation-error';

export const validateRequest: RequestHandler = (req, _, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    throw new RequestValidationError(errors.array());
  }

  next();
};
