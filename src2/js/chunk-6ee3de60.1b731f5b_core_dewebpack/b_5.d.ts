/**
 * Module: Zip Operator
 * Combines multiple observables by pairing their emissions at matching indices
 */

import { Observable } from 'rxjs';
import { ObservableInput, OperatorFunction, Subscriber } from 'rxjs/types';

/**
 * Result selector function type for combining values from multiple observables
 * @template T - Array of input value types
 * @template R - Result type after transformation
 */
export type ResultSelector<T extends unknown[], R> = (...values: T) => R;

/**
 * Iterator interface for tracking iteration state
 * @template T - Type of values produced by the iterator
 */
interface ZipIterator<T = unknown> {
  /** Returns the next value from the iterator */
  next(): IteratorResult<T>;
  /** Checks if the iterator has a value available */
  hasValue?(): boolean;
  /** Checks if the iterator has completed */
  hasCompleted(): boolean;
  /** Symbol.iterator implementation */
  [Symbol.iterator](): Iterator<T>;
}

/**
 * Array-based iterator implementation
 * @template T - Type of array elements
 */
class ArrayIterator<T> implements ZipIterator<T> {
  private index: number = 0;
  private readonly length: number;

  constructor(private readonly array: T[]) {
    this.length = array.length;
  }

  [Symbol.iterator](): Iterator<T> {
    return this;
  }

  next(): IteratorResult<T> {
    const currentIndex = this.index++;
    const { array, length } = this;
    
    if (currentIndex < length) {
      return {
        value: array[currentIndex],
        done: false
      };
    }
    
    return {
      value: null as unknown as T,
      done: true
    };
  }

  hasValue(): boolean {
    return this.array.length > this.index;
  }

  hasCompleted(): boolean {
    return this.array.length === this.index;
  }
}

/**
 * Standard iterator wrapper
 * @template T - Type of values produced by the iterator
 */
class IteratorWrapper<T> implements ZipIterator<T> {
  private nextResult: IteratorResult<T>;

  constructor(private readonly iterator: Iterator<T>) {
    this.nextResult = iterator.next();
  }

  [Symbol.iterator](): Iterator<T> {
    return this;
  }

  hasValue(): boolean {
    return true;
  }

  next(): IteratorResult<T> {
    const currentResult = this.nextResult;
    this.nextResult = this.iterator.next();
    return currentResult;
  }

  hasCompleted(): boolean {
    const result = this.nextResult;
    return Boolean(result?.done);
  }
}

/**
 * Observable-based iterator for handling async sources
 * @template T - Type of values emitted by the observable
 */
class ObservableIterator<T> extends Subscriber<T> implements ZipIterator<T> {
  stillUnsubscribed: boolean = true;
  private readonly buffer: T[] = [];
  private isComplete: boolean = false;

  constructor(
    destination: Subscriber<unknown>,
    private readonly parent: ZipSubscriber<unknown>,
    private readonly observable: Observable<T>
  ) {
    super(destination);
  }

  [Symbol.iterator](): Iterator<T> {
    return this;
  }

  next(): IteratorResult<T> {
    const { buffer, isComplete } = this;
    
    if (buffer.length === 0 && isComplete) {
      return {
        value: null as unknown as T,
        done: true
      };
    }
    
    return {
      value: buffer.shift()!,
      done: false
    };
  }

  hasValue(): boolean {
    return this.buffer.length > 0;
  }

  hasCompleted(): boolean {
    return this.buffer.length === 0 && this.isComplete;
  }

  notifyComplete(): void {
    if (this.buffer.length > 0) {
      this.isComplete = true;
      this.parent.notifyInactive();
    } else {
      this.destination.complete();
    }
  }

  notifyNext(
    outerValue: unknown,
    innerValue: T,
    outerIndex: number,
    innerIndex: number,
    innerSub: Subscriber<T>
  ): void {
    this.buffer.push(innerValue);
    this.parent.checkIterators();
  }

  subscribe(subscriber: Subscriber<T>, index: number): Subscriber<T> {
    // Subscribe to the observable and return the subscription
    return this.observable.subscribe(this) as Subscriber<T>;
  }
}

/**
 * Main zip subscriber that coordinates multiple iterators
 * @template R - Result type after combining values
 */
class ZipSubscriber<R> extends Subscriber<unknown> {
  private readonly iterators: ZipIterator[] = [];
  private active: number = 0;

  constructor(
    destination: Subscriber<R>,
    private readonly resultSelector: ResultSelector<unknown[], R> | null,
    private readonly values: Record<string, unknown> = Object.create(null)
  ) {
    super(destination);
  }

  protected _next(value: unknown): void {
    const { iterators } = this;
    
    if (Array.isArray(value)) {
      iterators.push(new ArrayIterator(value));
    } else if (typeof (value as any)[Symbol.iterator] === 'function') {
      iterators.push(new IteratorWrapper((value as Iterable<unknown>)[Symbol.iterator]()));
    } else {
      iterators.push(new ObservableIterator(this.destination, this, value as Observable<unknown>));
    }
  }

  protected _complete(): void {
    const { iterators } = this;
    const iteratorCount = iterators.length;
    
    this.unsubscribe();
    
    if (iteratorCount === 0) {
      this.destination.complete();
      return;
    }
    
    this.active = iteratorCount;
    
    for (let i = 0; i < iteratorCount; i++) {
      const iterator = iterators[i];
      
      if ((iterator as ObservableIterator<unknown>).stillUnsubscribed) {
        this.destination.add((iterator as ObservableIterator<unknown>).subscribe(iterator as Subscriber<unknown>, i));
      } else {
        this.active--;
      }
    }
  }

  notifyInactive(): void {
    this.active--;
    if (this.active === 0) {
      this.destination.complete();
    }
  }

  checkIterators(): void {
    const { iterators, destination } = this;
    const iteratorCount = iterators.length;
    
    // Check if all iterators have values
    for (let i = 0; i < iteratorCount; i++) {
      const iterator = iterators[i];
      if (typeof iterator.hasValue === 'function' && !iterator.hasValue()) {
        return;
      }
    }
    
    let hasCompleted = false;
    const values: unknown[] = [];
    
    // Collect values from all iterators
    for (let i = 0; i < iteratorCount; i++) {
      const iterator = iterators[i];
      const result = iterator.next();
      
      if (iterator.hasCompleted()) {
        hasCompleted = true;
      }
      
      if (result.done) {
        destination.complete();
        return;
      }
      
      values.push(result.value);
    }
    
    if (this.resultSelector) {
      this._tryResultSelector(values);
    } else {
      destination.next(values as R);
    }
    
    if (hasCompleted) {
      destination.complete();
    }
  }

  private _tryResultSelector(values: unknown[]): void {
    let result: R;
    
    try {
      result = this.resultSelector!.apply(this, values);
    } catch (error) {
      this.destination.error(error);
      return;
    }
    
    this.destination.next(result);
  }
}

/**
 * Zip operator class
 * @template R - Result type after combining values
 */
class ZipOperator<R> implements OperatorFunction<unknown, R> {
  constructor(private readonly resultSelector?: ResultSelector<unknown[], R>) {}

  call(subscriber: Subscriber<R>, source: Observable<unknown>): Subscriber<unknown> {
    return source.subscribe(new ZipSubscriber(subscriber, this.resultSelector ?? null));
  }
}

/**
 * Combines multiple observables to create an observable whose values are calculated
 * from the values, in order, of each of its input observables.
 *
 * @template T - Types of input observables
 * @template R - Result type after optional transformation
 * @param {...ObservableInput<T>[]} observables - Input observables to zip together
 * @returns {Observable<T[] | R>} Observable that emits arrays of values or transformed results
 *
 * @example
 *