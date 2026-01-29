import { EntityFlagEnum } from './entity-flags';
import { Signal, SignalHook } from './signals';

export enum TaskManagerState {
  Pending = 0,
  Running = 1,
  Finished = 2
}

interface ClipTaskInfo<T = unknown> {
  taskFn: (...args: unknown[]) => T;
  entity: ClipEntity;
}

interface ClipEntity {
  signalRemoved: Signal<void>;
  isFlagOn(flag: EntityFlagEnum): boolean;
}

interface TaskControl<T = unknown> {
  run: (...args: unknown[]) => T;
  delete: () => void;
}

interface TaskStateEvent {
  state: TaskManagerState;
}

export class NCPClipTaskManager {
  static clipTaskSignal = new Signal<TaskStateEvent>();
  private static _clipTaskMap = new Map<string, ClipTaskInfo>();
  private static _enabled = false;
  private static _state = TaskManagerState.Finished;
  private static _signalHook = new SignalHook();

  static enable(): void {
    this._enabled = true;
  }

  static disable(): void {
    this._enabled = false;
  }

  static addClipTask<T>(
    taskId: string,
    taskFn: (...args: unknown[]) => T,
    entity: ClipEntity
  ): TaskControl<T> | undefined {
    if (
      this._enabled &&
      !entity.isFlagOn(EntityFlagEnum.hidden) &&
      !entity.isFlagOn(EntityFlagEnum.removed)
    ) {
      this._clipTaskMap.set(taskId, {
        taskFn,
        entity
      });

      this._signalHook.listen(entity.signalRemoved, () => {
        this._signalHook.unlisten(entity.signalRemoved);
        this.clearTask(taskId);
      });

      if (this._state === TaskManagerState.Finished) {
        this._state = TaskManagerState.Pending;
        this.clipTaskSignal.dispatch({
          state: TaskManagerState.Pending
        });
      }

      return {
        run: (...args: unknown[]): T => {
          this._state = TaskManagerState.Running;
          const result = taskFn(...args);
          this._completeTask(taskId);
          return result;
        },
        delete: () => {
          this.clearTask(taskId);
        }
      };
    }
  }

  private static _completeTask(taskId: string): void {
    this.clearTask(taskId);

    if (this._clipTaskMap.size === 0) {
      this._state = TaskManagerState.Finished;
      this.clipTaskSignal.dispatch({
        state: TaskManagerState.Finished
      });
    }
  }

  static clearTask(taskId: string): void {
    const task = this._clipTaskMap.get(taskId);

    if (task) {
      this._signalHook.unlisten(task.entity.signalRemoved);
      this._clipTaskMap.delete(taskId);
    }

    if (this._clipTaskMap.size === 0) {
      this._state = TaskManagerState.Finished;
    }
  }

  static clearAllTasks(): void {
    this._clipTaskMap = new Map();
    this._signalHook.unlistenAll();
    this._state = TaskManagerState.Finished;
  }
}