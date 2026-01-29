function callFunction(context: unknown): void {
  const n = (n as Function).call(context);
}