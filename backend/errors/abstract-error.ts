export abstract class AbstractError extends Error {
  public abstract readonly statusCode: number;

  constructor(message: string) {
    super(message);

    Object.setPrototypeOf(this, AbstractError.prototype);
  }

  abstract serializeErrors(): { message: string; field?: string }[];
}
