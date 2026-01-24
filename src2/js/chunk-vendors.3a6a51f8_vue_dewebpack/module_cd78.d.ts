/**
 * Promise species constructor utility
 * Ensures a value is a promise of the correct constructor type
 * 
 * @module PromiseSpecies
 */

/**
 * Converts a value to a promise using the specified constructor,
 * or returns the value as-is if it's already a promise with the same constructor.
 * 
 * @template T - The type of the resolved value
 * @param promiseConstructor - The Promise constructor to use
 * @param value - The value to convert to a promise
 * @returns A promise that resolves to the value
 */
export declare function toPromiseSpecies<T>(
  promiseConstructor: PromiseConstructorLike,
  value: T | PromiseLike<T>
): Promise<T>;

/**
 * Promise constructor interface with capability factory
 */
export interface PromiseConstructorLike {
  new <T>(executor: (resolve: (value: T | PromiseLike<T>) => void, reject: (reason?: unknown) => void) => void): Promise<T>;
  prototype: Promise<unknown>;
}

/**
 * Internal promise capability object
 */
export interface PromiseCapability<T> {
  /** The promise instance */
  promise: Promise<T>;
  /** Resolver function */
  resolve: (value: T | PromiseLike<T>) => void;
  /** Rejector function */
  reject: (reason?: unknown) => void;
}

/**
 * Promise capability factory
 */
export interface PromiseCapabilityFactory {
  /** Creates a new promise capability object */
  f<T>(constructor: PromiseConstructorLike): PromiseCapability<T>;
}

export default toPromiseSpecies;