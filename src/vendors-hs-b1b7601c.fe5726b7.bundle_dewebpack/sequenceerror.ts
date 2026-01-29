import { createErrorClass } from './createErrorClass';

export class SequenceError extends Error {
  public override name = 'SequenceError';

  constructor(message: string) {
    super(message);
    this.message = message;
  }
}