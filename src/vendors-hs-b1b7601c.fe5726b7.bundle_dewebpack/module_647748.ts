import { identity } from './identity';
import { mapOneOrManyArgs } from './mapOneOrManyArgs';
import { pipe } from './pipe';
import { mergeMap } from './mergeMap';
import { toArray } from './toArray';

export function joinAllInternals<T, R>(
  joiner: (values: T[]) => R,
  project?: (...args: unknown[]) => unknown
): (source: unknown) => unknown {
  return pipe(
    toArray(),
    mergeMap((values: T[]) => joiner(values)),
    project ? mapOneOrManyArgs(project) : identity
  );
}