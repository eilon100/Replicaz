import { ErrorRequestHandler } from 'express';

import { AbstractError } from '../errors/abstract-error';

export const errorHandler: ErrorRequestHandler = (err, _req, res, _next) => {
  if (err instanceof AbstractError) {
    res.status(err.statusCode).json({ errors: err.serializeErrors() });
    return;
  }

  console.error({ err });

  res.status(500).json([{ message: 'Internal Error' }]);
};
