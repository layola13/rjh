import concat from './module_2488';
import isArray from './module_1469';

export default function baseGetAllKeys<T>(
  object: T,
  keysFunc: (obj: T) => string[],
  symbolsFunc: (obj: T) => symbol[]
): (string | symbol)[] {
  const keys = keysFunc(object);
  return isArray(object) ? keys : concat(keys, symbolsFunc(object));
}