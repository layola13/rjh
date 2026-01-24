import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { SubjectLike } from 'rxjs';

/**
 * ConnectableObservable is a variant of Observable that shares a single subscription 
 * to the underlying source. It's a multicast observable that allows multiple subscribers
 * to share the same execution path.
 * 
 * @template T The type of items emitted by the observable
 * 
 * @remarks
 * The ConnectableObservable does not begin emitting items from its source Observable 
 * until its connect() method is called. This allows you to wait for all intended 
 * subscribers to subscribe before the Observable begins emitting items.
 * 
 * @see {@link https://rxjs.dev/api/index/class/ConnectableObservable}
 */
export declare class ConnectableObservable<T> extends Observable<T> {
    /**
     * The source observable that this ConnectableObservable wraps
     */
    readonly source: Observable<T>;
    
    /**
     * Factory function that creates a new Subject for multicasting
     */
    readonly subjectFactory: () => SubjectLike<T>;
    
    /**
     * Internal reference to the current subject used for multicasting
     * @internal
     */
    protected _subject: SubjectLike<T> | null;
    
    /**
     * Number of active subscriptions (used for reference counting)
     * @internal
     */
    protected _refCount: number;
    
    /**
     * The subscription to the source observable
     * @internal
     */
    protected _connection: Subscription | null;
    
    /**
     * Creates a new ConnectableObservable
     * 
     * @param source - The source observable to multicast
     * @param subjectFactory - Factory function that creates the subject for multicasting
     */
    constructor(source: Observable<T>, subjectFactory: () => SubjectLike<T>);
    
    /**
     * Subscribes to the internal subject
     * @internal
     */
    protected _subscribe(subscriber: any): Subscription;
    
    /**
     * Gets the current subject, creating a new one if necessary
     * 
     * @returns The subject used for multicasting
     */
    getSubject(): SubjectLike<T>;
    
    /**
     * Tears down the connection and resets internal state
     * @internal
     */
    protected _teardown(): void;
    
    /**
     * Connects the ConnectableObservable to its source and begins multicasting values.
     * 
     * @returns A subscription that can be used to disconnect from the source
     * 
     * @remarks
     * This method must be called to start the execution of the source observable.
     * Multiple calls to connect() will return the same subscription until it's unsubscribed.
     */
    connect(): Subscription;
    
    /**
     * Returns an Observable that automatically connects to this ConnectableObservable 
     * when the first subscriber arrives, and disconnects when the last subscriber unsubscribes.
     * 
     * @returns An Observable with automatic connection management
     * 
     * @remarks
     * This method applies reference counting to automatically manage the connection lifecycle.
     */
    refCount(): Observable<T>;
}