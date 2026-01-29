function installErrorCause(error: Error, options: { cause?: unknown }): void {
  if (isObject(options) && "cause" in options) {
    createNonEnumerableProperty(error, "cause", options.cause);
  }
}

function isObject(value: unknown): value is Record<string, unknown> {
  return value !== null && typeof value === "object";
}

function createNonEnumerableProperty(
  target: object,
  propertyName: string,
  value: unknown
): void {
  Object.defineProperty(target, propertyName, {
    value,
    writable: true,
    enumerable: false,
    configurable: true,
  });
}

export default installErrorCause;