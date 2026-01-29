import isObject from './isObject';
import aFunction from './aFunction';
import isNullOrUndefined from './isNullOrUndefined';
import wellKnownSymbol from './wellKnownSymbol';

const SPECIES = wellKnownSymbol('species');

export default function getSpeciesConstructor<T extends Function>(
  instance: any,
  defaultConstructor: T
): T {
  const constructor = isObject(instance).constructor;
  
  if (isNullOrUndefined(constructor)) {
    return defaultConstructor;
  }
  
  const speciesConstructor = isObject(constructor)[SPECIES];
  
  if (isNullOrUndefined(speciesConstructor)) {
    return defaultConstructor;
  }
  
  return aFunction(speciesConstructor) as T;
}