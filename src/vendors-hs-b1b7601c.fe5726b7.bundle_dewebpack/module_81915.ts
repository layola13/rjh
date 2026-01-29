import { scheduleAsyncIterable } from './scheduleAsyncIterable';
import { readableStreamLikeToAsyncGenerator } from './readableStreamLikeToAsyncGenerator';

export function scheduleReadableStreamLike<T>(
    stream: ReadableStream<T>,
    scheduler: SchedulerLike
): Observable<T> {
    return scheduleAsyncIterable(
        readableStreamLikeToAsyncGenerator(stream),
        scheduler
    );
}

interface SchedulerLike {
    schedule<T>(work: (this: SchedulerAction<T>, state?: T) => void, delay?: number, state?: T): Subscription;
}

interface SchedulerAction<T> {
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
    next(value: T): void;
    error(err: unknown): void;
    complete(): void;
}