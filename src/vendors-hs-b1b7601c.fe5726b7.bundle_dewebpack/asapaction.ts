import { AsyncAction } from './AsyncAction';
import { immediateProvider } from './immediateProvider';
import { AsapScheduler } from './AsapScheduler';
import { SchedulerAction } from './types';

export class AsapAction<T> extends AsyncAction<T> {
  constructor(
    protected scheduler: AsapScheduler,
    protected work: (this: SchedulerAction<T>, state?: T) => void
  ) {
    super(scheduler, work);
  }

  public requestAsyncId(
    scheduler: AsapScheduler,
    id?: NodeJS.Immediate,
    delay: number = 0
  ): NodeJS.Immediate {
    if (delay !== null && delay > 0) {
      return super.requestAsyncId(scheduler, id, delay);
    }

    scheduler.actions.push(this);

    if (!scheduler._scheduled) {
      scheduler._scheduled = immediateProvider.setImmediate(
        scheduler.flush.bind(scheduler, undefined)
      );
    }

    return scheduler._scheduled;
  }

  public recycleAsyncId(
    scheduler: AsapScheduler,
    id?: NodeJS.Immediate,
    delay: number = 0
  ): NodeJS.Immediate | undefined {
    const shouldRecycleParent = delay != null ? delay > 0 : this.delay > 0;

    if (shouldRecycleParent) {
      return super.recycleAsyncId(scheduler, id, delay);
    }

    const actions = scheduler.actions;
    const lastAction = actions[actions.length - 1];

    if (id != null && lastAction?.id !== id) {
      immediateProvider.clearImmediate(id);

      if (scheduler._scheduled === id) {
        scheduler._scheduled = undefined;
      }
    }

    return undefined;
  }
}