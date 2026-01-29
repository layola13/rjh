import shallowCopy from './shallowCopy';
import keys from './keys';

export default function copyObject<T extends object, U extends object>(
  target: T,
  source: U
): T & U {
  return target && shallowCopy(source, keys(source), target);
}