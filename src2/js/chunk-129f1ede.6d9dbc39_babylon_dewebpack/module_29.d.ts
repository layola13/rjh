/**
 * Notification kind discriminator
 * - "N": Next notification with a value
 * - "E": Error notification with an error
 * - "C": Complete notification
 */
export type NotificationKind = "N" | "E" | "C";

/**
 * Observer interface for consuming notifications
 */
export interface Observer<T> {
  /**
   * Handler for next value notifications
   */
  next?: (value: T) => void;
  
  /**
   * Handler for error notifications
   */
  error?: (error: any) => void;
  
  /**
   * Handler for completion notifications
   */
  complete?: () => void;
}

/**
 * Observable interface representing a stream of values
 */
export interface Observable<T> {
  // Observable implementation details
}

/**
 * Represents a notification event emitted by an Observable.
 * Encapsulates the type of notification (next, error, or complete) along with associated data.
 * 
 * @template T The type of value contained in next notifications
 */
export declare class Notification<T> {
  /**
   * The kind of notification
   */
  readonly kind: NotificationKind;
  
  /**
   * The value for next notifications (undefined for error/complete)
   */
  readonly value?: T;
  
  /**
   * The error for error notifications (undefined for next/complete)
   */
  readonly error?: any;
  
  /**
   * Indicates whether this notification has a value (true for "N" notifications)
   */
  readonly hasValue: boolean;

  /**
   * Singleton instance for complete notifications
   */
  static readonly completeNotification: Notification<never>;
  
  /**
   * Singleton instance for next notifications with undefined value
   */
  static readonly undefinedValueNotification: Notification<undefined>;

  /**
   * Creates a new Notification instance
   * 
   * @param kind - The type of notification
   * @param value - The value for next notifications
   * @param error - The error for error notifications
   */
  constructor(kind: NotificationKind, value?: T, error?: any);

  /**
   * Delivers the notification to an observer by calling the appropriate handler
   * 
   * @param observer - The observer to notify
   * @returns The result of the invoked handler, or void
   */
  observe(observer: Observer<T>): void;

  /**
   * Executes the appropriate callback based on notification kind
   * 
   * @param nextHandler - Callback for next notifications
   * @param errorHandler - Callback for error notifications
   * @param completeHandler - Callback for complete notifications
   * @returns The result of the invoked handler, or void
   */
  do(
    nextHandler?: (value: T) => void,
    errorHandler?: (error: any) => void,
    completeHandler?: () => void
  ): void;

  /**
   * Accepts either an observer or individual callback functions
   * 
   * @param observerOrNext - An observer object or next handler function
   * @param errorHandler - Optional error handler function
   * @param completeHandler - Optional complete handler function
   * @returns The result of the notification delivery
   */
  accept(
    observerOrNext: Observer<T> | ((value: T) => void),
    errorHandler?: (error: any) => void,
    completeHandler?: () => void
  ): void;

  /**
   * Converts this notification to an Observable that emits the notification
   * 
   * @returns An Observable representation of this notification
   * @throws Error if notification kind is invalid
   */
  toObservable(): Observable<T>;

  /**
   * Creates a next notification with the given value
   * 
   * @param value - The value to emit
   * @returns A new Notification instance or the singleton for undefined
   */
  static createNext<T>(value: T): Notification<T>;

  /**
   * Creates an error notification with the given error
   * 
   * @param error - The error to emit
   * @returns A new Notification instance
   */
  static createError<T>(error: any): Notification<T>;

  /**
   * Creates a complete notification
   * 
   * @returns The singleton complete notification instance
   */
  static createComplete<T>(): Notification<T>;
}

export { Notification as a };