import { Subject } from 'rxjs';
import { Scheduler } from 'rxjs/internal/Scheduler';
import { Observer } from 'rxjs/internal/types';
import { Subscription } from 'rxjs/internal/Subscription';
import { SubjectSubscription } from 'rxjs/internal/SubjectSubscription';
import { ObjectUnsubscribedError } from 'rxjs/internal/util/ObjectUnsubscribedError';
import { Subscriber } from 'rxjs/internal/Subscriber';

/**
 * Represents a timestamped event in the replay buffer
 */
interface ReplayEvent<T> {
  /** The timestamp when the event was recorded */
  time: number;
  /** The actual event value */
  value: T;
}

/**
 * A variant of Subject that "replays" or emits old values to new subscribers.
 * It buffers a set number of values and will emit those values immediately to
 * any new subscribers in addition to emitting new values to existing subscribers.
 * 
 * @template T The type of values emitted by this subject
 */
export declare class ReplaySubject<T> extends Subject<T> {
  /**
   * The optional scheduler for coordinating event timing
   */
  readonly scheduler?: Scheduler;

  /**
   * Internal buffer storing replay events
   */
  private _events: Array<T | ReplayEvent<T>>;

  /**
   * Flag indicating if time window is infinite
   */
  private _infiniteTimeWindow: boolean;

  /**
   * Maximum number of values to buffer
   */
  private _bufferSize: number;

  /**
   * Time window in milliseconds for which to buffer values
   */
  private _windowTime: number;

  /**
   * Creates a ReplaySubject instance
   * 
   * @param bufferSize - Maximum number of values to replay (default: Infinity)
   * @param windowTime - Time window in milliseconds to keep values (default: Infinity)
   * @param scheduler - Optional scheduler for managing event timing
   */
  constructor(
    bufferSize?: number,
    windowTime?: number,
    scheduler?: Scheduler
  );

  /**
   * Emits next value when using infinite time window
   * 
   * @param value - The value to emit
   */
  protected nextInfiniteTimeWindow(value: T): void;

  /**
   * Emits next value when using finite time window
   * 
   * @param value - The value to emit
   */
  protected nextTimeWindow(value: T): void;

  /**
   * Handles subscription logic, replaying buffered events to new subscribers
   * 
   * @param subscriber - The observer subscribing to this subject
   * @returns Subscription for managing the observer connection
   * @throws ObjectUnsubscribedError if subject is closed
   */
  protected _subscribe(subscriber: Subscriber<T>): Subscription;

  /**
   * Gets current timestamp from scheduler or default time source
   * 
   * @returns Current timestamp in milliseconds
   */
  private _getNow(): number;

  /**
   * Trims expired events from buffer based on time window and size constraints
   * 
   * @returns Array of valid buffered events
   */
  private _trimBufferThenGetEvents(): Array<ReplayEvent<T>>;
}