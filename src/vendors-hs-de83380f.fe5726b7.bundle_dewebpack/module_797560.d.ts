/**
 * Defines a property on an object with the given key and value.
 * If the key is a symbol or computed property, uses Object.defineProperty.
 * Otherwise, assigns the value directly to the object.
 * 
 * @template T - The type of the target object
 * @template K - The type of the property key
 * @template V - The type of the property value
 * 
 * @param target - The target object to define the property on
 * @param key - The property key (string, number, or symbol)
 * @param value - The value to assign to the property
 * @returns The target object with the property defined
 * 
 * @example
 * const obj = {};
 * defineProperty(obj, 'foo', 'bar');
 * // obj.foo === 'bar'
 * 
 * @example
 * const sym = Symbol('key');
 * defineProperty(obj, sym, 123);
 * // obj[sym] === 123
 */
export default function defineProperty<
  T extends object,
  K extends PropertyKey,
  V
>(
  target: T,
  key: K,
  value: V
): T & Record<K, V>;