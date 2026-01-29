import shallowCopy from './module_3532';
import getAllKeys from './module_9716';

export default function copyObject<T extends object>(source: T, keys: PropertyKey[], target: Partial<T>): Partial<T> {
  return shallowCopy(source, getAllKeys(source), target);
}