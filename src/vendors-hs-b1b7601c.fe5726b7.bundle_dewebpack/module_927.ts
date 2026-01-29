import { operate } from './operate';
import { mergeAll } from './mergeAll';
import { popScheduler, popNumber } from './util';
import { from } from './from';

export function merge<T>(...sources: unknown[]): unknown {
  const scheduler = popScheduler(sources);
  const concurrent = popNumber(sources, Infinity);
  
  return operate((source: T, subscriber: unknown) => {
    mergeAll(concurrent)(from([source, ...sources], scheduler)).subscribe(subscriber);
  });
}