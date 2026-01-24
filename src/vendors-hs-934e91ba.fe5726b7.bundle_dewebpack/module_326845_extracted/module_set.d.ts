/**
 * Immutable Record Module
 * Provides type-safe immutable record structures
 * @module module_set
 */

/**
 * Represents an immutable record that cannot be modified after creation
 * @template T The shape of the record data
 */
interface ImmutableRecord<T extends object> {
  /**
   * Owner ID used for structural sharing and mutation detection
   * @internal
   */
  readonly __ownerID?: string | number;

  /**
   * Sets a value on the record
   * Creates a new record instance with the updated value if immutable
   * @template K Key type of the record
   * @param key The property key to set
   * @param value The value to assign to the key
   * @returns A new record instance with the updated value
   * @throws {Error} When attempting to set on an immutable record without proper ownership
   */
  set<K extends keyof T>(key: K, value: T[K]): ImmutableRecord<T>;
}

/**
 * Assertion function to validate ownership before mutation
 * @param ownerID The owner identifier to check
 * @param errorMessage Error message to throw if assertion fails
 * @throws {Error} When ownerID indicates the record is immutable
 * @internal
 */
declare function pA(
  ownerID: string | number | undefined,
  errorMessage: string
): void;