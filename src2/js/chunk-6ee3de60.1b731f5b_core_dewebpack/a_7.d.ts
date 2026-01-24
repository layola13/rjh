/**
 * Observable subscriber that forwards notifications from inner observables to the destination.
 * This class extends a base Subscriber and implements notification handlers for nested subscriptions.
 * 
 * @template T - The type of values emitted by the observable
 * @template R - The type of values emitted by inner observables
 */
export class InnerSubscriber<T, R> extends Subscriber<T> {
    /**
     * Handles next notifications from inner observables.
     * Forwards the inner value directly to the destination observer.
     * 
     * @param outerValue - The value from the outer observable
     * @param innerValue - The value from the inner observable to be forwarded
     * @param outerIndex - The index of the outer observable emission
     * @param innerIndex - The index of the inner observable emission
     * @param innerSub - The inner subscription instance
     */
    notifyNext(
        outerValue: T,
        innerValue: R,
        outerIndex: number,
        innerIndex: number,
        innerSub: InnerSubscription<T, R>
    ): void {
        this.destination.next(innerValue);
    }

    /**
     * Handles error notifications from inner observables.
     * Forwards the error to the destination observer.
     * 
     * @param error - The error that occurred
     * @param innerSub - The inner subscription that emitted the error
     */
    notifyError(error: Error, innerSub: InnerSubscription<T, R>): void {
        this.destination.error(error);
    }

    /**
     * Handles completion notifications from inner observables.
     * Forwards the completion signal to the destination observer.
     * 
     * @param innerSub - The inner subscription that completed
     */
    notifyComplete(innerSub: InnerSubscription<T, R>): void {
        this.destination.complete();
    }
}

/**
 * Represents a subscription to an inner observable in a nested subscription scenario.
 * 
 * @template T - The type of the outer observable
 * @template R - The type of the inner observable
 */
interface InnerSubscription<T, R> {
    unsubscribe(): void;
}