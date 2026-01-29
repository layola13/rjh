import createBind from './module_5335';
import defineProperty from './module_7976';
import identity from './module_2417';

/**
 * Sets the toString method of a function to return a constant value.
 * Falls back to identity function if defineProperty is not available.
 * 
 * @param fn - The function to modify
 * @param value - The value that toString should return
 * @returns The modified function
 */
function setToString<T extends Function>(fn: T, value: unknown): T {
  if (defineProperty) {
    return defineProperty(fn, "toString", {
      configurable: true,
      enumerable: false,
      value: createBind(value),
      writable: true
    });
  }
  return identity(fn);
}

export default setToString;