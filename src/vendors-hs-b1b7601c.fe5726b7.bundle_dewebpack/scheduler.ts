export class Scheduler<T = unknown> {
  public static now = Date.now;

  constructor(
    public readonly schedulerActionCtor: SchedulerActionConstructor<T>,
    public now: () => number = Scheduler.now
  ) {}

  public schedule(
    work: (this: SchedulerAction<T>, state?: T) => void,
    delay: number = 0,
    state?: T
  ): Subscription {
    return new this.schedulerActionCtor(this, work).schedule(state, delay);
  }
}

interface SchedulerAction<T> {
  schedule(state?: T, delay?: number): Subscription;
}

interface Subscription {
  unsubscribe(): void;
  closed: boolean;
}

interface SchedulerActionConstructor<T> {
  new (
    scheduler: Scheduler<T>,
    work: (this: SchedulerAction<T>, state?: T) => void
  ): SchedulerAction<T>;
}