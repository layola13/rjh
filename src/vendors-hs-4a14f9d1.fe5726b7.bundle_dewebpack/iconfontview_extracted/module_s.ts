function callGlobalFunction<T>(context: T): void {
  g = g.call(context);
}