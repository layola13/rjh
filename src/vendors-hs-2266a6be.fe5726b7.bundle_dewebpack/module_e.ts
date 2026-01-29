function throwError(error: Error, message?: string, context?: unknown): never {
  throw new ErrorWrapper(error).init(message, context);
}