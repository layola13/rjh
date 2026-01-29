import { operate } from './operate';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import { innerFrom } from './innerFrom';
import { Observable, OperatorFunction } from './types';

interface SequenceBuffer<T> {
  buffer: T[];
  complete: boolean;
}

export function sequenceEqual<T>(
  compareTo: Observable<T>,
  comparator: (a: T, b: T) => boolean = (a, b) => a === b
): OperatorFunction<T, boolean> {
  return operate((source, subscriber) => {
    const firstBuffer: SequenceBuffer<T> = {
      buffer: [],
      complete: false
    };

    const secondBuffer: SequenceBuffer<T> = {
      buffer: [],
      complete: false
    };

    const emitResult = (result: boolean): void => {
      subscriber.next(result);
      subscriber.complete();
    };

    const createBufferSubscriber = (
      currentBuffer: SequenceBuffer<T>,
      otherBuffer: SequenceBuffer<T>
    ) => {
      const operatorSubscriber = createOperatorSubscriber(
        subscriber,
        (value: T) => {
          const { buffer: otherBufferArray, complete: otherComplete } = otherBuffer;

          if (otherBufferArray.length === 0) {
            if (otherComplete) {
              emitResult(false);
            } else {
              currentBuffer.buffer.push(value);
            }
          } else {
            const otherValue = otherBufferArray.shift()!;
            if (!comparator(value, otherValue)) {
              emitResult(false);
            }
          }
        },
        () => {
          currentBuffer.complete = true;
          const { complete: otherComplete, buffer: otherBufferArray } = otherBuffer;

          if (otherComplete) {
            emitResult(otherBufferArray.length === 0);
          }

          operatorSubscriber?.unsubscribe();
        }
      );

      return operatorSubscriber;
    };

    source.subscribe(createBufferSubscriber(firstBuffer, secondBuffer));
    innerFrom(compareTo).subscribe(createBufferSubscriber(secondBuffer, firstBuffer));
  });
}