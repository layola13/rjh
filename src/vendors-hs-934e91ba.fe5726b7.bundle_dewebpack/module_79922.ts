import _baseForOwn from './baseForOwn';
import _keys from './keys';

export default function forOwn<T extends object>(
  object: T,
  iteratee: (value: T[keyof T], key: string, obj: T) => void | boolean
): T {
  return object && _baseForOwn(object, iteratee, _keys);
}