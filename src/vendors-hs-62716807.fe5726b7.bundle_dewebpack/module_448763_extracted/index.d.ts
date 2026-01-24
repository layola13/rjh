/**
 * Module Value
 * Provides value-related functionality
 */
declare module 'module_value' {
  /**
   * Represents a generic value type
   */
  export type Value<T = unknown> = T;

  /**
   * Creates or processes a value
   * @template T - The type of the value
   * @param input - The input to create the value from
   * @returns The processed value
   */
  export function value<T>(input: T): Value<T>;
}

/**
 * Module Set
 * Provides set operation functionality
 */
declare module 'module_set' {
  /**
   * Sets a value in a storage or object
   * @template T - The type of the value being set
   * @param key - The key or identifier for the value
   * @param value - The value to set
   * @returns void or boolean indicating success
   */
  export function set<T>(key: string, value: T): void;

  /**
   * Sets a value with options
   * @template T - The type of the value
   * @param key - The key identifier
   * @param value - The value to set
   * @param options - Additional options for setting
   */
  export function set<T>(key: string, value: T, options?: SetOptions): void;

  /**
   * Options for set operations
   */
  export interface SetOptions {
    /** Override existing value if present */
    override?: boolean;
    /** Time to live in milliseconds */
    ttl?: number;
  }
}

/**
 * Module Get
 * Provides get operation functionality
 */
declare module 'module_get' {
  /**
   * Retrieves a value by key
   * @template T - The expected type of the retrieved value
   * @param key - The key to retrieve the value for
   * @returns The retrieved value or undefined if not found
   */
  export function get<T = unknown>(key: string): T | undefined;

  /**
   * Retrieves a value with a default fallback
   * @template T - The type of the value
   * @param key - The key to retrieve
   * @param defaultValue - The default value if key not found
   * @returns The retrieved value or default
   */
  export function get<T>(key: string, defaultValue: T): T;

  /**
   * Options for get operations
   */
  export interface GetOptions {
    /** Whether to remove the value after getting */
    remove?: boolean;
  }

  /**
   * Retrieves a value with options
   * @template T - The type of the value
   * @param key - The key to retrieve
   * @param options - Retrieval options
   * @returns The retrieved value or undefined
   */
  export function get<T = unknown>(key: string, options?: GetOptions): T | undefined;
}

/**
 * Main bundle re-exports
 */
export { value, Value } from 'module_value';
export { set, SetOptions } from 'module_set';
export { get, GetOptions } from 'module_get';