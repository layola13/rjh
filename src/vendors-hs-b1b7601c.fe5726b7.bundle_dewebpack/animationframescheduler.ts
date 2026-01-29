import { AsyncScheduler } from './AsyncScheduler';

interface SchedulerAction<T> {
  id: number;
  state: T;
  delay: number;
  execute(state: T, delay: number): void | Error;
  unsubscribe(): void;
}

export class AnimationFrameScheduler extends AsyncScheduler {
  protected _active: boolean = false;
  protected _scheduled: number | undefined;
  protected actions: SchedulerAction<unknown>[] = [];

  /**
   * Flushes all pending actions in the scheduler queue.
   * Executes actions sequentially until the queue is empty or an error occurs.
   * 
   * @param action - Optional action to flush. If not provided, uses the first action in queue.
   * @throws Will re-throw any error that occurs during action execution after cleanup.
   */
  public flush(action?: SchedulerAction<unknown>): void {
    this._active = true;

    let actionId: number;
    
    if (action) {
      actionId = action.id;
    } else {
      actionId = this._scheduled!;
      this._scheduled = undefined;
    }

    const actionsQueue = this.actions;
    let currentAction = action ?? actionsQueue.shift();
    let executionError: Error | void;

    do {
      executionError = currentAction!.execute(currentAction!.state, currentAction!.delay);
      
      if (executionError) {
        break;
      }

      currentAction = actionsQueue[0];
    } while (currentAction && currentAction.id === actionId && actionsQueue.shift());

    this._active = false;

    if (executionError) {
      // Clean up remaining actions with the same ID
      while ((currentAction = actionsQueue[0]) && currentAction.id === actionId && actionsQueue.shift()) {
        currentAction.unsubscribe();
      }
      
      throw executionError;
    }
  }
}