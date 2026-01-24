/**
 * RxJS Observable delay/schedule operator module
 * Provides functionality for scheduling notifications with optional delays
 */

import { MonoTypeOperatorFunction, SchedulerLike, Subscriber, Subscription, TeardownLogic } from 'rxjs';
import { Notification } from 'rxjs/internal/Notification';

/**
 * Returns an operator that delays emissions from the source Observable
 * @template T - The type of items emitted by the Observable
 * @param scheduler - The scheduler to use for delaying emissions
 * @param delay - The delay duration in milliseconds (default: 0)
 * @returns A function that returns an Observable that delays emissions
 */
export function b<T>(scheduler: SchedulerLike, delay?: number): MonoTypeOperatorFunction<T>;

/**
 * Subscriber class that schedules notifications with delay
 * @template T - The type of items being observed
 */
export class a<T> extends Subscriber<T> {
  /**
   * Creates a new scheduled notification subscriber
   * @param destination - The destination subscriber
   * @param scheduler - The scheduler to use for delaying
   * @param delay - The delay duration in milliseconds (default: 0)
   */
  constructor(destination: Subscriber<T>, scheduler: SchedulerLike, delay?: number);

  /**
   * Static dispatch method called by the scheduler
   * @param state - The dispatch state containing notification and destination
   */
  static dispatch(state: DispatchState<any>): void;

  /**
   * Schedules a notification message to be delivered after the configured delay
   * @param notification - The notification to schedule
   */
  protected scheduleMessage(notification: Notification<T>): void;

  /**
   * Handles next value from the source Observable
   * @param value - The emitted value
   */
  protected _next(value: T): void;

  /**
   * Handles error from the source Observable
   * @param error - The error that occurred
   */
  protected _error(error: any): void;

  /**
   * Handles completion of the source Observable
   */
  protected _complete(): void;

  /** The scheduler instance used for delaying notifications */
  protected scheduler: SchedulerLike;

  /** The delay duration in milliseconds */
  protected delay: number;
}

/**
 * Internal state object passed to the scheduler's dispatch method
 * @template T - The type of notification payload
 */
interface DispatchState<T> {
  /** The notification to be dispatched */
  notification: Notification<T>;
  /** The destination subscriber to receive the notification */
  destination: Subscriber<T>;
}

/**
 * Operator class that implements the delay scheduling logic
 * @template T - The type of items flowing through the operator
 */
declare class DelayScheduleOperator<T> {
  /**
   * Creates a new delay schedule operator
   * @param scheduler - The scheduler to use
   * @param delay - The delay duration in milliseconds (default: 0)
   */
  constructor(scheduler: SchedulerLike, delay?: number);

  /**
   * Applies the operator to a subscriber
   * @param subscriber - The destination subscriber
   * @param source - The source Observable
   * @returns The subscription
   */
  call(subscriber: Subscriber<T>, source: any): TeardownLogic;

  /** The scheduler instance */
  scheduler: SchedulerLike;

  /** The delay duration in milliseconds */
  delay: number;
}