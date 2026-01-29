import { Subscription, isSubscription } from './Subscription';
import { isFunction } from './util/isFunction';
import { Observer, PartialObserver } from './types';
import { reportUnhandledError } from './util/reportUnhandledError';
import { noop } from './util/noop';
import { nextNotification, errorNotification, COMPLETE_NOTIFICATION, ObservableNotification } from './NotificationFactories';
import { config } from './config';
import { timeoutProvider } from './scheduler/timeoutProvider';
import { captureError } from './util/captureError';

export const EMPTY_OBSERVER: Observer<unknown> = {
  closed: true,
  next: noop,
  error: (err: unknown): never => {
    throw err;
  },
  complete: noop
};

export class Subscriber<T> extends Subscription {
  protected isStopped: boolean = false;
  protected destination: Observer<T> | null;

  constructor(destination?: Subscriber<T> | Observer<T>) {
    super();
    
    if (destination) {
      this.destination = destination;
      if (isSubscription(destination)) {
        destination.add(this);
      }
    } else {
      this.destination = EMPTY_OBSERVER as Observer<T>;
    }
  }

  static create<T>(
    next?: ((value: T) => void) | null,
    error?: ((err: unknown) => void) | null,
    complete?: (() => void) | null
  ): Subscriber<T> {
    return new SafeSubscriber(next, error, complete);
  }

  next(value: T): void {
    if (this.isStopped) {
      handleStoppedNotification(nextNotification(value), this);
    } else {
      this._next(value);
    }
  }

  error(err: unknown): void {
    if (this.isStopped) {
      handleStoppedNotification(errorNotification(err), this);
    } else {
      this.isStopped = true;
      this._error(err);
    }
  }

  complete(): void {
    if (this.isStopped) {
      handleStoppedNotification(COMPLETE_NOTIFICATION, this);
    } else {
      this.isStopped = true;
      this._complete();
    }
  }

  unsubscribe(): void {
    if (!this.closed) {
      this.isStopped = true;
      super.unsubscribe();
      this.destination = null;
    }
  }

  protected _next(value: T): void {
    this.destination!.next(value);
  }

  protected _error(err: unknown): void {
    try {
      this.destination!.error(err);
    } finally {
      this.unsubscribe();
    }
  }

  protected _complete(): void {
    try {
      this.destination!.complete();
    } finally {
      this.unsubscribe();
    }
  }
}

const bind = Function.prototype.bind;

function bindCallback<T extends Function>(fn: T, thisArg: unknown): T {
  return bind.call(fn, thisArg);
}

class ConsumerObserver<T> implements Observer<T> {
  constructor(private partialObserver: PartialObserver<T>) {}

  next(value: T): void {
    const { partialObserver } = this;
    if (partialObserver.next) {
      try {
        partialObserver.next(value);
      } catch (error) {
        handleError(error);
      }
    }
  }

  error(err: unknown): void {
    const { partialObserver } = this;
    if (partialObserver.error) {
      try {
        partialObserver.error(err);
      } catch (error) {
        handleError(error);
      }
    } else {
      handleError(err);
    }
  }

  complete(): void {
    const { partialObserver } = this;
    if (partialObserver.complete) {
      try {
        partialObserver.complete();
      } catch (error) {
        handleError(error);
      }
    }
  }
}

export class SafeSubscriber<T> extends Subscriber<T> {
  constructor(
    observerOrNext?: PartialObserver<T> | ((value: T) => void) | null,
    error?: ((err: unknown) => void) | null,
    complete?: (() => void) | null
  ) {
    super();

    let partialObserver: PartialObserver<T>;

    if (isFunction(observerOrNext) || !observerOrNext) {
      partialObserver = {
        next: observerOrNext ?? undefined,
        error: error ?? undefined,
        complete: complete ?? undefined
      };
    } else {
      let context: unknown;

      if (this && config.useDeprecatedNextContext) {
        context = Object.create(observerOrNext);
        (context as any).unsubscribe = () => this.unsubscribe();
        partialObserver = {
          next: observerOrNext.next && bindCallback(observerOrNext.next, context),
          error: observerOrNext.error && bindCallback(observerOrNext.error, context),
          complete: observerOrNext.complete && bindCallback(observerOrNext.complete, context)
        };
      } else {
        partialObserver = observerOrNext;
      }
    }

    this.destination = new ConsumerObserver(partialObserver);
  }
}

function handleError(error: unknown): void {
  if (config.useDeprecatedSynchronousErrorHandling) {
    captureError(error);
  } else {
    reportUnhandledError(error);
  }
}

function handleStoppedNotification(
  notification: ObservableNotification<unknown>,
  subscriber: Subscriber<unknown>
): void {
  const { onStoppedNotification } = config;
  if (onStoppedNotification) {
    timeoutProvider.setTimeout(() => onStoppedNotification(notification, subscriber));
  }
}