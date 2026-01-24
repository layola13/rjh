/**
 * Gets the appropriate array constructor for creating derivative arrays.
 * Checks for the species constructor pattern (Symbol.species) to allow
 * subclasses to control the type of array instances created by methods.
 * 
 * @param array - The array-like object to get constructor from
 * @returns The constructor function to use (either custom constructor or Array)
 */

import { isObject } from './d3f4';
import { isArray } from './1169';
import { getWellKnownSymbol } from './2b4c';

const SYMBOL_SPECIES = getWellKnownSymbol('species');

export function getArraySpeciesConstructor<T = unknown>(
  array: unknown
): ArrayConstructor | (new (...args: unknown[]) => T[]) {
  let constructor: unknown;

  if (!isArray(array)) {
    return Array;
  }

  const arrayLike = array as { constructor?: unknown };
  const potentialConstructor = arrayLike.constructor;

  // Check if constructor is a function
  if (typeof potentialConstructor !== 'function') {
    return Array;
  }

  // Avoid using Array constructor or constructors with Array-like prototypes
  if (
    potentialConstructor === Array ||
    isArray((potentialConstructor as { prototype?: unknown }).prototype)
  ) {
    return Array;
  }

  // Check for Symbol.species
  if (isObject(potentialConstructor)) {
    const speciesConstructor = (potentialConstructor as Record<symbol, unknown>)[SYMBOL_SPECIES];
    
    if (speciesConstructor === null || speciesConstructor === undefined) {
      return Array;
    }

    constructor = speciesConstructor;
  }

  return constructor === undefined
    ? Array
    : (constructor as ArrayConstructor | (new (...args: unknown[]) => T[]));
}