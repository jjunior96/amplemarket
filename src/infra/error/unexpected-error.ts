export class UnexpectedError extends Error {
  constructor(
    message = 'Algo de errado aconteceu. Tente novamente em breve.',
    cause = 500
  ) {
    super(message);
    this.name = 'UnexpectedError';
    this.message = message;
    this.cause = cause;
  }
}
