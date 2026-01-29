import { operate } from 'rxjs/internal/operators/operate';
import { createOperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';
import { noop } from 'rxjs/internal/util/noop';
import { innerFrom } from 'rxjs/internal/observable/innerFrom';
import { Observable, ObservableInput, OperatorFunction } from 'rxjs';

/**
 * Returns an Observable that emits all items emitted by the source Observable that are distinct by comparison from previous items.
 * 
 * @template T The type of items emitted by the source Observable
 * @template K The type of the key used for comparison
 * @param keySelector Optional function to select which value to check for distinctness. If not provided, the emitted value itself is used.
 * @param flushes Optional Observable that triggers clearing the set of tracked distinct values.
 * @returns An operator function that returns an Observable that emits distinct values.
 */
export function distinct<T, K = T>(
    keySelector?: (value: T) => K,
    flushes?: ObservableInput<unknown>
): OperatorFunction<T, T> {
    return operate((source: Observable<T>, subscriber) => {
        const seenValues = new Set<K | T>();
        
        source.subscribe(
            createOperatorSubscriber(subscriber, (value: T) => {
                const key = keySelector ? keySelector(value) : value;
                
                if (!seenValues.has(key)) {
                    seenValues.add(key);
                    subscriber.next(value);
                }
            })
        );
        
        if (flushes) {
            innerFrom(flushes).subscribe(
                createOperatorSubscriber(
                    subscriber,
                    () => seenValues.clear(),
                    noop
                )
            );
        }
    });
}