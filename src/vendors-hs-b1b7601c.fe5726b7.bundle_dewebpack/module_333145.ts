import { zip } from './954672';
import { joinAllInternals } from './647748';

export function zipAll<T>(sources: Array<Iterable<T>>): Iterable<T[]> {
  return joinAllInternals(zip, sources);
}