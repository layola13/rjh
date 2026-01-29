import { EmptyError } from './EmptyError';
import { SequenceError } from './SequenceError';
import { NotFoundError } from './NotFoundError';
import { operate } from './operate';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import { Observable } from './Observable';
import { OperatorFunction } from './types';

export function single<T>(
  predicate?: (value: T, index: number, source: Observable<T>) => boolean
): OperatorFunction<T, T> {
  return operate((source: Observable<T>, subscriber) => {
    let matchedValue: T | undefined;
    let hasMatched = false;
    let hasEmitted = false;
    let index = 0;

    source.subscribe(
      createOperatorSubscriber(
        subscriber,
        (value: T) => {
          hasEmitted = true;

          if (!predicate || !predicate(value, index++, source)) {
            if (hasMatched) {
              subscriber.error(new SequenceError('Too many matching values'));
              return;
            }
            hasMatched = true;
            matchedValue = value;
          }
        },
        () => {
          if (hasMatched) {
            subscriber.next(matchedValue!);
            subscriber.complete();
          } else {
            subscriber.error(
              hasEmitted
                ? new NotFoundError('No matching values')
                : new EmptyError()
            );
          }
        }
      )
    );
  });
}