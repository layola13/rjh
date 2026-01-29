import { map } from './632701';

export function mapTo<T>(value: T) {
  return map(() => value);
}