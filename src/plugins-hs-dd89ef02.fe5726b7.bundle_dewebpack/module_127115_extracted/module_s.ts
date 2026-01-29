function callWithContext(n: Function, e: unknown): void {
  n.call(e);
}