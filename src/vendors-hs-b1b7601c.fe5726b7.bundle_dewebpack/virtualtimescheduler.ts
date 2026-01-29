import { AsyncAction } from 'rxjs/internal/scheduler/AsyncAction';
import { AsyncScheduler } from 'rxjs/internal/scheduler/AsyncScheduler';
import { Subscription } from 'rxjs';

export class VirtualTimeScheduler extends AsyncScheduler {
  static frameTimeFactor = 10;
  
  public frame: number = 0;
  public index: number = -1;
  public maxFrames: number;

  constructor(
    schedulerActionCtor: typeof VirtualAction = VirtualAction,
    maxFrames: number = Infinity
  ) {
    super(schedulerActionCtor, () => this.frame);
    this.maxFrames = maxFrames;
  }

  public flush(): void {
    const { actions, maxFrames } = this;
    let error: any;
    let action: VirtualAction<any> | undefined;

    while ((action = actions[0]) && action.delay <= maxFrames) {
      actions.shift();
      this.frame = action.delay;
      error = action.execute(action.state, action.delay);
      if (error) {
        break;
      }
    }

    if (error) {
      while ((action = actions.shift())) {
        action.unsubscribe();
      }
      throw error;
    }
  }
}

export class VirtualAction<T> extends AsyncAction<T> {
  public active: boolean = true;

  constructor(
    public scheduler: VirtualTimeScheduler,
    public work: (this: VirtualAction<T>, state?: T) => void,
    public index: number = scheduler.index += 1
  ) {
    super(scheduler, work);
    this.index = scheduler.index = index;
  }

  public schedule(state?: T, delay: number = 0): Subscription {
    if (!Number.isFinite(delay)) {
      return Subscription.EMPTY;
    }

    if (!this.id) {
      return super.schedule(state, delay);
    }

    this.active = false;
    const action = new VirtualAction<T>(this.scheduler, this.work);
    this.add(action);
    return action.schedule(state, delay);
  }

  public requestAsyncId(
    scheduler: VirtualTimeScheduler,
    id?: any,
    delay: number = 0
  ): any {
    this.delay = scheduler.frame + delay;
    const { actions } = scheduler;
    actions.push(this);
    actions.sort(VirtualAction.sortActions);
    return 1;
  }

  public recycleAsyncId(
    scheduler: VirtualTimeScheduler,
    id?: any,
    delay: number = 0
  ): any {
    return undefined;
  }

  protected _execute(state: T, delay: number): any {
    if (this.active === true) {
      return super._execute(state, delay);
    }
  }

  private static sortActions<T>(
    a: VirtualAction<T>,
    b: VirtualAction<T>
  ): number {
    if (a.delay === b.delay) {
      if (a.index === b.index) {
        return 0;
      }
      return a.index > b.index ? 1 : -1;
    }
    return a.delay > b.delay ? 1 : -1;
  }
}