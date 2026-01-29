function invokeFunction(context: unknown): void {
  n = n.call(context);
}