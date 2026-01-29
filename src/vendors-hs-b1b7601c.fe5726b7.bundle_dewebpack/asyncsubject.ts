import { Subject } from 'rxjs';
import { Observer } from 'rxjs';

/**
 * AsyncSubject emits the last value (and only the last value) emitted by the source Observable,
 * and only after that source Observable completes.
 */
export class AsyncSubject<T> extends Subject<T> {
  private _value: T | null = null;
  private _hasValue: boolean = false;
  private _isComplete: boolean = false;

  /**
   * Checks the finalized statuses and notifies the observer accordingly.
   * @param observer - The observer to notify
   */
  protected _checkFinalizedStatuses(observer: Observer<T>): void {
    const { hasError, thrownError, isStopped } = this;

    if (hasError) {
      observer.error(thrownError);
    } else if (isStopped || this._isComplete) {
      if (this._hasValue) {
        observer.next(this._value!);
      }
      observer.complete();
    }
  }

  /**
   * Stores the value to be emitted when the subject completes.
   * @param value - The value to store
   */
  next(value: T): void {
    if (!this.isStopped) {
      this._value = value;
      this._hasValue = true;
    }
  }

  /**
   * Completes the subject and emits the last stored value to all observers.
   */
  complete(): void {
    if (!this._isComplete) {
      this._isComplete = true;
      
      if (this._hasValue) {
        super.next(this._value!);
      }
      
      super.complete();
    }
  }
}