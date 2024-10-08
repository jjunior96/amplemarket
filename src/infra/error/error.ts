import { HttpStatusCode } from '@/application/protocol';

import { AccessDeniedError } from './access-denied-error';
import { InvalidCredentialsError } from './invalid-credentials-error';
import { UnexpectedError } from './unexpected-error';

export const errors: Partial<{ [K in HttpStatusCode]: Error }> = {
  '400': new UnexpectedError(),
  '401': new InvalidCredentialsError(),
  '403': new AccessDeniedError(),
  '404': new UnexpectedError(),
  '409': new UnexpectedError(),
  '412': new UnexpectedError(),
  '500': new UnexpectedError()
};

export const errorResponse = (statusCode: HttpStatusCode, message: string) => {
  switch (statusCode) {
    case HttpStatusCode.badRequest:
      return new UnexpectedError(message, statusCode);
    case HttpStatusCode.unauthorized:
      return new InvalidCredentialsError();
    case HttpStatusCode.forbidden:
      return new AccessDeniedError();
    case HttpStatusCode.notFound:
      return new UnexpectedError(message, statusCode);
    case HttpStatusCode.conflict:
      return new UnexpectedError(message, statusCode);
    case HttpStatusCode.preconditionFailed:
      return new UnexpectedError(message, statusCode);
    case HttpStatusCode.serverError:
      return new UnexpectedError(message, statusCode);
    default:
      return new UnexpectedError(message, statusCode);
  }
};
