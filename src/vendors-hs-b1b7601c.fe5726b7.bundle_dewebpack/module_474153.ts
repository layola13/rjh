import { Observable } from 'rxjs';
import { isFunction } from 'rxjs/internal/util/isFunction';
import { mapOneOrManyArgs } from 'rxjs/internal/operators/mapOneOrManyArgs';

/**
 * Creates an Observable from an arbitrary API for registering event handlers.
 * 
 * @param addHandler - A function that attaches a handler function to the underlying event source
 * @param removeHandler - An optional function that removes the handler from the event source
 * @param resultSelector - An optional function to transform the event arguments
 * @returns An Observable that emits events from the registered handler
 */
export function fromEventPattern<T>(
  addHandler: (handler: (...args: any[]) => void) => any,
  removeHandler?: (handler: (...args: any[]) => void, signal?: any) => void,
  resultSelector?: (...args: any[]) => T
): Observable<T> {
  if (resultSelector) {
    return fromEventPattern(addHandler, removeHandler).pipe(
      mapOneOrManyArgs(resultSelector)
    );
  }

  return new Observable<T>((subscriber) => {
    const handler = (...eventArgs: any[]): void => {
      const value = eventArgs.length === 1 ? eventArgs[0] : eventArgs;
      subscriber.next(value);
    };

    const signal = addHandler(handler);

    return isFunction(removeHandler)
      ? (): void => {
          removeHandler(handler, signal);
        }
      : undefined;
  });
}