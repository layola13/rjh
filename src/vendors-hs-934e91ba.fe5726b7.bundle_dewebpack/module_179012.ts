import concat from './module_176585';
import isArray from './module_962726';

export default function <T>(
  value: T,
  iteratee: (value: T) => any[],
  flattenDeep: (value: T) => any[]
): any[] {
  const result = iteratee(value);
  return isArray(value) ? result : concat(result, flattenDeep(value));
}