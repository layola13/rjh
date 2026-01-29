import { AsyncScheduler } from './AsyncScheduler';
import { AsyncAction } from './AsyncAction';

/**
 * ASAP (As Soon As Possible) Scheduler
 * Executes tasks asynchronously but as quickly as possible, typically using microtask queue
 */
export class AsapScheduler extends AsyncScheduler {
  /**
   * Flush all scheduled actions
   * @param action - Optional action to execute first
   */
  public flush(action?: AsyncAction<unknown>): void {
    this._active = true;

    const scheduledId = this._scheduled;
    this._scheduled = undefined;

    let error: unknown;
    const actions = this.actions;
    
    let currentAction = action || actions.shift();

    do {
      error = currentAction?.execute(currentAction.state, currentAction.delay);
      if (error) {
        break;
      }
    } while (
      (currentAction = actions[0]) &&
      currentAction.id === scheduledId &&
      actions.shift()
    );

    this._active = false;

    if (error) {
      // Clean up remaining actions with the same scheduled ID
      while (
        (currentAction = actions[0]) &&
        currentAction.id === scheduledId &&
        actions.shift()
      ) {
        currentAction.unsubscribe();
      }
      throw error;
    }
  }
}