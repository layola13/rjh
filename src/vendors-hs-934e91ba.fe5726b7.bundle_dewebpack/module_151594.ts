import shallowClone from './shallowClone';
import getAllKeys from './getAllKeys';

export default function baseClone<T extends object>(source: T, target: object): object {
  return shallowClone(source, getAllKeys(source), target);
}