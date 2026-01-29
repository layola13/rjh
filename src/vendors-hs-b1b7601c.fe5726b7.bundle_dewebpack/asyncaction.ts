import { Action } from './Action';
import { intervalProvider } from './intervalProvider';
import { arrRemove } from './arrRemove';

export class AsyncAction<T> extends Action<T> {
  public id: ReturnType<typeof setTimeout> | null = null;
  public state: T | undefined;
  public delay: number | null = null;
  public pending: boolean = false;

  constructor(
    protected scheduler: any,
    protected work: (state?: T) => void
  ) {
    super(scheduler, work);
  }

  public schedule(state?: T, delay: number = 0): this {
    if (this.closed) {
      return this;
    }

    this.state = state;

    const id = this.id;
    const scheduler = this.scheduler;

    if (id != null) {
      this.id = this.recycleAsyncId(scheduler, id, delay);
    }

    this.pending = true;
    this.delay = delay;
    this.id = this.id ?? this.requestAsyncId(scheduler, this.id, delay);

    return this;
  }

  protected requestAsyncId(
    scheduler: any,
    id: ReturnType<typeof setTimeout> | null,
    delay: number = 0
  ): ReturnType<typeof setTimeout> {
    return intervalProvider.setInterval(scheduler.flush.bind(scheduler, this), delay);
  }

  protected recycleAsyncId(
    scheduler: any,
    id: ReturnType<typeof setTimeout> | null,
    delay: number | null = 0
  ): ReturnType<typeof setTimeout> | null {
    if (delay != null && this.delay === delay && this.pending === false) {
      return id;
    }

    if (id != null) {
      intervalProvider.clearInterval(id);
    }

    return null;
  }

  public execute(state: T, delay: number): Error | undefined {
    if (this.closed) {
      return new Error("executing a cancelled action");
    }

    this.pending = false;

    const error = this._execute(state, delay);
    if (error) {
      return error;
    }

    if (this.pending === false && this.id != null) {
      this.id = this.recycleAsyncId(this.scheduler, this.id, null);
    }
  }

  protected _execute(state: T, delay: number): Error | undefined {
    let errorOccurred = false;
    let errorValue: Error | undefined;

    try {
      this.work(state);
    } catch (error) {
      errorOccurred = true;
      errorValue = (error as Error) || new Error("Scheduled action threw falsy error");
    }

    if (errorOccurred) {
      this.unsubscribe();
      return errorValue;
    }
  }

  public unsubscribe(): void {
    if (!this.closed) {
      const { id, scheduler } = this;
      const { actions } = scheduler;

      this.work = null as any;
      this.state = undefined;
      this.scheduler = null as any;
      this.pending = false;

      arrRemove(actions, this);

      if (id != null) {
        this.id = this.recycleAsyncId(scheduler, id, null);
      }

      this.delay = null;

      super.unsubscribe();
    }
  }
}