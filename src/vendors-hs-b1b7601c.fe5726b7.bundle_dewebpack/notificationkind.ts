export enum NotificationKind {
  NEXT = "N",
  ERROR = "E",
  COMPLETE = "C"
}

export interface Observer<T> {
  next?: (value: T) => void;
  error?: (err: unknown) => void;
  complete?: () => void;
}

export class Notification<T> {
  public readonly hasValue: boolean;
  
  static readonly completeNotification = new Notification<never>(NotificationKind.COMPLETE);

  constructor(
    public readonly kind: NotificationKind,
    public readonly value?: T,
    public readonly error?: unknown
  ) {
    this.hasValue = kind === NotificationKind.NEXT;
  }

  observe(observer: Observer<T>): void {
    return observeNotification(this, observer);
  }

  do(
    nextHandler?: (value: T) => void,
    errorHandler?: (err: unknown) => void,
    completeHandler?: () => void
  ): void {
    const { kind, value, error } = this;
    
    if (kind === NotificationKind.NEXT) {
      return nextHandler?.(value!);
    }
    
    if (kind === NotificationKind.ERROR) {
      return errorHandler?.(error);
    }
    
    return completeHandler?.();
  }

  accept(
    observerOrNext?: Observer<T> | ((value: T) => void),
    errorHandler?: (err: unknown) => void,
    completeHandler?: () => void
  ): void {
    if (isFunction((observerOrNext as Observer<T>)?.next)) {
      return this.observe(observerOrNext as Observer<T>);
    }
    
    return this.do(
      observerOrNext as (value: T) => void,
      errorHandler,
      completeHandler
    );
  }

  toObservable(): Observable<T> {
    const { kind, value, error } = this;
    
    if (kind === NotificationKind.NEXT) {
      return of(value!);
    }
    
    if (kind === NotificationKind.ERROR) {
      return throwError(() => error);
    }
    
    if (kind === NotificationKind.COMPLETE) {
      return EMPTY;
    }
    
    throw new TypeError(`Unexpected notification kind ${kind}`);
  }

  static createNext<T>(value: T): Notification<T> {
    return new Notification(NotificationKind.NEXT, value);
  }

  static createError<T>(error: unknown): Notification<T> {
    return new Notification(NotificationKind.ERROR, undefined, error);
  }

  static createComplete<T>(): Notification<T> {
    return Notification.completeNotification as Notification<T>;
  }
}

export function observeNotification<T>(
  notification: Notification<T>,
  observer: Observer<T>
): void {
  const { kind, value, error } = notification;
  
  if (typeof kind !== "string") {
    throw new TypeError('Invalid notification, missing "kind"');
  }
  
  if (kind === NotificationKind.NEXT) {
    observer.next?.call(observer, value!);
  } else if (kind === NotificationKind.ERROR) {
    observer.error?.call(observer, error);
  } else {
    observer.complete?.call(observer);
  }
}

function isFunction(value: unknown): value is Function {
  return typeof value === "function";
}

interface Observable<T> {
  subscribe(observer: Observer<T>): Subscription;
}

interface Subscription {
  unsubscribe(): void;
}

declare const EMPTY: Observable<never>;
declare function of<T>(value: T): Observable<T>;
declare function throwError(errorFactory: () => unknown): Observable<never>;