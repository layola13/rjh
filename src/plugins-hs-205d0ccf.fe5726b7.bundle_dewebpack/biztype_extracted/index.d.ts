/**
 * Module Bundle - Utility functions for object property manipulation
 * 
 * This module provides type-safe utility functions for getting, setting,
 * and accessing values in objects and nested structures.
 */

/**
 * Retrieves a value from an object using a property path
 * 
 * @template T - The type of the target object
 * @template K - The type of the property key or path
 * @param target - The object to retrieve the value from
 * @param path - The property path (can be string, array of keys, or symbol)
 * @param defaultValue - Optional default value to return if property is not found
 * @returns The value at the specified path or the default value
 * 
 * @example
 * const obj = { user: { name: 'John', age: 30 } };
 * get(obj, 'user.name'); // 'John'
 * get(obj, ['user', 'age']); // 30
 * get(obj, 'user.email', 'N/A'); // 'N/A'
 */
export function get<T extends object, K extends string | string[] | symbol>(
  target: T,
  path: K,
  defaultValue?: unknown
): unknown;

/**
 * Sets a value in an object at the specified property path
 * 
 * @template T - The type of the target object
 * @template K - The type of the property key or path
 * @template V - The type of the value to set
 * @param target - The object to modify
 * @param path - The property path where the value should be set
 * @param value - The value to set at the specified path
 * @returns The modified target object
 * 
 * @example
 * const obj = { user: { name: 'John' } };
 * set(obj, 'user.age', 30); // { user: { name: 'John', age: 30 } }
 * set(obj, ['user', 'email'], 'john@example.com');
 */
export function set<T extends object, K extends string | string[] | symbol, V>(
  target: T,
  path: K,
  value: V
): T;

/**
 * Access or evaluate a value, supporting both direct values and accessor functions
 * 
 * @template T - The type of the expected return value
 * @param valueOrAccessor - Either a direct value or a function that returns a value
 * @param context - Optional context object to pass to the accessor function
 * @returns The resolved value
 * 
 * @example
 * value(42); // 42
 * value(() => 42); // 42
 * value((ctx) => ctx.x * 2, { x: 21 }); // 42
 */
export function value<T>(
  valueOrAccessor: T | ((context?: unknown) => T),
  context?: unknown
): T;

/**
 * Type guard to check if a value is an accessor function
 */
export function isAccessor<T>(value: T | ((...args: unknown[]) => T)): value is (...args: unknown[]) => T;

/**
 * Options for deep property access operations
 */
export interface PropertyAccessOptions {
  /** Whether to create missing intermediate objects when setting values */
  createPath?: boolean;
  /** Separator character for string-based paths (default: '.') */
  separator?: string;
  /** Whether to throw an error if property is not found (default: false) */
  strict?: boolean;
}

/**
 * Type helper for extracting nested property types
 */
export type NestedPropertyType<T, P extends string> = 
  P extends `${infer K}.${infer Rest}`
    ? K extends keyof T
      ? NestedPropertyType<T[K], Rest>
      : unknown
    : P extends keyof T
      ? T[P]
      : unknown;

/**
 * Type helper for property path validation
 */
export type PropertyPath<T> = 
  | keyof T
  | (string & {})
  | Array<string | number | symbol>;