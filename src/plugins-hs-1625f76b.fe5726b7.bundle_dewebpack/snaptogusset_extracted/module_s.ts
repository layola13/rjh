function callWithContext<T>(fn: () => T, context: unknown): T {
  return fn.call(context);
}