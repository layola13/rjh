import { AsyncAction } from './AsyncAction';
import { animationFrameProvider } from './animationFrameProvider';
import { AnimationFrameScheduler } from './AnimationFrameScheduler';
import { SchedulerAction } from './types';

export class AnimationFrameAction<T> extends AsyncAction<T> {
  constructor(
    protected scheduler: AnimationFrameScheduler,
    protected work: (this: SchedulerAction<T>, state?: T) => void
  ) {
    super(scheduler, work);
  }

  protected requestAsyncId(
    scheduler: AnimationFrameScheduler,
    id?: NodeJS.Timeout | number,
    delay: number = 0
  ): NodeJS.Timeout | number {
    if (delay !== null && delay > 0) {
      return super.requestAsyncId(scheduler, id, delay);
    }

    scheduler.actions.push(this);

    if (!scheduler._scheduled) {
      scheduler._scheduled = animationFrameProvider.requestAnimationFrame(() => {
        return scheduler.flush(undefined);
      });
    }

    return scheduler._scheduled;
  }

  protected recycleAsyncId(
    scheduler: AnimationFrameScheduler,
    id?: NodeJS.Timeout | number,
    delay: number = 0
  ): NodeJS.Timeout | number | undefined {
    const shouldRecycleImmediately = delay != null ? delay > 0 : this.delay > 0;

    if (shouldRecycleImmediately) {
      return super.recycleAsyncId(scheduler, id, delay);
    }

    const actions = scheduler.actions;
    const lastActionId = actions[actions.length - 1]?.id;

    if (id != null && id === scheduler._scheduled && lastActionId !== id) {
      animationFrameProvider.cancelAnimationFrame(id as number);
      scheduler._scheduled = undefined;
    }

    return undefined;
  }
}