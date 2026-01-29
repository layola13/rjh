function callGWithContext(context: unknown): void {
  if (typeof g === 'function') {
    g.call(context);
  }
}