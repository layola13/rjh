import { mergeMap } from './mergeMap';
import { identity } from './identity';

export function mergeAll<T>(concurrent: number = Infinity): (source: any) => any {
  return mergeMap(identity, concurrent);
}