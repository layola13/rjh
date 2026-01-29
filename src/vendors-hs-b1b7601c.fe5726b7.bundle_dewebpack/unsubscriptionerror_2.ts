export class UnsubscriptionError extends Error {
  public readonly name: string = 'UnsubscriptionError';
  public readonly errors: unknown[];

  constructor(errors: unknown[]) {
    super(
      errors.length > 0
        ? `${errors.length} errors occurred during unsubscription:\n${errors
            .map((error, index) => `${index + 1}) ${String(error)}`)
            .join('\n ')}`
        : ''
    );
    this.errors = errors;
    Object.setPrototypeOf(this, UnsubscriptionError.prototype);
  }
}