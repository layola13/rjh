import { Observable } from 'rxjs';
import { Subscription } from 'rxjs';
import { Subject } from 'rxjs';
import { createOperatorSubscriber } from 'rxjs/internal/operators/OperatorSubscriber';
import { refCount } from 'rxjs/operators';

interface Liftable<T> {
  lift<R>(operator: any): Observable<R>;
}

function hasLift(source: any): source is Liftable<any> {
  return typeof source?.lift === 'function';
}

export class ConnectableObservable<T> extends Observable<T> {
  protected _subject: Subject<T> | null = null;
  protected _refCount: number = 0;
  protected _connection: Subscription | null = null;

  constructor(
    public source: Observable<T>,
    protected subjectFactory: () => Subject<T>
  ) {
    super();

    if (hasLift(source)) {
      this.lift = source.lift;
    }
  }

  protected _subscribe(subscriber: any): Subscription {
    return this.getSubject().subscribe(subscriber);
  }

  protected getSubject(): Subject<T> {
    const subject = this._subject;
    
    if (!subject || subject.isStopped) {
      this._subject = this.subjectFactory();
    }
    
    return this._subject;
  }

  protected _teardown(): void {
    this._refCount = 0;
    const connection = this._connection;
    this._subject = null;
    this._connection = null;
    connection?.unsubscribe();
  }

  connect(): Subscription {
    let connection = this._connection;

    if (!connection) {
      connection = this._connection = new Subscription();
      const subject = this.getSubject();

      connection.add(
        this.source.subscribe(
          createOperatorSubscriber(
            subject,
            undefined,
            () => {
              this._teardown();
              subject.complete();
            },
            (error: any) => {
              this._teardown();
              subject.error(error);
            },
            () => {
              return this._teardown();
            }
          )
        )
      );

      if (connection.closed) {
        this._connection = null;
        connection = Subscription.EMPTY;
      }
    }

    return connection;
  }

  refCount(): Observable<T> {
    return refCount()(this);
  }
}