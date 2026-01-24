/**
 * Promise species constructor utility
 * 
 * Creates a Promise instance using the constructor from the provided value if it matches,
 * otherwise creates a new Promise using the constructor's species pattern.
 * 
 * This utility ensures that Promise subclasses maintain their type when resolved.
 * 
 * @module module_bcaa
 * @dependencies
 *   - cb7c: Object type assertion/validation
 *   - d3f4: Object type checking predicate
 *   - a5b8: Promise constructor factory (likely Promise[Symbol.species])
 */

/**
 * Type guard for object values
 */
type IsObject = (value: unknown) => value is object;

/**
 * Promise constructor interface with species support
 */
interface PromiseConstructorLike<T = unknown> {
  readonly prototype: Promise<T>;
  new (executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: unknown) => void) => void): Promise<T>;
}

/**
 * Promise factory with resolve capability
 */
interface PromiseCapability<T = unknown> {
  promise: Promise<T>;
  resolve: (value: T | PromiseLike<T>) => void;
  reject: (reason?: unknown) => void;
}

/**
 * Factory for creating promise capabilities
 */
interface PromiseCapabilityFactory {
  f: <T = unknown>(constructor: PromiseConstructorLike<T>) => PromiseCapability<T>;
}

/**
 * Ensures the provided value is resolved as a Promise using the appropriate constructor.
 * 
 * If the value is already an object with a constructor matching the provided constructor,
 * returns the value as-is. Otherwise, creates a new Promise capability and immediately
 * resolves it with the value.
 * 
 * @template T - The type of the resolved value
 * @param constructor - The Promise constructor to use for creating new promises
 * @param value - The value to ensure as a Promise
 * @returns A Promise of type T that resolves to the provided value
 * 
 * @example
 *