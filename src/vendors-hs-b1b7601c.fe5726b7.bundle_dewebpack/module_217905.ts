import { reduce } from './603637';
import { operate } from './371241';

function accumulator<T>(array: T[], item: T): T[] {
  return array.push(item), array;
}

export function toArray<T>(): (source: any) => any {
  return operate((source: any, subscriber: any) => {
    reduce(accumulator, [])(source).subscribe(subscriber);
  });
}