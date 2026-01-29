import { Subscriber } from './Subscriber';

export interface OperatorSubscriberOptions<T> {
  next?: (value: T) => void;
  error?: (err: unknown) => void;
  complete?: () => void;
  onFinalize?: () => void;
  shouldUnsubscribe?: () => boolean;
}

export function createOperatorSubscriber<T>(
  destination: Subscriber<T>,
  onNext?: (value: T) => void,
  onComplete?: () => void,
  onError?: (err: unknown) => void,
  onFinalize?: () => void,
  shouldUnsubscribe?: () => boolean
): OperatorSubscriber<T> {
  return new OperatorSubscriber(
    destination,
    onNext,
    onComplete,
    onError,
    onFinalize,
    shouldUnsubscribe
  );
}

export class OperatorSubscriber<T> extends Subscriber<T> {
  private readonly onFinalize?: () => void;
  private readonly shouldUnsubscribe?: () => boolean;

  constructor(
    destination: Subscriber<T>,
    onNext?: (value: T) => void,
    onComplete?: () => void,
    onError?: (err: unknown) => void,
    onFinalize?: () => void,
    shouldUnsubscribe?: () => boolean
  ) {
    super(destination);
    this.onFinalize = onFinalize;
    this.shouldUnsubscribe = shouldUnsubscribe;

    this._next = onNext
      ? (value: T) => {
          try {
            onNext(value);
          } catch (error) {
            destination.error(error);
          }
        }
      : super._next;

    this._error = onError
      ? (err: unknown) => {
          try {
            onError(err);
          } catch (error) {
            destination.error(error);
          } finally {
            this.unsubscribe();
          }
        }
      : super._error;

    this._complete = onComplete
      ? () => {
          try {
            onComplete();
          } catch (error) {
            destination.error(error);
          } finally {
            this.unsubscribe();
          }
        }
      : super._complete;
  }

  unsubscribe(): void {
    if (!this.shouldUnsubscribe || this.shouldUnsubscribe()) {
      const wasClosed = this.closed;
      super.unsubscribe();
      if (!wasClosed) {
        this.onFinalize?.();
      }
    }
  }
}