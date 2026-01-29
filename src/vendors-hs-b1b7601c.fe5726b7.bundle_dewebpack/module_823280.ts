import { filter } from './225265';

export function skip<T>(count: number) {
  return filter<T>((item: T, index: number): boolean => {
    return count <= index;
  });
}