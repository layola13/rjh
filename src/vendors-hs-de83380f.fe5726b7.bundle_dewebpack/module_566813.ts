export default function assertThisInitialized<T extends object>(
  instance: T,
  returnValue: unknown
): T | NonNullable<unknown> {
  if (
    returnValue !== null &&
    returnValue !== undefined &&
    (typeof returnValue === "object" || typeof returnValue === "function")
  ) {
    return returnValue as NonNullable<unknown>;
  }

  if (returnValue !== undefined) {
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  }

  if (instance === null || instance === undefined) {
    throw new ReferenceError(
      "this hasn't been initialised - super() hasn't been called"
    );
  }

  return instance;
}