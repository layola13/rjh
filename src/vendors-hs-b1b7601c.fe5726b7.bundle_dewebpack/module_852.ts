import isNative from './module_8458';
import get from './module_7801';

export default function getBaseFunction<T>(object: any, key: string): T | undefined {
  const value = get(object, key);
  return isNative(value) ? value : undefined;
}