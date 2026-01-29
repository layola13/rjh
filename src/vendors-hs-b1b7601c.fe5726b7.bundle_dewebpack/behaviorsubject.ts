import { Subject } from './Subject';

/**
 * A variant of Subject that requires an initial value and emits its current
 * value whenever it is subscribed to.
 */
export class BehaviorSubject<T> extends Subject<T> {
  private _value: T;

  constructor(initialValue: T) {
    super();
    this._value = initialValue;
  }

  /**
   * Gets the current value of the BehaviorSubject.
   */
  get value(): T {
    return this.getValue();
  }

  /**
   * Subscribes to the BehaviorSubject and immediately emits the current value.
   * @param subscriber The observer or subscription object
   * @returns The subscription object
   */
  protected _subscribe(subscriber: any): any {
    const subscription = super._subscribe(subscriber);
    if (!subscription.closed) {
      subscriber.next(this._value);
    }
    return subscription;
  }

  /**
   * Returns the current value of the BehaviorSubject.
   * Throws an error if the subject has errored or been closed.
   * @returns The current value
   */
  getValue(): T {
    const { hasError, thrownError, _value } = this;
    if (hasError) {
      throw thrownError;
    }
    this._throwIfClosed();
    return _value;
  }

  /**
   * Emits a new value to all subscribers.
   * @param value The new value to emit
   */
  next(value: T): void {
    this._value = value;
    super.next(value);
  }
}