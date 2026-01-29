import { Observable } from 'rxjs';
import { Subscription, EMPTY_SUBSCRIPTION } from 'rxjs';
import { ObjectUnsubscribedError } from 'rxjs';
import { arrRemove } from 'rxjs/internal/util/arrRemove';
import { errorContext } from 'rxjs/internal/util/errorContext';

interface Observer<T> {
  next: (value: T) => void;
  error: (err: unknown) => void;
  complete: () => void;
}

interface Operator<T, R> {
  call(subscriber: Observer<R>, source: Observable<T>): void;
}

export class Subject<T> extends Observable<T> implements Observer<T> {
  closed: boolean = false;
  currentObservers: Observer<T>[] | null = null;
  observers: Observer<T>[] = [];
  isStopped: boolean = false;
  hasError: boolean = false;
  thrownError: unknown = null;

  constructor() {
    super();
  }

  lift<R>(operator: Operator<T, R>): Observable<R> {
    const subject = new AnonymousSubject<T, R>(this, this);
    subject.operator = operator;
    return subject;
  }

  private _throwIfClosed(): void {
    if (this.closed) {
      throw new ObjectUnsubscribedError();
    }
  }

  next(value: T): void {
    errorContext(() => {
      this._throwIfClosed();
      
      if (!this.isStopped) {
        if (!this.currentObservers) {
          this.currentObservers = Array.from(this.observers);
        }
        
        for (const observer of this.currentObservers) {
          observer.next(value);
        }
      }
    });
  }

  error(err: unknown): void {
    errorContext(() => {
      this._throwIfClosed();
      
      if (!this.isStopped) {
        this.hasError = true;
        this.isStopped = true;
        this.thrownError = err;
        
        const { observers } = this;
        while (observers.length) {
          observers.shift()!.error(err);
        }
      }
    });
  }

  complete(): void {
    errorContext(() => {
      this._throwIfClosed();
      
      if (!this.isStopped) {
        this.isStopped = true;
        
        const { observers } = this;
        while (observers.length) {
          observers.shift()!.complete();
        }
      }
    });
  }

  unsubscribe(): void {
    this.isStopped = true;
    this.closed = true;
    this.observers = null as any;
    this.currentObservers = null;
  }

  get observed(): boolean {
    return (this.observers?.length ?? 0) > 0;
  }

  protected _trySubscribe(subscriber: Observer<T>): Subscription {
    this._throwIfClosed();
    return super._trySubscribe(subscriber);
  }

  protected _subscribe(subscriber: Observer<T>): Subscription {
    this._throwIfClosed();
    this._checkFinalizedStatuses(subscriber);
    return this._innerSubscribe(subscriber);
  }

  private _innerSubscribe(subscriber: Observer<T>): Subscription {
    const { hasError, isStopped, observers } = this;
    
    if (hasError || isStopped) {
      return EMPTY_SUBSCRIPTION;
    }
    
    this.currentObservers = null;
    observers.push(subscriber);
    
    return new Subscription(() => {
      this.currentObservers = null;
      arrRemove(observers, subscriber);
    });
  }

  private _checkFinalizedStatuses(subscriber: Observer<T>): void {
    const { hasError, thrownError, isStopped } = this;
    
    if (hasError) {
      subscriber.error(thrownError);
    } else if (isStopped) {
      subscriber.complete();
    }
  }

  asObservable(): Observable<T> {
    const observable = new Observable<T>();
    observable.source = this;
    return observable;
  }

  static create<T>(destination: Observer<T>, source: Observable<T>): AnonymousSubject<T, T> {
    return new AnonymousSubject<T, T>(destination, source);
  }
}

export class AnonymousSubject<T, R = T> extends Subject<T> {
  constructor(
    public destination?: Observer<R>,
    public source?: Observable<T>
  ) {
    super();
  }

  next(value: T): void {
    this.destination?.next?.(value as unknown as R);
  }

  error(err: unknown): void {
    this.destination?.error?.(err);
  }

  complete(): void {
    this.destination?.complete?.();
  }

  protected _subscribe(subscriber: Observer<R>): Subscription {
    return this.source?.subscribe(subscriber as any) ?? EMPTY_SUBSCRIPTION;
  }
}