import { operate } from './operate';
import { mergeInternals } from './mergeInternals';

export function expand<T, R>(
  project: (value: T, index: number) => R,
  concurrent: number = Infinity,
  scheduler?: unknown
): unknown {
  const normalizedConcurrent = (concurrent || 0) < 1 ? Infinity : concurrent;
  
  return operate((source: unknown, subscriber: unknown) => {
    return mergeInternals(
      source,
      subscriber,
      project,
      normalizedConcurrent,
      undefined,
      true,
      scheduler
    );
  });
}