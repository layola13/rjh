/**
 * RxJS bufferWhen operator
 * Buffers source values until a closing notifier emits, then emits the buffer and repeats.
 */

import { operate, OperatorFunction } from 'rxjs/internal/operators/operate';
import { createOperatorSubscriber } from 'rxjs/internal/operators/createOperatorSubscriber';
import { noop } from 'rxjs/internal/util/noop';
import { innerFrom } from 'rxjs/internal/observable/innerFrom';
import { ObservableInput } from 'rxjs';

/**
 * Buffers the source Observable values until the closing notifier emits.
 * 
 * Collects values from the source into an array. Whenever the Observable
 * returned by the closing selector emits, the buffer is emitted and a new
 * buffer is started.
 * 
 * @template T - The type of values emitted by the source Observable
 * @param closingSelector - A function that returns an Observable that signals buffer boundary
 * @returns An operator function that returns an Observable of arrays of buffered values
 */
export function bufferWhen<T>(
  closingSelector: () => ObservableInput<unknown>
): OperatorFunction<T, T[]> {
  return operate((source, subscriber) => {
    // Current buffer collecting source values
    let buffer: T[] | null = null;
    
    // Subscription to the closing notifier
    let closingSubscriber: import('rxjs').Subscriber<unknown> | null = null;

    /**
     * Opens a new buffer and subscribes to the closing notifier.
     * When the notifier emits, emits the current buffer and starts a new one.
     */
    const openBuffer = (): void => {
      // Unsubscribe from previous closing notifier
      closingSubscriber?.unsubscribe();

      // Emit the current buffer if it exists
      const currentBuffer = buffer;
      buffer = [];
      if (currentBuffer) {
        subscriber.next(currentBuffer);
      }

      // Subscribe to new closing notifier
      innerFrom(closingSelector()).subscribe(
        closingSubscriber = createOperatorSubscriber(
          subscriber,
          openBuffer,  // On emit, close current buffer and open new one
          noop         // Ignore closing notifier errors
        )
      );
    };

    // Initialize the first buffer
    openBuffer();

    // Subscribe to source Observable
    source.subscribe(
      createOperatorSubscriber(
        subscriber,
        // On next: add value to current buffer
        (value: T) => {
          buffer?.push(value);
        },
        // On complete: emit remaining buffer and complete
        () => {
          if (buffer) {
            subscriber.next(buffer);
          }
          subscriber.complete();
        },
        // On error: propagate error (default behavior)
        undefined,
        // On finalize: clean up references
        () => {
          buffer = null;
          closingSubscriber = null;
        }
      )
    );
  });
}