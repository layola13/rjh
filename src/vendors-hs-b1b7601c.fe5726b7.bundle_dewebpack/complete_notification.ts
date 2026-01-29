export type NotificationKind = "C" | "E" | "N";

export interface Notification<T> {
  kind: NotificationKind;
  value: T | undefined;
  error: unknown | undefined;
}

export const COMPLETE_NOTIFICATION: Notification<undefined> = createNotification("C", undefined, undefined);

export function errorNotification<T = never>(error: unknown): Notification<T> {
  return createNotification("E", undefined, error);
}

export function nextNotification<T>(value: T): Notification<T> {
  return createNotification("N", value, undefined);
}

export function createNotification<T>(
  kind: NotificationKind,
  value: T | undefined,
  error: unknown | undefined
): Notification<T> {
  return {
    kind,
    value,
    error
  };
}