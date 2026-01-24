/**
 * RxJS groupBy operator - Groups observable emissions by key selector
 * @module groupBy
 */

import { Operator } from './Operator';
import { Subscriber } from './Subscriber';
import { Observable } from './Observable';
import { Subject } from './Subject';
import { Subscription } from './Subscription';
import { OuterSubscriber } from './OuterSubscriber';
import { InnerSubscriber } from './InnerSubscriber';

/**
 * Key selector function type
 * @template T Source value type
 * @template K Key type
 */
export type KeySelector<T, K> = (value: T) => K;

/**
 * Element selector function type
 * @template T Source value type
 * @template E Element type
 */
export type ElementSelector<T, E> = (value: T) => E;

/**
 * Duration selector function type
 * @template K Key type
 */
export type DurationSelector<K> = (grouped: GroupedObservable<K, any>) => Observable<any>;

/**
 * Subject factory function type
 */
export type SubjectSelector<E> = () => Subject<E>;

/**
 * Grouped observable with associated key
 * @template K Key type
 * @template T Value type
 */
export declare class GroupedObservable<K, T> extends Observable<T> {
  /** The key associated with this group */
  readonly key: K;
  
  /** The subject managing group emissions */
  private readonly groupSubject: Subject<T>;
  
  /** Reference count subscription for cleanup */
  private readonly refCountSubscription: RefCountSubscription | null;

  constructor(
    key: K,
    groupSubject: Subject<T>,
    refCountSubscription?: RefCountSubscription
  );

  protected _subscribe(subscriber: Subscriber<T>): Subscription;
}

/**
 * Reference counting subscription for group lifecycle management
 */
declare class RefCountSubscription extends Subscription {
  /** Number of active subscriptions */
  count: number;
  
  /** Whether unsubscribe was attempted */
  attemptedToUnsubscribe: boolean;

  unsubscribe(): void;
}

/**
 * Inner subscription that decrements ref count on unsubscribe
 */
declare class RefCountInnerSubscription extends Subscription {
  private parent: RefCountSubscription;

  constructor(parent: RefCountSubscription);

  unsubscribe(): void;
}

/**
 * Operator implementation for groupBy
 * @template T Source value type
 * @template K Key type
 * @template E Element type
 */
declare class GroupByOperator<T, K, E> implements Operator<T, GroupedObservable<K, E>> {
  constructor(
    keySelector: KeySelector<T, K>,
    elementSelector?: ElementSelector<T, E> | null,
    durationSelector?: DurationSelector<K> | null,
    subjectSelector?: SubjectSelector<E> | null
  );

  call(subscriber: Subscriber<GroupedObservable<K, E>>, source: Observable<T>): Subscriber<T>;
}

/**
 * Subscriber that handles grouping logic
 * @template T Source value type
 * @template K Key type
 * @template E Element type
 */
declare class GroupBySubscriber<T, K, E> extends Subscriber<T> implements RefCountSubscription {
  private keySelector: KeySelector<T, K>;
  private elementSelector?: ElementSelector<T, E> | null;
  private durationSelector?: DurationSelector<K> | null;
  private subjectSelector?: SubjectSelector<E> | null;
  
  /** Map of active groups by key */
  private groups: Map<K, Subject<E>> | null;
  
  /** Whether unsubscribe was attempted */
  attemptedToUnsubscribe: boolean;
  
  /** Number of active group subscriptions */
  count: number;

  constructor(
    destination: Subscriber<GroupedObservable<K, E>>,
    keySelector: KeySelector<T, K>,
    elementSelector?: ElementSelector<T, E> | null,
    durationSelector?: DurationSelector<K> | null,
    subjectSelector?: SubjectSelector<E> | null
  );

  protected _next(value: T): void;

  /**
   * Groups value by key and emits to appropriate group
   */
  private _group(value: T, key: K): void;

  protected _error(error: Error): void;

  protected _complete(): void;

  /**
   * Removes a group when its duration completes
   */
  removeGroup(key: K): void;

  unsubscribe(): void;
}

/**
 * Subscriber that handles group duration completion
 * @template K Key type
 * @template E Element type
 */
declare class GroupDurationSubscriber<K, E> extends Subscriber<any> {
  private key: K;
  private group: Subject<E>;
  private parent: GroupBySubscriber<any, K, E>;

  constructor(
    key: K,
    group: Subject<E>,
    parent: GroupBySubscriber<any, K, E>
  );

  protected _next(value: any): void;

  protected _unsubscribe(): void;
}

/**
 * Groups observable emissions by computed key
 * 
 * @template T Source value type
 * @template K Key type
 * @template E Element type (defaults to T)
 * 
 * @param keySelector Function to compute group key for each value
 * @param elementSelector Optional function to transform values before grouping
 * @param durationSelector Optional function returning observable that determines group lifetime
 * @param subjectSelector Optional factory for custom Subject implementation per group
 * 
 * @returns Operator function that returns observable of grouped observables
 * 
 * @example
 *