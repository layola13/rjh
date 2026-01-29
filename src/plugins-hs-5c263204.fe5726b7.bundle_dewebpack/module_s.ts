function callFunction<T>(context: T, fn: (this: T) => void): void {
  fn.call(context);
}