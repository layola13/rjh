export class EmptyError extends Error {
  public override readonly name = "EmptyError";
  public override readonly message = "no elements in sequence";

  constructor() {
    super("no elements in sequence");
    Object.setPrototypeOf(this, EmptyError.prototype);
  }
}