import { call } from './948496';
import { isObject } from './808535';
import { isPrimitive } from './112776';
import { getMethod } from './547193';
import { ordinaryToPrimitive } from './573079';
import { getWellKnownSymbol } from './446898';

type PreferredType = 'string' | 'number' | 'default';

/**
 * Converts an object to a primitive value using the ToPrimitive algorithm.
 * @param input - The value to convert
 * @param preferredType - The preferred type hint ('string', 'number', or 'default')
 * @returns The primitive value
 * @throws TypeError if the object cannot be converted to a primitive value
 */
export function toPrimitive(input: unknown, preferredType?: PreferredType): unknown {
  if (!isObject(input) || isPrimitive(input)) {
    return input;
  }

  const toPrimitiveSymbol = getWellKnownSymbol('toPrimitive');
  const exoticToPrimitive = getMethod(input, toPrimitiveSymbol);

  if (exoticToPrimitive) {
    const hint = preferredType ?? 'default';
    const result = call(exoticToPrimitive, input, hint);
    
    if (!isObject(result) || isPrimitive(result)) {
      return result;
    }
    
    throw new TypeError("Can't convert object to primitive value");
  }

  const hint = preferredType ?? 'number';
  return ordinaryToPrimitive(input, hint);
}