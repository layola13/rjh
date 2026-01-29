export function hasLift(source: unknown): source is { lift: Function } {
  return isFunction(source?.lift);
}

export function operate<T, R>(
  init: (subscriber: Subscriber<R>, source: Observable<T>) => void
): (source: Observable<T>) => Observable<R> {
  return (source: Observable<T>): Observable<R> => {
    if (hasLift(source)) {
      return source.lift(function(this: Subscriber<R>, subscriber: Subscriber<R>): void {
        try {
          init(subscriber, this as unknown as Observable<T>);
        } catch (error) {
          subscriber.error(error);
        }
      });
    }
    throw new TypeError("Unable to lift unknown Observable type");
  };
}

function isFunction(value: unknown): value is Function {
  return typeof value === 'function';
}

interface Subscriber<T> {
  error(error: unknown): void;
}

interface Observable<T> {
  lift<R>(operator: (subscriber: Subscriber<R>) => void): Observable<R>;
}