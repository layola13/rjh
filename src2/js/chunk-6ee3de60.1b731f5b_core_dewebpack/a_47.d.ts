import { Subject } from './Subject';
import { Subscription } from './Subscription';
import { Observer } from './Observer';

/**
 * AsyncSubject is a variant of Subject that only emits a value when it completes.
 * It will emit its latest value to all its observers on completion.
 * 
 * @template T The type of the elements handled by the subject.
 * 
 * @example
 * const subject = new AsyncSubject<number>();
 * subject.subscribe(value => console.log(value));
 * subject.next(1);
 * subject.next(2);
 * subject.complete(); // Outputs: 2
 */
export declare class AsyncSubject<T> extends Subject<T> {
    /**
     * The latest value received via next()
     */
    private value: T | null;
    
    /**
     * Flag indicating whether at least one value has been received
     */
    private hasNext: boolean;
    
    /**
     * Flag indicating whether the subject has completed
     */
    private hasCompleted: boolean;

    constructor();

    /**
     * Subscribes an observer to the AsyncSubject.
     * If the subject has already errored, the error is immediately sent to the observer.
     * If the subject has completed and has a value, the value is sent followed by completion.
     * 
     * @param observer The observer to subscribe
     * @returns A subscription object that can be used to unsubscribe
     */
    protected _subscribe(observer: Observer<T>): Subscription;

    /**
     * Stores the latest value. The value is only emitted when complete() is called.
     * 
     * @param value The value to store
     */
    next(value: T): void;

    /**
     * Sends an error notification to all observers if not yet completed.
     * 
     * @param error The error to send
     */
    error(error: unknown): void;

    /**
     * Marks the subject as complete and emits the last stored value (if any) to all observers.
     */
    complete(): void;
}