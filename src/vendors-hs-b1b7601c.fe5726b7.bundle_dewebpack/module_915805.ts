import { Subject, Observable, OperatorFunction, SubjectLike, ObservableInput } from 'rxjs';

/**
 * Configuration options for the connect operator
 */
interface ConnectConfig<T> {
  connector: () => SubjectLike<T>;
}

/**
 * Default configuration for connect operator
 */
const DEFAULT_CONFIG: ConnectConfig<any> = {
  connector: function <T>(): SubjectLike<T> {
    return new Subject<T>();
  }
};

/**
 * Creates a connection between a source Observable and a Subject,
 * allowing for multicast behavior with custom setup logic.
 *
 * @template T The type of values emitted by the source Observable
 * @template R The type of values emitted by the result Observable
 * @param selector Function that receives the shared Subject and returns an Observable
 * @param config Configuration object with connector factory
 * @returns An OperatorFunction that connects the source through a Subject
 */
export function connect<T, R>(
  selector: (shared: Observable<T>) => ObservableInput<R>,
  config: ConnectConfig<T> = DEFAULT_CONFIG
): OperatorFunction<T, R> {
  const { connector } = config;

  return operate<T, R>((source: Observable<T>, subscriber: Subscriber<R>) => {
    const subject = connector();
    
    const resultObservable = innerFrom(selector(fromSubscribable(subject)));
    resultObservable.subscribe(subscriber);
    
    subscriber.add(source.subscribe(subject));
  });
}

/**
 * Helper function that creates an operator
 */
function operate<T, R>(
  init: (source: Observable<T>, subscriber: Subscriber<R>) => void
): OperatorFunction<T, R> {
  return (source: Observable<T>) => {
    return new Observable<R>((subscriber) => {
      init(source, subscriber);
    });
  };
}

/**
 * Converts various input types to Observable
 */
function innerFrom<T>(input: ObservableInput<T>): Observable<T> {
  if (input instanceof Observable) {
    return input;
  }
  // Additional conversion logic would be implemented here
  return new Observable<T>((subscriber) => {
    const subscription = (input as any).subscribe(subscriber);
    return subscription;
  });
}

/**
 * Creates an Observable from a Subscribable
 */
function fromSubscribable<T>(subscribable: SubjectLike<T>): Observable<T> {
  return new Observable<T>((subscriber) => {
    return subscribable.subscribe(subscriber);
  });
}

/**
 * Subscriber interface
 */
interface Subscriber<T> {
  next(value: T): void;
  error(err: any): void;
  complete(): void;
  add(teardown: any): void;
}