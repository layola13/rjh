/**
 * Map getter utility function
 * 
 * This function retrieves a value from a Map-like collection using the provided key.
 * It internally calls a base getter function (module 5050) and then invokes the get method.
 * 
 * @template TKey - The type of the key used to access the Map
 * @template TValue - The type of the value stored in the Map
 * 
 * @param {TKey} key - The key to retrieve the value for
 * @returns {TValue | undefined} The value associated with the key, or undefined if not found
 * 
 * @example
 * const myMap = new Map([['foo', 'bar']]);
 * const getValue = require('./module_6000');
 * getValue.call(myMap, 'foo'); // Returns 'bar'
 */
export default function get<TKey, TValue>(
  this: Map<TKey, TValue>,
  key: TKey
): TValue | undefined;

/**
 * Type definition for the base getter function from module 5050
 * @internal
 */
declare function baseGet<TKey, TValue>(
  collection: Map<TKey, TValue>,
  key: TKey
): Map<TKey, TValue>;