import { AxiosError } from 'axios';

const ErrorHandler = (error: unknown) => {
  if (error instanceof AxiosError) {
    const errors = error.response?.data?.errors;
    if (errors && Array.isArray(errors) && 'message' in errors[0]) {
      return errors[0].message;
    }
  }

  return 'שגיאה כללית';
};

export default ErrorHandler;
