import assignValue from './module_7909';
import isEqual from './module_4425';

const hasOwnProperty = Object.prototype.hasOwnProperty;

/**
 * Assigns a value to an object property only if the new value is different
 * from the existing value or if the property doesn't exist.
 * 
 * @param object - The target object
 * @param key - The property key
 * @param value - The value to assign
 */
export default function assignValueSafe<T extends object, K extends PropertyKey>(
  object: T,
  key: K,
  value: unknown
): void {
  const currentValue = (object as Record<PropertyKey, unknown>)[key];
  
  if (
    !hasOwnProperty.call(object, key) ||
    !isEqual(currentValue, value) ||
    (value !== undefined && !(key in object))
  ) {
    assignValue(object, key, value);
  }
}