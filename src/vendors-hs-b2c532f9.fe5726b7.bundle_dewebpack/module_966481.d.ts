/**
 * Immutable.js utility functions for normalization and denormalization
 */

/**
 * Checks if an object is an Immutable.js data structure
 * @param value - The value to check
 * @returns True if the value is an Immutable.js collection, false otherwise
 */
export function isImmutable(value: unknown): boolean;

/**
 * Denormalizes an Immutable.js data structure by applying a transformation function
 * to matching keys in the schema
 * @param schema - Plain object schema containing keys and their corresponding values
 * @param immutableData - The Immutable.js Map or Collection to denormalize
 * @param transformer - Function to transform matched values
 * @returns The denormalized Immutable.js collection with transformed values
 */
export function denormalizeImmutable<T, U, R>(
  schema: Record<string, T>,
  immutableData: ImmutableMap<string, U>,
  transformer: (currentValue: U, schemaValue: T) => R
): ImmutableMap<string, U | R>;

/**
 * Type definition for Immutable.js Map-like structure
 */
interface ImmutableMap<K, V> {
  has(key: K): boolean;
  get(key: K): V;
  set(key: K, value: V): ImmutableMap<K, V>;
  _map?: {
    __ownerID?: unknown;
  };
  __ownerID?: unknown;
}