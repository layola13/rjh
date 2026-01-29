import concat from './module_7517';
import isArray from './module_5490';

export default function baseGetAllKeys<T>(
  object: T,
  keysFunc: (obj: T) => PropertyKey[],
  symbolsFunc: (obj: T) => PropertyKey[]
): PropertyKey[] {
  const keys = keysFunc(object);
  return isArray(object) ? keys : concat(keys, symbolsFunc(object));
}