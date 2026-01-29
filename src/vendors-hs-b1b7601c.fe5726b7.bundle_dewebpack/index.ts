export class Observable<T> {
  constructor(
    subscribe?: (subscriber: Subscriber<T>) => TeardownLogic
  ) {
    if (subscribe) {
      this._subscribe = subscribe;
    }
  }

  protected _subscribe(subscriber: Subscriber<T>): TeardownLogic {
    return undefined;
  }

  subscribe(observer?: Partial<Observer<T>>): Subscription;
  subscribe(
    next?: (value: T) => void,
    error?: (error: unknown) => void,
    complete?: () => void
  ): Subscription;
  subscribe(
    observerOrNext?: Partial<Observer<T>> | ((value: T) => void),
    error?: (error: unknown) => void,
    complete?: () => void
  ): Subscription {
    const subscriber = new Subscriber(observerOrNext, error, complete);
    subscriber.add(this._subscribe(subscriber));
    return subscriber;
  }

  pipe(): Observable<T>;
  pipe<A>(op1: OperatorFunction<T, A>): Observable<A>;
  pipe<A, B>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>
  ): Observable<B>;
  pipe<A, B, C>(
    op1: OperatorFunction<T, A>,
    op2: OperatorFunction<A, B>,
    op3: OperatorFunction<B, C>
  ): Observable<C>;
  pipe(...operations: OperatorFunction<unknown, unknown>[]): Observable<unknown> {
    return operations.length
      ? pipeFromArray(operations)(this)
      : this;
  }
}

export class Subscriber<T> extends Subscription implements Observer<T> {
  protected isStopped = false;
  protected destination: Observer<T>;

  constructor(
    observerOrNext?: Partial<Observer<T>> | ((value: T) => void),
    error?: (error: unknown) => void,
    complete?: () => void
  ) {
    super();

    if (typeof observerOrNext === 'function') {
      this.destination = {
        next: observerOrNext,
        error: error ?? defaultErrorHandler,
        complete: complete ?? noop
      };
    } else if (observerOrNext) {
      this.destination = {
        next: observerOrNext.next?.bind(observerOrNext) ?? noop,
        error: observerOrNext.error?.bind(observerOrNext) ?? defaultErrorHandler,
        complete: observerOrNext.complete?.bind(observerOrNext) ?? noop
      };
    } else {
      this.destination = {
        next: noop,
        error: defaultErrorHandler,
        complete: noop
      };
    }
  }

  next(value: T): void {
    if (!this.isStopped) {
      this.destination.next(value);
    }
  }

  error(err: unknown): void {
    if (!this.isStopped) {
      this.isStopped = true;
      this.destination.error(err);
      this.unsubscribe();
    }
  }

  complete(): void {
    if (!this.isStopped) {
      this.isStopped = true;
      this.destination.complete();
      this.unsubscribe();
    }
  }
}

export class Subscription {
  private _finalizers: Set<Finalizer> | null = null;
  public closed = false;

  constructor(private initialTeardown?: () => void) {}

  unsubscribe(): void {
    if (!this.closed) {
      this.closed = true;

      if (this.initialTeardown) {
        this.initialTeardown();
      }

      if (this._finalizers) {
        for (const finalizer of this._finalizers) {
          execFinalizer(finalizer);
        }
        this._finalizers = null;
      }
    }
  }

  add(teardown: TeardownLogic): void {
    if (teardown && teardown !== this) {
      if (this.closed) {
        execFinalizer(teardown);
      } else {
        if (!this._finalizers) {
          this._finalizers = new Set();
        }
        this._finalizers.add(teardown);
      }
    }
  }

  remove(teardown: Finalizer): void {
    this._finalizers?.delete(teardown);
  }
}

export class Subject<T> extends Observable<T> implements Observer<T> {
  private observers: Observer<T>[] = [];
  private isStopped = false;
  private hasError = false;
  private thrownError: unknown = null;

  next(value: T): void {
    if (!this.isStopped) {
      for (const observer of this.observers.slice()) {
        observer.next(value);
      }
    }
  }

  error(err: unknown): void {
    if (!this.isStopped) {
      this.hasError = true;
      this.thrownError = err;
      this.isStopped = true;
      for (const observer of this.observers.slice()) {
        observer.error(err);
      }
      this.observers = [];
    }
  }

  complete(): void {
    if (!this.isStopped) {
      this.isStopped = true;
      for (const observer of this.observers.slice()) {
        observer.complete();
      }
      this.observers = [];
    }
  }

  protected _subscribe(subscriber: Subscriber<T>): Subscription {
    if (this.hasError) {
      subscriber.error(this.thrownError);
      return Subscription.EMPTY;
    } else if (this.isStopped) {
      subscriber.complete();
      return Subscription.EMPTY;
    } else {
      this.observers.push(subscriber);
      return new Subscription(() => {
        const index = this.observers.indexOf(subscriber);
        if (index >= 0) {
          this.observers.splice(index, 1);
        }
      });
    }
  }
}

export class BehaviorSubject<T> extends Subject<T> {
  constructor(private _value: T) {
    super();
  }

  get value(): T {
    return this.getValue();
  }

  getValue(): T {
    if (this.hasError) {
      throw this.thrownError;
    } else if (this.closed) {
      throw new ObjectUnsubscribedError();
    } else {
      return this._value;
    }
  }

  next(value: T): void {
    this._value = value;
    super.next(value);
  }

  protected _subscribe(subscriber: Subscriber<T>): Subscription {
    const subscription = super._subscribe(subscriber);
    if (!subscription.closed) {
      subscriber.next(this._value);
    }
    return subscription;
  }
}

export class ReplaySubject<T> extends Subject<T> {
  private buffer: T[] = [];
  private timestampProvider = Date;

  constructor(
    private bufferSize: number = Infinity,
    private windowTime: number = Infinity,
    timestampProvider?: TimestampProvider
  ) {
    super();
    if (timestampProvider) {
      this.timestampProvider = timestampProvider;
    }
  }

  next(value: T): void {
    const { buffer, bufferSize, windowTime, timestampProvider } = this;
    const now = timestampProvider.now();
    
    buffer.push(value);

    while (buffer.length > bufferSize || (buffer.length > 0 && now - (buffer[0] as any).timestamp > windowTime)) {
      buffer.shift();
    }

    super.next(value);
  }

  protected _subscribe(subscriber: Subscriber<T>): Subscription {
    const subscription = super._subscribe(subscriber);
    
    for (const value of this.buffer.slice()) {
      subscriber.next(value);
    }

    return subscription;
  }
}

export class AsyncSubject<T> extends Subject<T> {
  private hasValue = false;
  private value: T | undefined;

  next(value: T): void {
    if (!this.isStopped) {
      this.value = value;
      this.hasValue = true;
    }
  }

  complete(): void {
    const { hasValue, value, observers } = this;
    if (hasValue) {
      for (const observer of observers.slice()) {
        observer.next(value!);
        observer.complete();
      }
    } else {
      for (const observer of observers.slice()) {
        observer.complete();
      }
    }
    this.observers = [];
  }
}

export class Scheduler {
  constructor(
    private SchedulerAction: typeof Action,
    public now: () => number = Date.now
  ) {}

  schedule<T>(
    work: (state?: T) => void,
    delay: number = 0,
    state?: T
  ): Subscription {
    return new this.SchedulerAction(this, work).schedule(state, delay);
  }
}

export class Action<T> extends Subscription {
  constructor(
    protected scheduler: Scheduler,
    protected work: (state?: T) => void
  ) {
    super();
  }

  schedule(state?: T, delay: number = 0): Subscription {
    return this;
  }

  execute(state: T, delay: number): unknown {
    try {
      return this.work(state);
    } catch (error) {
      this.unsubscribe();
      throw error;
    }
  }
}

export class AsyncAction<T> extends Action<T> {
  private id: ReturnType<typeof setTimeout> | undefined;
  private pending = false;

  schedule(state?: T, delay: number = 0): Subscription {
    if (this.closed) {
      return this;
    }

    this.pending = true;
    
    if (this.id != null) {
      clearTimeout(this.id);
    }

    this.id = setTimeout(() => {
      this.pending = false;
      this.execute(state!, delay);
    }, delay);

    return this;
  }

  protected recycleAsyncId(): void {
    if (this.id != null) {
      clearTimeout(this.id);
      this.id = undefined;
    }
  }

  unsubscribe(): void {
    if (!this.closed) {
      this.recycleAsyncId();
      super.unsubscribe();
    }
  }
}

export class AsapAction<T> extends AsyncAction<T> {
  schedule(state?: T, delay: number = 0): Subscription {
    if (this.closed) {
      return this;
    }

    this.pending = true;

    if (this.id != null) {
      clearTimeout(this.id);
    }

    this.id = queueMicrotask(() => {
      this.pending = false;
      this.execute(state!, delay);
    }) as any;

    return this;
  }
}

export class QueueAction<T> extends AsyncAction<T> {
  schedule(state?: T, delay: number = 0): Subscription {
    if (delay > 0) {
      return super.schedule(state, delay);
    }

    this.pending = true;
    this.execute(state!, delay);
    return this;
  }
}

export class AnimationFrameAction<T> extends AsyncAction<T> {
  schedule(state?: T, delay: number = 0): Subscription {
    if (this.closed) {
      return this;
    }

    this.pending = true;

    if (this.id != null) {
      cancelAnimationFrame(this.id);
    }

    this.id = requestAnimationFrame(() => {
      this.pending = false;
      this.execute(state!, delay);
    }) as any;

    return this;
  }

  protected recycleAsyncId(): void {
    if (this.id != null) {
      cancelAnimationFrame(this.id);
      this.id = undefined;
    }
  }
}

export class VirtualTimeScheduler extends Scheduler {
  private frame = 0;
  private index = -1;
  private maxFrames = Infinity;
  private actions: Array<VirtualAction<unknown>> = [];

  flush(): void {
    const { actions, maxFrames } = this;
    let action: VirtualAction<unknown> | undefined;

    while ((action = actions[0]) && action.delay <= maxFrames) {
      actions.shift();
      this.frame = action.delay;
      action.execute(action.state, action.delay);
    }
  }

  now(): number {
    return this.frame;
  }
}

export class VirtualAction<T> extends AsyncAction<T> {
  constructor(
    protected scheduler: VirtualTimeScheduler,
    protected work: (state?: T) => void,
    public index: number = 0
  ) {
    super(scheduler, work);
  }

  schedule(state?: T, delay: number = 0): Subscription {
    if (this.closed) {
      return this;
    }

    return super.schedule(state, delay);
  }
}

export const asyncScheduler = new Scheduler(AsyncAction);
export const asapScheduler = new Scheduler(AsapAction);
export const queueScheduler = new Scheduler(QueueAction);
export const animationFrameScheduler = new Scheduler(AnimationFrameAction);

export class ConnectableObservable<T> extends Observable<T> {
  private subject: Subject<T> | null = null;
  private subscription: Subscription | null = null;
  private refCount = 0;

  constructor(
    public source: Observable<T>,
    protected subjectFactory: () => Subject<T>
  ) {
    super();
  }

  protected _subscribe(subscriber: Subscriber<T>): Subscription {
    return this.getSubject().subscribe(subscriber);
  }

  protected getSubject(): Subject<T> {
    if (!this.subject || this.subject.closed) {
      this.subject = this.subjectFactory();
    }
    return this.subject;
  }

  connect(): Subscription {
    let subscription = this.subscription;
    if (!subscription || subscription.closed) {
      subscription = this.source.subscribe(this.getSubject());
      this.subscription = subscription;
    }
    return subscription;
  }

  refCount(): Observable<T> {
    return new Observable<T>((subscriber) => {
      this.refCount++;
      const innerSub = this.subscribe(subscriber);

      if (this.refCount === 1) {
        this.connect();
      }

      return () => {
        this.refCount--;
        innerSub.unsubscribe();
        if (this.refCount === 0 && this.subscription) {
          this.subscription.unsubscribe();
          this.subscription = null;
        }
      };
    });
  }
}

export class OperatorSubscriber<T> extends Subscriber<T> {
  constructor(
    destination: Subscriber<unknown>,
    onNext?: (value: T) => void,
    onComplete?: () => void,
    onError?: (err: unknown) => void,
    private onFinalize?: () => void
  ) {
    super(destination);
    this.destination = {
      next: onNext ? (value) => onNext(value) : destination.next.bind(destination),
      error: onError ? (err) => onError(err) : destination.error.bind(destination),
      complete: onComplete ? () => onComplete() : destination.complete.bind(destination)
    };
  }

  unsubscribe(): void {
    this.onFinalize?.();
    super.unsubscribe();
  }
}

export const EMPTY = new Observable<never>((subscriber) => subscriber.complete());

export const NEVER = new Observable<never>(() => {});

export class EmptyError extends Error {
  constructor() {
    super('No elements in sequence');
    this.name = 'EmptyError';
  }
}

export class ObjectUnsubscribedError extends Error {
  constructor() {
    super('Object unsubscribed');
    this.name = 'ObjectUnsubscribedError';
  }
}

export class ArgumentOutOfRangeError extends Error {
  constructor() {
    super('Argument out of range');
    this.name = 'ArgumentOutOfRangeError';
  }
}

export class NotFoundError extends Error {
  constructor(message?: string) {
    super(message ?? 'Not found');
    this.name = 'NotFoundError';
  }
}

export class SequenceError extends Error {
  constructor(message?: string) {
    super(message ?? 'Sequence error');
    this.name = 'SequenceError';
  }
}

export class TimeoutError extends Error {
  constructor() {
    super('Timeout has occurred');
    this.name = 'TimeoutError';
  }
}

export class UnsubscriptionError extends Error {
  constructor(public errors: unknown[]) {
    super(`${errors.length} errors occurred during unsubscription`);
    this.name = 'UnsubscriptionError';
  }
}

export enum NotificationKind {
  NEXT = 'N',
  ERROR = 'E',
  COMPLETE = 'C'
}

export interface NextNotification<T> {
  kind: NotificationKind.NEXT;
  value: T;
}

export interface ErrorNotification {
  kind: NotificationKind.ERROR;
  error: unknown;
}

export interface CompleteNotification {
  kind: NotificationKind.COMPLETE;
}

export type Notification<T> = NextNotification<T> | ErrorNotification | CompleteNotification;

export class TimeInterval<T> {
  constructor(
    public value: T,
    public interval: number
  ) {}
}

export interface Observer<T> {
  next: (value: T) => void;
  error: (err: unknown) => void;
  complete: () => void;
}

export type TeardownLogic = Subscription | (() => void) | void | undefined;
export type Finalizer = Subscription | (() => void);

export interface OperatorFunction<T, R> {
  (source: Observable<T>): Observable<R>;
}

export interface TimestampProvider {
  now(): number;
}

function execFinalizer(finalizer: Finalizer): void {
  if (finalizer instanceof Subscription) {
    finalizer.unsubscribe();
  } else {
    finalizer();
  }
}

function pipeFromArray<T, R>(
  fns: Array<OperatorFunction<T, R>>
): OperatorFunction<T, R> {
  if (fns.length === 0) {
    return (input) => input as any;
  }

  if (fns.length === 1) {
    return fns[0];
  }

  return (input: Observable<T>) => {
    return fns.reduce((prev, fn) => fn(prev as any), input as any) as Observable<R>;
  };
}

function noop(): void {}

function defaultErrorHandler(err: unknown): void {
  throw err;
}

Subscription.EMPTY = new Subscription();