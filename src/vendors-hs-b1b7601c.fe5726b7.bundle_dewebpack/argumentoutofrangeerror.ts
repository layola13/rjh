import { createErrorClass } from './createErrorClass';

export class ArgumentOutOfRangeError extends Error {
  constructor() {
    super();
    this.name = "ArgumentOutOfRangeError";
    this.message = "argument out of range";
  }
}