import { operate } from './operate';
import { noop } from './noop';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import { innerFrom } from './innerFrom';
import type { MonoTypeOperatorFunction, ObservableInput } from './types';

export function buffer<T>(closingNotifier: ObservableInput<unknown>): MonoTypeOperatorFunction<T[]> {
  return operate((source, subscriber) => {
    let currentBuffer: T[] = [];

    source.subscribe(
      createOperatorSubscriber(subscriber, (value: T) => {
        currentBuffer.push(value);
      }, () => {
        subscriber.next(currentBuffer);
        subscriber.complete();
      })
    );

    innerFrom(closingNotifier).subscribe(
      createOperatorSubscriber(subscriber, () => {
        const bufferToEmit = currentBuffer;
        currentBuffer = [];
        subscriber.next(bufferToEmit);
      }, noop)
    );

    return () => {
      currentBuffer = null;
    };
  });
}