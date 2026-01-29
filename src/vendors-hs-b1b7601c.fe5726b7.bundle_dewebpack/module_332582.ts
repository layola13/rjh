import { operate } from './operate';
import { createOperatorSubscriber } from './createOperatorSubscriber';
import { arrRemove } from './arrRemove';
import { Observable, OperatorFunction } from './types';

/**
 * Buffers source values into arrays of specified size, with optional skip count.
 * 
 * @param bufferSize The maximum size of each buffer array
 * @param startBufferEvery Number of values to skip before starting a new buffer (defaults to bufferSize)
 * @returns An operator function that buffers source values
 */
export function bufferCount<T>(
  bufferSize: number,
  startBufferEvery: number | null = null
): OperatorFunction<T, T[]> {
  const skipCount = startBufferEvery ?? bufferSize;

  return operate((source, subscriber) => {
    let buffers: T[][] = [];
    let valueCount = 0;

    source.subscribe(
      createOperatorSubscriber(
        subscriber,
        (value: T) => {
          let completedBuffers: T[][] | null = null;

          if (valueCount++ % skipCount === 0) {
            buffers.push([]);
          }

          for (const buffer of buffers) {
            buffer.push(value);
            
            if (buffer.length >= bufferSize) {
              if (completedBuffers === null) {
                completedBuffers = [];
              }
              completedBuffers.push(buffer);
            }
          }

          if (completedBuffers !== null) {
            for (const completedBuffer of completedBuffers) {
              arrRemove(buffers, completedBuffer);
              subscriber.next(completedBuffer);
            }
          }
        },
        () => {
          for (const buffer of buffers) {
            subscriber.next(buffer);
          }
          subscriber.complete();
        },
        undefined,
        () => {
          buffers = null!;
        }
      )
    );
  });
}