import { operate } from './operate';
import { noop } from './noop';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import { innerFrom } from './innerFrom';
import { Observable, OperatorFunction, ObservableInput } from './types';

/**
 * Buffers source values until a closing notifier emits.
 * 
 * @param closingSelector A function that returns an Observable that signals buffer closure
 * @returns An operator function that returns an Observable of arrays of buffered values
 */
export function bufferWhen<T>(
  closingSelector: () => ObservableInput<unknown>
): OperatorFunction<T, T[]> {
  return operate((source, subscriber) => {
    let buffer: T[] | null = null;
    let closingSubscriber: ReturnType<typeof createOperatorSubscriber> | null = null;

    const openBuffer = (): void => {
      closingSubscriber?.unsubscribe();

      const currentBuffer = buffer;
      buffer = [];

      if (currentBuffer) {
        subscriber.next(currentBuffer);
      }

      innerFrom(closingSelector()).subscribe(
        closingSubscriber = createOperatorSubscriber(
          subscriber,
          openBuffer,
          noop
        )
      );
    };

    openBuffer();

    source.subscribe(
      createOperatorSubscriber(
        subscriber,
        (value: T) => {
          buffer?.push(value);
        },
        () => {
          if (buffer) {
            subscriber.next(buffer);
          }
          subscriber.complete();
        },
        undefined,
        () => {
          buffer = null;
          closingSubscriber = null;
        }
      )
    );
  });
}