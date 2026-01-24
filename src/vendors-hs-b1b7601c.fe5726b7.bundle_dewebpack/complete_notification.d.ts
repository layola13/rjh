/**
 * Notification kinds for Observable streams
 * 'N' = Next value
 * 'E' = Error
 * 'C' = Complete
 */
type NotificationKind = 'N' | 'E' | 'C';

/**
 * Represents a notification emitted by an Observable
 * @template T The type of the value being notified
 */
interface ObservableNotification<T = unknown> {
  /**
   * The kind of notification: 'N' for next, 'E' for error, 'C' for complete
   */
  kind: NotificationKind;
  
  /**
   * The value for 'next' notifications, undefined otherwise
   */
  value: T | undefined;
  
  /**
   * The error for 'error' notifications, undefined otherwise
   */
  error: unknown | undefined;
}

/**
 * Pre-defined complete notification singleton
 * Indicates that an Observable has completed successfully
 */
export const COMPLETE_NOTIFICATION: ObservableNotification<never>;

/**
 * Creates an error notification
 * @template T The type of the Observable stream
 * @param error The error that occurred
 * @returns An error notification object
 */
export function errorNotification<T = never>(error: unknown): ObservableNotification<T>;

/**
 * Creates a next notification with a value
 * @template T The type of the value being emitted
 * @param value The value to emit
 * @returns A next notification object containing the value
 */
export function nextNotification<T>(value: T): ObservableNotification<T>;

/**
 * Generic factory function for creating notifications
 * @template T The type of the value
 * @param kind The notification kind ('N', 'E', or 'C')
 * @param value The value for next notifications
 * @param error The error for error notifications
 * @returns A notification object
 */
export function createNotification<T>(
  kind: NotificationKind,
  value: T | undefined,
  error: unknown | undefined
): ObservableNotification<T>;