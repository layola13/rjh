/**
 * Notification kinds for observable streams
 */
export type NotificationKind = 'N' | 'E' | 'C';

/**
 * Observer interface for handling notification events
 */
export interface Observer<T> {
  /** Called when a next value is emitted */
  next?(value: T): void;
  /** Called when an error occurs */
  error?(error: unknown): void;
  /** Called when the stream completes */
  complete?(): void;
}

/**
 * Represents a notification event in an observable stream.
 * Can be one of three types:
 * - Next ('N'): Emits a value
 * - Error ('E'): Emits an error
 * - Complete ('C'): Signals completion
 */
export declare class Notification<T> {
  /** The kind of notification: 'N' (next), 'E' (error), or 'C' (complete) */
  readonly kind: NotificationKind;
  
  /** The value carried by a 'next' notification */
  readonly value?: T;
  
  /** The error carried by an 'error' notification */
  readonly error?: unknown;
  
  /** Indicates whether this notification carries a value */
  readonly hasValue: boolean;

  /**
   * Creates a new Notification instance
   * @param kind - The notification type
   * @param value - Optional value for 'next' notifications
   * @param error - Optional error for 'error' notifications
   */
  constructor(kind: NotificationKind, value?: T, error?: unknown);

  /**
   * Delivers the notification to an observer by calling the appropriate method
   * @param observer - The observer to notify
   * @returns The result of calling the observer method
   */
  observe(observer: Observer<T>): void;

  /**
   * Executes the appropriate callback based on the notification kind
   * @param nextHandler - Callback for 'next' notifications
   * @param errorHandler - Callback for 'error' notifications
   * @param completeHandler - Callback for 'complete' notifications
   * @returns The result of the executed callback
   */
  do(
    nextHandler?: (value: T) => void,
    errorHandler?: (error: unknown) => void,
    completeHandler?: () => void
  ): void;

  /**
   * Accepts either an observer object or individual callback functions
   * @param observerOrNext - Observer object or next callback
   * @param errorHandler - Optional error callback
   * @param completeHandler - Optional complete callback
   * @returns The result of handling the notification
   */
  accept(
    observerOrNext?: Observer<T> | ((value: T) => void),
    errorHandler?: (error: unknown) => void,
    completeHandler?: () => void
  ): void;

  /**
   * Converts this notification to an Observable
   * @returns An Observable that emits according to this notification
   * @throws Error if the notification kind is invalid
   */
  toObservable(): Observable<T>;

  /**
   * Creates a 'next' notification with the given value
   * @param value - The value to emit
   * @returns A new Notification instance
   */
  static createNext<T>(value: T): Notification<T>;

  /**
   * Creates an 'error' notification with the given error
   * @param error - The error to emit
   * @returns A new Notification instance
   */
  static createError<T>(error: unknown): Notification<T>;

  /**
   * Creates a 'complete' notification
   * @returns A singleton complete notification instance
   */
  static createComplete<T>(): Notification<T>;

  /**
   * Singleton instance for complete notifications
   */
  static readonly completeNotification: Notification<never>;

  /**
   * Singleton instance for undefined value notifications
   */
  static readonly undefinedValueNotification: Notification<undefined>;
}

/**
 * Observable type reference (imported from external module)
 */
export interface Observable<T> {
  // Observable interface from RxJS or similar library
}