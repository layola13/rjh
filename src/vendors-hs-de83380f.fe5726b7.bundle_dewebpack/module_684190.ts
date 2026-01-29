export function assertInstanceOf<T>(instance: unknown, constructor: new (...args: any[]) => T): asserts instance is T {
  if (!(instance instanceof constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

export default assertInstanceOf;