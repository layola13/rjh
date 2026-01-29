interface TaskParams {
  [key: string]: unknown;
}

interface TaskOptions {
  enableNotes?: boolean;
  actionTypeSuffix?: string;
  [key: string]: unknown;
}

interface TaskConfig {
  actionType: string;
  params?: TaskParams;
  options?: TaskOptions;
}

interface TaskInfo {
  time: number;
  timer?: number;
}

interface TaskMap {
  [actionType: string]: TaskInfo;
}

interface PerformanceLogger {
  push(actionType: string, params?: TaskParams, options?: TaskOptions): void;
}

interface Logger {
  performanceLogger: PerformanceLogger;
}

interface HSAppGlobal {
  Logger: Logger;
}

declare global {
  interface Window {
    HSApp: HSAppGlobal;
  }
}

const TASK_THRESHOLD_MS = 1000;

export class TimeTaskHandle {
  private static timeTaskHandle?: TimeTaskHandle;
  private taskMap: TaskMap = {};

  /**
   * Get singleton instance of TimeTaskHandle
   */
  static getTimeTaskHandle(): TimeTaskHandle {
    if (!TimeTaskHandle.timeTaskHandle) {
      TimeTaskHandle.timeTaskHandle = new TimeTaskHandle();
    }
    return TimeTaskHandle.timeTaskHandle;
  }

  /**
   * Start tracking a task
   */
  start(config: TaskConfig): void {
    const { actionType, params, options } = config;

    if (this.taskMap[actionType]) {
      const startTime = performance.now();
      this.taskMap[actionType].time = startTime;
    } else {
      window.HSApp.Logger.performanceLogger.push(actionType, params, {
        ...options,
        enableNotes: false
      });

      const startTime = performance.now();
      this.taskMap[actionType] = {
        time: startTime
      };
    }
  }

  /**
   * End tracking a task
   */
  end(config: TaskConfig): void {
    const { actionType, params, options } = config;
    const taskInfo = this.taskMap[actionType];

    if (!taskInfo) {
      return;
    }

    const endTime = performance.now();
    const elapsedTime = endTime - taskInfo.time;

    if (taskInfo.timer) {
      window.clearTimeout(taskInfo.timer);
    }

    if (elapsedTime >= TASK_THRESHOLD_MS) {
      window.HSApp.Logger.performanceLogger.push(actionType, params, {
        ...options,
        actionTypeSuffix: ""
      });
      delete this.taskMap[actionType];
      return;
    }

    taskInfo.timer = window.setTimeout(() => {
      window.HSApp.Logger.performanceLogger.push(actionType, params, {
        ...options,
        actionTypeSuffix: ""
      });
      delete this.taskMap[actionType];
    }, TASK_THRESHOLD_MS);
  }
}