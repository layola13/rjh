function callWithContext<T>(fn: T, context: unknown): void {
  if (typeof fn === 'function') {
    fn.call(context);
  }
}