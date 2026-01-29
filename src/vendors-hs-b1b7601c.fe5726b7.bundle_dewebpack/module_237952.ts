import { identity } from './identity';
import { operate } from './operate';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import { MonoTypeOperatorFunction, Observer } from './types';

export function skipLast<T>(count: number): MonoTypeOperatorFunction<T> {
  if (count <= 0) {
    return identity;
  }

  return operate((source, subscriber) => {
    const buffer: T[] = new Array(count);
    let index = 0;

    return source.subscribe(
      createOperatorSubscriber(subscriber, (value: T) => {
        const currentIndex = index++;
        
        if (currentIndex < count) {
          buffer[currentIndex] = value;
        } else {
          const bufferPosition = currentIndex % count;
          const oldestValue = buffer[bufferPosition];
          buffer[bufferPosition] = value;
          subscriber.next(oldestValue);
        }
      })
    );
  }, () => {
    buffer.length = 0;
  });
}