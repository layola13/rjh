import clone from './clone';
import getAllKeys from './getAllKeys';

export default function baseClone<T>(source: T, target: Record<string, any>): Record<string, any> {
  return clone(source, getAllKeys(source), target);
}