import { zip } from './path/to/zip';

export function zipWith<T>(...args: T[][]): T[][] {
  return zip(...args);
}