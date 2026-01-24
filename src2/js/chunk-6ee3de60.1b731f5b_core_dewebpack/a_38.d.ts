import { Operator } from 'rxjs/Operator';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs/Subscriber';
import { OuterSubscriber } from 'rxjs/OuterSubscriber';
import { Subscription } from 'rxjs/Subscription';

/**
 * Returns an Observable that mirrors the first source Observable to emit an item.
 * 
 * @template T The type of items emitted by the observables
 * @param observables The observables to race
 * @returns An Observable that emits the same items as the first Observable to emit
 * 
 * @example
 * const first = timer(500).pipe(mapTo('first'));
 * const second = timer(300).pipe(mapTo('second'));
 * race(first, second).subscribe(x => console.log(x)); // 'second'
 */
export function race<T>(...observables: Array<Observable<T> | Array<Observable<T>>>): Observable<T>;

/**
 * Operator class that implements the race logic.
 * Subscribes to all source observables and mirrors the first one to emit.
 * 
 * @template T The type of items emitted
 */
declare class RaceOperator<T> implements Operator<T, T> {
    /**
     * Applies the race operator to a subscriber.
     * 
     * @param subscriber The subscriber to receive values
     * @param source The source observable
     * @returns A subscription to the race operation
     */
    call(subscriber: Subscriber<T>, source: Observable<T>): Subscription;
}

/**
 * Subscriber that collects observables and races them when complete.
 * 
 * @template T The type of items in the observables
 */
declare class RaceSubscriber<T> extends OuterSubscriber<Observable<T>, T> {
    /** Whether the first observable to emit has been determined */
    private hasFirst: boolean;
    
    /** Array of observables to race */
    private observables: Array<Observable<T>> | null;
    
    /** Array of subscriptions to all racing observables */
    private subscriptions: Subscription[] | null;

    /**
     * Creates a race subscriber.
     * 
     * @param destination The destination subscriber
     */
    constructor(destination: Subscriber<T>);

    /**
     * Collects incoming observables to race.
     * 
     * @param observable The observable to add to the race
     */
    protected _next(observable: Observable<T>): void;

    /**
     * Called when no more observables will be added.
     * Subscribes to all collected observables and starts the race.
     */
    protected _complete(): void;

    /**
     * Called when one of the racing observables emits a value.
     * Unsubscribes from all other observables and forwards the winner's values.
     * 
     * @param outerValue The outer observable that emitted
     * @param innerValue The value emitted by the winning observable
     * @param outerIndex The index of the winning observable
     * @param innerIndex The index of the emitted value
     * @param innerSub The inner subscription
     */
    notifyNext(
        outerValue: Observable<T>,
        innerValue: T,
        outerIndex: number,
        innerIndex: number,
        innerSub: Subscription
    ): void;
}