import { merge } from './927';

export function mergeWith<T>(...args: T[]): T {
  return merge(...args);
}