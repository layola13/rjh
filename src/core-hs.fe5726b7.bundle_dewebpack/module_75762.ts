import isArray from './module_86761';
import isConstructor from './module_3668';
import isObject from './module_17029';
import getWellKnownSymbol from './module_46976';

const SPECIES_SYMBOL = getWellKnownSymbol('species');
const ArrayConstructor = Array;

/**
 * Gets the appropriate array constructor for creating derivative arrays.
 * Respects the Species pattern (Symbol.species) for subclassing.
 * 
 * @param value - The array-like value to get constructor for
 * @returns The constructor to use (Array or custom constructor)
 */
export default function getArraySpeciesConstructor(value: unknown): ArrayConstructor {
  if (!isArray(value)) {
    return ArrayConstructor;
  }

  let constructor: unknown = (value as any).constructor;

  if (isConstructor(constructor)) {
    if (constructor === ArrayConstructor || isArray(constructor.prototype)) {
      constructor = undefined;
    } else if (isObject(constructor)) {
      constructor = (constructor as any)[SPECIES_SYMBOL];
      if (constructor === null) {
        constructor = undefined;
      }
    }
  }

  return constructor === undefined ? ArrayConstructor : (constructor as ArrayConstructor);
}