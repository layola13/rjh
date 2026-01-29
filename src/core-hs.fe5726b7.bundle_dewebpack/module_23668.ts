import call from './module_47730';
import isObject from './module_17029';
import isPrimitive from './module_69650';
import getMethod from './module_9087';
import ordinaryToPrimitive from './module_49869';
import wellKnownSymbol from './module_46976';

const toPrimitive = wellKnownSymbol('toPrimitive');

/**
 * Converts an object to a primitive value.
 * Implements the ToPrimitive abstract operation from ECMAScript specification.
 * 
 * @param input - The value to convert to a primitive
 * @param hint - The preferred type ('string', 'number', or 'default')
 * @returns The primitive value
 * @throws TypeError if conversion fails
 */
export default function toPrimitiveValue(
  input: unknown,
  hint?: 'string' | 'number' | 'default'
): unknown {
  if (!isObject(input) || isPrimitive(input)) {
    return input;
  }

  const exoticToPrim = getMethod(input, toPrimitive);

  if (exoticToPrim) {
    const preferredType = hint ?? 'default';
    const result = call(exoticToPrim, input, preferredType);

    if (!isObject(result) || isPrimitive(result)) {
      return result;
    }

    throw new TypeError("Can't convert object to primitive value");
  }

  const preferredType = hint ?? 'number';
  return ordinaryToPrimitive(input, preferredType);
}