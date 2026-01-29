import { not } from './96003';
import { filter } from './225265';

export function partition<T>(
  predicate: (value: T, index: number) => boolean,
  context?: unknown
): (array: T[]) => [T[], T[]] {
  return (array: T[]): [T[], T[]] => {
    return [
      filter(predicate, context)(array),
      filter(not(predicate, context))(array)
    ];
  };
}