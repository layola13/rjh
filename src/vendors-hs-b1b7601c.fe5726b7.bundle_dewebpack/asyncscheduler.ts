import { Scheduler } from './Scheduler';
import { AsyncAction } from './AsyncAction';

/**
 * Async scheduler that executes work asynchronously using setInterval/setTimeout.
 * Flushes actions in a queue, ensuring proper execution order and error handling.
 */
export class AsyncScheduler extends Scheduler {
  public actions: AsyncAction<any>[] = [];
  private _active: boolean = false;

  constructor(
    schedulerActionCtor: typeof AsyncAction,
    now: () => number = Scheduler.now
  ) {
    super(schedulerActionCtor, now);
  }

  /**
   * Flushes the action queue, executing actions sequentially.
   * If already active, queues the action. Otherwise, executes immediately.
   * 
   * @param action - The action to flush
   */
  public flush(action: AsyncAction<any>): void {
    const { actions } = this;

    if (this._active) {
      actions.push(action);
      return;
    }

    let error: any;
    this._active = true;

    do {
      error = action.execute(action.state, action.delay);
      if (error) {
        break;
      }
    } while ((action = actions.shift()!));

    this._active = false;

    if (error) {
      while ((action = actions.shift()!)) {
        action.unsubscribe();
      }
      throw error;
    }
  }
}