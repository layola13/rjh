/**
 * Utility functions for field ID generation and array conversion
 * @module FieldUtils
 */

/**
 * Generates a unique field identifier by joining path segments
 * @param path - Array of field path segments to join
 * @param prefix - Optional prefix to prepend to the generated ID
 * @returns The generated field ID string, or undefined if path is empty
 * @example
 * getFieldId(['user', 'profile', 'name']) // Returns: "user_profile_name"
 * getFieldId(['address', 'city'], 'form') // Returns: "form_address_city"
 */
export declare function getFieldId(path: string[], prefix?: string): string | undefined;

/**
 * Converts a value to an array format
 * @param value - Value to convert (can be undefined, false, single value, or array)
 * @returns An array containing the value(s), or empty array if value is undefined/false
 * @example
 * toArray(undefined) // Returns: []
 * toArray(false) // Returns: []
 * toArray('item') // Returns: ['item']
 * toArray(['a', 'b']) // Returns: ['a', 'b']
 */
export declare function toArray<T>(value: T | T[] | undefined | false): T[];