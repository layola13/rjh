import { scheduled } from './scheduled';
import { innerFrom } from './innerFrom';

export function from<T>(
  input: ObservableInput<T>,
  scheduler?: SchedulerLike
): Observable<T> {
  return scheduler ? scheduled(input, scheduler) : innerFrom(input);
}

type ObservableInput<T> = 
  | Observable<T>
  | Iterable<T>
  | AsyncIterable<T>
  | Promise<T>
  | ArrayLike<T>
  | ReadableStreamLike<T>;

interface SchedulerLike {
  now(): number;
  schedule<T>(
    work: (this: SchedulerAction<T>, state?: T) => void,
    delay?: number,
    state?: T
  ): Subscription;
}

interface SchedulerAction<T> extends Subscription {
  schedule(state?: T, delay?: number): Subscription;
}

interface Subscription {
  unsubscribe(): void;
  readonly closed: boolean;
}

interface Observable<T> {
  subscribe(observer?: Partial<Observer<T>>): Subscription;
}

interface Observer<T> {
  next: (value: T) => void;
  error: (err: unknown) => void;
  complete: () => void;
}

interface ReadableStreamLike<T> {
  getReader(): ReadableStreamDefaultReaderLike<T>;
}

interface ReadableStreamDefaultReaderLike<T> {
  read(): Promise<ReadableStreamDefaultReadResultLike<T>>;
  releaseLock(): void;
}

interface ReadableStreamDefaultReadResultLike<T> {
  readonly done: boolean;
  readonly value: T;
}