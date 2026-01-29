import { combineLatestInit } from './combineLatestInit';
import { operate } from './operate';
import { argsOrArgArray } from './argsOrArgArray';
import { mapOneOrManyArgs } from './mapOneOrManyArgs';
import { pipe } from './pipe';
import { popResultSelector } from './popResultSelector';
import type { Observable } from './Observable';
import type { ObservableInput } from './types';
import type { OperatorFunction } from './OperatorFunction';

export function combineLatest<T extends readonly unknown[], R>(
  ...args: [...ObservableInput<T>[], ((...values: T) => R)?]
): OperatorFunction<unknown, R> | Observable<T> {
  const resultSelector = popResultSelector(args);
  
  if (resultSelector) {
    return pipe(
      combineLatest(...(args as ObservableInput<T>[])),
      mapOneOrManyArgs(resultSelector)
    );
  }
  
  return operate((source: Observable<unknown>, subscriber) => {
    const sources = [source, ...argsOrArgArray(args)];
    combineLatestInit(sources)(subscriber);
  });
}