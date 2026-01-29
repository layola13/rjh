import { operate } from './operate';
import { concatAll } from './concatAll';
import { popScheduler } from './popScheduler';
import { from } from './from';
import type { OperatorFunction, SchedulerLike } from './types';

export function concat<T>(...sources: Array<any>): OperatorFunction<T, T> {
  const scheduler: SchedulerLike | undefined = popScheduler(sources);
  
  return operate((source, subscriber) => {
    concatAll()(from([source, ...sources], scheduler)).subscribe(subscriber);
  });
}