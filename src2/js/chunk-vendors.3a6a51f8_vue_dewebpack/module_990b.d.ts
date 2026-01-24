/**
 * Object keys utility types
 */

/**
 * Function that retrieves object keys (including non-enumerable properties)
 */
interface GetObjectKeysFunction {
  /**
   * Retrieves all own property keys of an object
   * @param target - The target object
   * @returns Array of property keys
   */
  f(target: object): PropertyKey[];
}

/**
 * Function that retrieves object symbol keys
 */
interface GetSymbolKeysFunction {
  /**
   * Retrieves all own symbol property keys of an object
   * @param target - The target object
   * @returns Array of symbol keys
   */
  f(target: object): symbol[];
}

/**
 * Reflect polyfill type
 */
interface ReflectPolyfill {
  /**
   * Returns an array of all own property keys (string and symbol) of the target object
   * Includes both enumerable and non-enumerable properties
   * 
   * This is a polyfill for Reflect.ownKeys
   * 
   * @param target - The target object whose own keys are to be retrieved
   * @returns An array containing all own property keys (strings and symbols)
   * 
   * @example
   * const obj = { a: 1, [Symbol('b')]: 2 };
   * Object.defineProperty(obj, 'hidden', { value: 3, enumerable: false });
   * ownKeys(obj); // ['a', 'hidden', Symbol(b)]
   */
  ownKeys(target: object): PropertyKey[];
}

/**
 * Global Reflect interface extension
 */
interface Reflect extends ReflectPolyfill {}

/**
 * Retrieves all own property keys (including non-enumerable and symbol keys) of an object
 * 
 * Uses native Reflect.ownKeys if available, otherwise falls back to a polyfill implementation
 * that combines Object.getOwnPropertyNames and Object.getOwnPropertySymbols
 * 
 * @param target - The target object to retrieve keys from
 * @returns Array of all property keys (strings and symbols)
 * 
 * @throws {TypeError} If target is not an object
 */
export function getOwnKeys(target: object): PropertyKey[];

/**
 * Module export type
 */
export type OwnKeysPolyfill = typeof getOwnKeys | ReflectPolyfill['ownKeys'];