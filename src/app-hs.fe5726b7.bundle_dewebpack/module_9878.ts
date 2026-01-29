import objectIterator from './module_824';
import getObjectKeys from './module_6055';

export default function iterateObjectWithKeys<T extends object>(
  obj: T,
  iteratee: (value: T[keyof T], key: keyof T, obj: T) => void | boolean
): T | undefined {
  return obj && objectIterator(obj, iteratee, getObjectKeys);
}