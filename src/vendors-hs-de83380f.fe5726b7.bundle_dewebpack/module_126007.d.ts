/**
 * Validates and returns the result of a derived class constructor call.
 * 
 * This helper ensures that when a derived class constructor returns a value,
 * it must either be an object/function or undefined. If the constructor doesn't
 * return anything explicitly, it returns the instance (this) instead.
 * 
 * @param instance - The instance being constructed (the 'this' value)
 * @param callResult - The value returned by the derived constructor
 * @returns The constructor result if valid (object/function), otherwise the instance
 * @throws {TypeError} If the constructor returns a non-object primitive value (excluding undefined)
 */
export default function possibleConstructorReturn<T extends object>(
  instance: T,
  callResult: unknown
): T | object {
  if (
    callResult !== null &&
    callResult !== undefined &&
    (typeof callResult === "object" || typeof callResult === "function")
  ) {
    return callResult;
  }

  if (callResult !== undefined) {
    throw new TypeError(
      "Derived constructors may only return object or undefined"
    );
  }

  return assertThisInitialized(instance);
}

/**
 * Asserts that the instance is properly initialized (not null/undefined).
 * 
 * @param instance - The instance to validate
 * @returns The validated instance
 * @throws {ReferenceError} If instance is null or undefined
 */
declare function assertThisInitialized<T>(instance: T): NonNullable<T>;

/**
 * Gets the type of a value (including proper detection of null as "null").
 * 
 * @param value - The value to check
 * @returns The type string ("object", "function", "null", etc.)
 */
declare function typeOf(value: unknown): string;