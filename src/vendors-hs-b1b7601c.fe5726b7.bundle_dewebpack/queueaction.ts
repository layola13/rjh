import { AsyncAction } from './AsyncAction';
import { QueueScheduler } from './QueueScheduler';
import { SchedulerAction, Subscription } from './types';

/**
 * QueueAction is a specialized AsyncAction that executes synchronously when delay is 0.
 * It's used by QueueScheduler to immediately flush queued work without setTimeout.
 */
export class QueueAction<T> extends AsyncAction<T> {
  constructor(
    protected scheduler: QueueScheduler,
    protected work: (this: SchedulerAction<T>, state?: T) => void
  ) {
    super(scheduler, work);
  }

  /**
   * Schedules work to be executed. If delay is 0, flushes immediately.
   * @param state - The state to pass to the work function
   * @param delay - Delay in milliseconds (default: 0)
   * @returns This action instance for chaining
   */
  public schedule(state?: T, delay: number = 0): Subscription {
    if (delay > 0) {
      return super.schedule(state, delay);
    }

    this.delay = delay;
    this.state = state;
    this.scheduler.flush(this);
    return this;
  }

  /**
   * Executes the work. Delegates to parent for async execution (delay > 0).
   * @param state - The state to execute with
   * @param delay - The delay after which to execute
   * @returns The result of execution or parent's execute call
   */
  public execute(state: T, delay: number): unknown {
    if (delay > 0 || this.closed) {
      return super.execute(state, delay);
    }
    return this._execute(state, delay);
  }

  /**
   * Requests an async ID for scheduled execution.
   * Returns 0 for immediate execution, triggering synchronous flush.
   * @param scheduler - The scheduler managing this action
   * @param id - Existing async ID (optional)
   * @param delay - Delay in milliseconds (default: 0)
   * @returns Async ID or 0 for immediate execution
   */
  protected requestAsyncId(
    scheduler: QueueScheduler,
    id?: unknown,
    delay: number = 0
  ): unknown {
    const hasPositiveDelay = (delay != null && delay > 0) || (delay == null && this.delay > 0);
    
    if (hasPositiveDelay) {
      return super.requestAsyncId(scheduler, id, delay);
    }

    scheduler.flush(this);
    return 0;
  }
}