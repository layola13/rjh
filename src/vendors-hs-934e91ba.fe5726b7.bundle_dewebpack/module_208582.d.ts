/**
 * Gets the enumerable property names of an array-like or object value.
 * 
 * This function creates an array of property names, handling special cases for:
 * - Arrays
 * - Array-like objects
 * - Typed arrays
 * - Buffers
 * 
 * It filters out properties that shouldn't be enumerated based on the object type
 * and whether inherited properties should be included.
 * 
 * @param value - The value to query for property names
 * @param inherited - Whether to include inherited properties from the prototype chain
 * @returns An array of property name strings
 */
declare function getPropertyNames<T>(
  value: T,
  inherited?: boolean
): string[];

export = getPropertyNames;

/**
 * Type guard for arrays
 */
type IsArray = (value: unknown) => value is unknown[];

/**
 * Type guard for arguments objects
 */
type IsArguments = (value: unknown) => value is IArguments;

/**
 * Type guard for buffer objects (e.g., Node.js Buffer)
 */
type IsBuffer = (value: unknown) => value is Buffer;

/**
 * Type guard for typed arrays (e.g., Uint8Array, Int32Array, etc.)
 */
type IsTypedArray = (value: unknown) => value is 
  | Int8Array
  | Uint8Array
  | Uint8ClampedArray
  | Int16Array
  | Uint16Array
  | Int32Array
  | Uint32Array
  | Float32Array
  | Float64Array
  | BigInt64Array
  | BigUint64Array;

/**
 * Checks if a string key represents a valid array index within the given length
 */
type IsIndex = (key: string, length: number) => boolean;

/**
 * Creates an array of specified length filled with values from a mapping function
 */
type BaseTimes = <T>(length: number, mapper: (index: number) => T) => T[];