import { HSCore } from './hscore';

export const ResourceLoadingStatusEnum = {
  NotStarted: "notstated",
  InProgress: "inprogress",
  Completed: "completed",
  Failed: "failed",
  Canceled: "canceled"
} as const;

Object.freeze(ResourceLoadingStatusEnum);

export type ResourceLoadingStatus = typeof ResourceLoadingStatusEnum[keyof typeof ResourceLoadingStatusEnum];

export const ContentResourceLoadingTaskEnum = {
  model: "model",
  texture: "texture",
  topViewImage: "topviewimage",
  normalTexture: "normaltexture",
  background: "background"
} as const;

Object.freeze(ContentResourceLoadingTaskEnum);

export type ContentResourceLoadingTask = typeof ContentResourceLoadingTaskEnum[keyof typeof ContentResourceLoadingTaskEnum];

interface LoadingStatusChangedEvent {
  status: ResourceLoadingStatus;
  task: LoadingTask;
}

class LoadingTask {
  private _id: string;
  private _status: ResourceLoadingStatus;
  private _url?: string;
  public entity: unknown;
  public signalStatusChanged: HSCore.Util.Signal<LoadingStatusChangedEvent>;

  constructor(id: string, entity: unknown, status?: ResourceLoadingStatus) {
    this._id = id;
    this.entity = entity;
    this._status = status || ResourceLoadingStatusEnum.NotStarted;
    this.signalStatusChanged = new HSCore.Util.Signal(this);
  }

  get status(): ResourceLoadingStatus {
    return this._status;
  }

  set status(value: ResourceLoadingStatus) {
    if (value !== this._status) {
      this._status = value;
      this.signalStatusChanged.dispatch({
        status: value,
        task: this
      });
    }
  }

  get url(): string | undefined {
    return this._url;
  }

  set url(value: string | undefined) {
    this._url = value;
  }
}

interface FlushEvent {
  firstFlush: boolean;
}

interface StatusChangedEventData {
  data: LoadingStatusChangedEvent;
}

export class LoadingTaskManager {
  private static _instance?: LoadingTaskManager;
  private _isFirstFlush: boolean = true;
  private _tasks: Set<LoadingTask> = new Set();
  private _inProgressTask: Set<LoadingTask> = new Set();
  public signalHook: HSCore.Util.SignalHook;
  public signalTaskStatusHook: HSCore.Util.SignalHook;
  public signalFlushBegin: HSCore.Util.Signal<FlushEvent>;
  public signalFlushEnd: HSCore.Util.Signal<FlushEvent>;

  constructor() {
    this.signalHook = new HSCore.Util.SignalHook(this);
    this.signalTaskStatusHook = new HSCore.Util.SignalHook(this);
    this.signalFlushBegin = new HSCore.Util.Signal(this);
    this.signalFlushEnd = new HSCore.Util.Signal(this);

    const app = HSApp.App.getApp();
    this.signalHook.listen(app.signalDocumentOpening, this.onDocumentOpening);
  }

  private onDocumentOpening(): void {
    this.clear();
    this._isFirstFlush = true;
  }

  public addTask(task: LoadingTask): void {
    if (task) {
      this.signalTaskStatusHook.listen(task.signalStatusChanged, this.onLoadingStatusChanged);
      this._tasks.add(task);
    }
  }

  public removeTask(task: LoadingTask): void {
    if (task) {
      this.signalTaskStatusHook.unlisten(task.signalStatusChanged);
      this._tasks.delete(task);
      this._inProgressTask.delete(task);
    }
  }

  private onLoadingStatusChanged(event: StatusChangedEventData): void {
    const task = event.data.task;

    switch (task.status) {
      case ResourceLoadingStatusEnum.InProgress:
        this._inProgressTask.add(task);
        if (this._inProgressTask.size === 1) {
          this.signalFlushBegin.dispatch({
            firstFlush: this._isFirstFlush
          });
        }
        break;

      case ResourceLoadingStatusEnum.Completed:
      case ResourceLoadingStatusEnum.Failed:
      case ResourceLoadingStatusEnum.Canceled:
        this._inProgressTask.delete(task);
        if (this._inProgressTask.size === 0) {
          this.signalFlushEnd.dispatch({
            firstFlush: this._isFirstFlush
          });
          this.clear();
          this._isFirstFlush = false;
        }
        break;
    }
  }

  public clear(): void {
    this._tasks.clear();
    this.signalTaskStatusHook.unlistenAll();
  }

  get loadingCount(): number {
    return this._inProgressTask.size;
  }

  public getInProgressTasks(): LoadingTask[] {
    return this._filterTasks(ResourceLoadingStatusEnum.InProgress);
  }

  public getCompletedTasks(): LoadingTask[] {
    return this._filterTasks(ResourceLoadingStatusEnum.Completed);
  }

  public getFailedTasks(): LoadingTask[] {
    return this._filterTasks(ResourceLoadingStatusEnum.Failed);
  }

  private _filterTasks(status: ResourceLoadingStatus): LoadingTask[] {
    return Array.from(this._tasks).filter((task) => task.status === status);
  }

  public static instance(): LoadingTaskManager {
    LoadingTaskManager._instance = LoadingTaskManager._instance || new LoadingTaskManager();
    return LoadingTaskManager._instance;
  }
}

interface Logger {
  error(message: string): void;
  warning(message: string): void;
}

interface ErrorInfo {
  info: string;
  path: {
    file: string;
    functionName: string;
  };
}

interface ErrorLogEntry {
  errorStack: Error;
  description: string;
  errorInfo: ErrorInfo;
}

export class LoadingTasks {
  private logger: Logger;
  private _entity: unknown;
  private loadingTasksByTaskId: Record<string, LoadingTask> = {};

  constructor(entity: unknown, tasks: Map<string, string> | string[] | Record<string, string>) {
    this.logger = log.logger("HSApp.View.Base.LoadingTasks");
    this._entity = entity;

    let taskArray: string[];

    if (tasks instanceof Map) {
      taskArray = Array.from(tasks.values());
    } else if (Array.isArray(tasks)) {
      taskArray = tasks;
    } else {
      taskArray = Object.keys(tasks).map((key) => tasks[key]);
    }

    taskArray.forEach((taskId) => {
      const task = new LoadingTask(taskId, this._entity);
      this.loadingTasksByTaskId[taskId] = task;
      LoadingTaskManager.instance().addTask(task);
    });
  }

  public resetStatus(taskIds?: string[]): void {
    const ids = taskIds || Object.keys(this.loadingTasksByTaskId);
    ids.forEach((taskId) => {
      this.loadingTasksByTaskId[taskId].status = ResourceLoadingStatusEnum.NotStarted;
    });
  }

  public dispose(): void {
    Object.values(this.loadingTasksByTaskId).forEach((task) => {
      LoadingTaskManager.instance().removeTask(task);
    });
    this.loadingTasksByTaskId = {};
  }

  public onLoadingTaskBegin(taskId: string, url: string): void {
    const task = this.loadingTasksByTaskId[taskId];

    if (task) {
      if (task.status !== ResourceLoadingStatusEnum.InProgress) {
        task.url = url;
        task.status = ResourceLoadingStatusEnum.InProgress;
      } else if (DEBUG) {
        console.warn("Loading tasks already began.");
      }
    } else {
      this.logger.error("unknown task:" + taskId);
      const errorMessage = `Load task begin, task is unknow.taskId: ${taskId}, url: ${url}`;
      HSApp.App.getApp().errorLogger.push(errorMessage, {
        errorStack: new Error(errorMessage),
        description: errorMessage,
        errorInfo: {
          info: errorMessage,
          path: {
            file: "homestyler-tools-web/web/app/view/base/loadingtasks.js",
            functionName: "onLoadingTaskBegin()"
          }
        }
      }, {});
    }
  }

  public onLoadingTaskCompleted(taskId: string): void {
    const task = this.loadingTasksByTaskId[taskId];

    if (task) {
      if (task.status === ResourceLoadingStatusEnum.InProgress) {
        task.status = ResourceLoadingStatusEnum.Completed;
      } else if (DEBUG) {
        console.warn("marking complete to a task that is not inprogress");
      }
    } else {
      this.logger.error("unknown task:" + taskId);
      const errorMessage = `Load task complete, task is unknow.taskId: ${taskId}`;
      HSApp.App.getApp().errorLogger.push(errorMessage, {
        errorStack: new Error(errorMessage),
        description: errorMessage,
        errorInfo: {
          info: errorMessage,
          path: {
            file: "homestyler-tools-web/web/app/view/base/loadingtasks.js",
            functionName: "onLoadingTaskCompleted()"
          }
        }
      }, {});
    }
  }

  public onLoadingTaskFailed(taskId: string): void {
    const task = this.loadingTasksByTaskId[taskId];

    if (task) {
      if (task.status === ResourceLoadingStatusEnum.InProgress) {
        task.status = ResourceLoadingStatusEnum.Failed;
      } else {
        this.logger.warning("marking failed to a task that is not inprogress");
      }
    } else {
      this.logger.error("unknown task:" + taskId);
      const errorMessage = `Load task failed, task is unknow.taskId: ${taskId}`;
      HSApp.App.getApp().errorLogger.push(errorMessage, {
        errorStack: new Error(errorMessage),
        description: errorMessage,
        errorInfo: {
          info: errorMessage,
          path: {
            file: "homestyler-tools-web/web/app/view/base/loadingtasks.js",
            functionName: "onLoadingTaskFailed()"
          }
        }
      }, {});
    }
  }
}