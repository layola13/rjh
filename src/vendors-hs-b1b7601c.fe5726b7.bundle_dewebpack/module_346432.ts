import { argsOrArgArray } from './utils/args';
import { onErrorResumeNext as onErrorResumeNextImpl } from './operators/onErrorResumeNext';
import { Observable } from './Observable';
import { ObservableInput } from './types';

/**
 * Creates an operator that continues with the next observable when an error occurs.
 * When the source observable errors, it will subscribe to the next observable in the sequence.
 */
export function onErrorResumeNextWith<T>(...sources: Array<ObservableInput<T>>) {
  const normalizedSources = argsOrArgArray(sources);
  
  return function(source: Observable<T>): Observable<T> {
    return onErrorResumeNextImpl(source, ...normalizedSources);
  };
}

export const onErrorResumeNext = onErrorResumeNextWith;