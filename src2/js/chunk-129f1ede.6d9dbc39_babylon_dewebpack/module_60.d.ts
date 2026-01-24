import { Subject } from 'rxjs';
import { Subscription } from 'rxjs';
import { Observer } from 'rxjs';
import { SchedulerLike } from 'rxjs';
import { ObjectUnsubscribedError } from 'rxjs';
import { SubjectSubscription } from 'rxjs';
import { SchedulerAction } from 'rxjs';
import { ObserveOnSubscriber } from 'rxjs/internal/operators/observeOn';

/**
 * Represents a timestamped event entry in the replay buffer
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
 * @template T The type of values emitted by this ReplaySubject
 */
export declare class ReplaySubject<T> extends Subject<T> {
  /** The scheduler used for time-based operations */
  private scheduler?: SchedulerLike;
  
  /** Internal buffer storing events (with or without timestamps) */
  private _events: (T | ReplayEvent<T>)[];
  
  /** Flag indicating whether time window is infinite */
  private _infiniteTimeWindow: boolean;
  
  /** Maximum number of events to buffer */
  private _bufferSize: number;
  
  /** Time window in milliseconds for keeping events */
  private _windowTime: number;

  /**
   * Creates a new ReplaySubject instance
   * 
   * @param bufferSize - Maximum number of events to buffer (default: Infinity)
   * @param windowTime - Time window in milliseconds for keeping events (default: Infinity)
   * @param scheduler - Optional scheduler for managing time-based operations
   */
  constructor(
    bufferSize?: number,
    windowTime?: number,
    scheduler?: SchedulerLike
  );

  /**
   * Emits a value to subscribers when using infinite time window
   * 
   * @param value - The value to emit
   */
  private nextInfiniteTimeWindow(value: T): void;

  /**
   * Emits a value to subscribers when using a finite time window
   * 
   * @param value - The value to emit
   */
  private nextTimeWindow(value: T): void;

  /**
   * Internal subscription handler that replays buffered events to new subscribers
   * 
   * @param subscriber - The observer subscribing to this subject
   * @returns A subscription object
   */
  protected _subscribe(subscriber: Observer<T>): Subscription;

  /**
   * Gets the current timestamp using the scheduler or default async scheduler
   * 
   * @returns Current time in milliseconds
   */
  private _getNow(): number;

  /**
   * Trims the event buffer based on buffer size and time window constraints
   * 
   * @returns The trimmed array of events
   */
  private _trimBufferThenGetEvents(): ReplayEvent<T>[];
}