function callWithContext(context: unknown): void {
  n = n.call(context);
}