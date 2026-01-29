import shallowCopy from './shallowCopy';
import keys from './keys';

export default function copyObject<T extends object, U extends object>(
  source: T,
  props: U
): T {
  return source && shallowCopy(props, keys(props), source);
}