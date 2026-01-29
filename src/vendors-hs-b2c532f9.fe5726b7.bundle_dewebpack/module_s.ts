function callFunction(callback: Function, context: unknown): void {
  callback.call(context);
}