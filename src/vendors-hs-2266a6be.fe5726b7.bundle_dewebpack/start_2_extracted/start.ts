export enum LogTriggerType {
  START = "start",
  END = "end",
  TRIGGER = "trigger"
}

interface LogOptions {
  currentTime?: number;
  performanceCurrentTime?: number;
  triggerType?: LogTriggerType;
  enableNotes?: boolean;
  actionTypeSuffix?: string;
  noDuration?: boolean;
  endParamsCallback?: (name: string, params: LogParams, options: LogOptions) => LogParams | undefined;
  validation?: ValidationRule[];
  notSend?: boolean;
}

interface LogParams {
  duration?: number;
  realDuration?: number;
  performanceDuration?: number;
  performanceRealDuration?: number;
  extendText?: string;
  [key: string]: unknown;
}

interface StartLogEntry {
  name: string;
  params: LogParams;
  options: LogOptions;
  endParamsCallback?: (name: string, params: LogParams, options: LogOptions) => LogParams | undefined;
  timestamp: number;
}

interface FreeTimeEntry {
  startTimestamp: number;
  endTimestamp: number;
  duration: number;
}

interface ValidationRule {
  field: string;
  check: (value: unknown) => { error: string };
}

interface UsefulTimeLoggerConfig {
  freeTimeThreshold?: number;
  onClose?: () => { name: string; params: LogParams } | undefined;
  storageType?: string;
}

interface CloseEvent {
  timeStartLogList: StartLogEntry[];
}

const DEFAULT_FREE_TIME_THRESHOLD = 3000;

export class UsefulTimeLogger extends DependOtherLogger {
  private timeStartLogList: StartLogEntry[] = [];
  private performanceTimeStartLogList: StartLogEntry[] = [];
  private freeTimeList: FreeTimeEntry[] = [];
  private performanceFreeTimeList: FreeTimeEntry[] = [];
  private freeTimeThreshold: number;
  private freeTimer: number | null = null;
  private freeStartTimestamp: number | null = null;
  private performanceFreeStartTimestamp: number | null = null;
  private onClose?: () => { name: string; params: LogParams } | undefined;
  private pushLogMap: Record<LogTriggerType, (name: string, params: LogParams, options: LogOptions) => unknown>;

  constructor(name: string, config: UsefulTimeLoggerConfig) {
    super(name, config);
    
    this.freeTimeThreshold = config?.freeTimeThreshold ?? DEFAULT_FREE_TIME_THRESHOLD;
    this.onClose = config.onClose;
    
    this.pushLogMap = {
      [LogTriggerType.START]: this.pushStartLog.bind(this),
      [LogTriggerType.END]: this.pushEndLog.bind(this),
      [LogTriggerType.TRIGGER]: this._pushLog.bind(this)
    };
    
    this._userOperation = this._userOperation.bind(this);
    this._unload = this._unload.bind(this);
    this._initEventListener();
    this.initLastNotEndLog();
  }

  public push(name: string, params?: LogParams, options?: LogOptions): unknown {
    const mergedParams = { ...params };
    const mergedOptions: LogOptions = {
      ...options,
      currentTime: options?.currentTime ?? Date.now(),
      performanceCurrentTime: options?.performanceCurrentTime ?? performanceDateNow()
    };

    let result: unknown = null;
    const triggerType = mergedOptions.triggerType ?? LogTriggerType.TRIGGER;
    const pushHandler = this.pushLogMap[triggerType];

    if (pushHandler) {
      result = pushHandler(name, mergedParams, mergedOptions);
    }

    if (this.timeStartLogList.length) {
      this._startFreeTimer();
    } else {
      this.freeTimeList = [];
    }

    return result;
  }

  private initLastNotEndLog(): void {
    const storage = new StorageManager(this.getNotEndLogStorageName(), {
      storageType: StorageTypes.localStorage
    });

    storage.get("not-send").then((logs: LogParams[] | null) => {
      storage.clear("not-send");
      if (logs) {
        logs.forEach((log) => {
          this.logSender.push(log, false);
        });
      }
    });
  }

  private pushStartLog(name: string, params: LogParams, options: LogOptions): unknown {
    const enableNotes = options.enableNotes ?? true;
    const actionTypeSuffix = options.actionTypeSuffix ?? ".Start";

    if (!options.noDuration) {
      this.timeStartLogList.push({
        name,
        params,
        options,
        endParamsCallback: options.endParamsCallback,
        timestamp: options.currentTime ?? Date.now()
      });

      this.performanceTimeStartLogList.push({
        name,
        params,
        options,
        endParamsCallback: options.endParamsCallback,
        timestamp: options.performanceCurrentTime ?? performanceDateNow()
      });
    }

    return enableNotes ? this._pushLog(`${name}${actionTypeSuffix}`, params, options) : null;
  }

  private pushEndLog(name: string, params: LogParams, options: LogOptions): unknown {
    const { noDuration, enableNotes = true } = options;
    const validation = this.getValidation();

    options.validation = options.validation ?? [];
    if (validation) {
      options.validation = options.validation.concat(validation);
    }

    if (this.timeStartLogList && !noDuration) {
      const startLog = this._getStartLog(name, this.timeStartLogList);
      const currentTime = options.currentTime ?? Date.now();

      if (startLog) {
        const freeTimeList = [...this.freeTimeList];
        if (this.freeStartTimestamp) {
          freeTimeList.push({
            startTimestamp: this.freeStartTimestamp,
            endTimestamp: currentTime,
            duration: currentTime - this.freeStartTimestamp
          });
        }

        const freeDuration = this._computerFreeDuration(startLog.timestamp, currentTime, freeTimeList);
        params.duration = currentTime - startLog.timestamp;
        params.realDuration = currentTime - startLog.timestamp - freeDuration;
      } else {
        params.duration = 0;
        params.realDuration = 0;
      }
    }

    if (this.performanceTimeStartLogList && !noDuration) {
      const startLog = this._getStartLog(name, this.performanceTimeStartLogList);
      const performanceCurrentTime = options.performanceCurrentTime ?? performanceDateNow();

      if (startLog) {
        const freeTimeList = [...this.performanceFreeTimeList];
        if (this.performanceFreeStartTimestamp) {
          freeTimeList.push({
            startTimestamp: this.performanceFreeStartTimestamp,
            endTimestamp: performanceCurrentTime,
            duration: performanceCurrentTime - this.performanceFreeStartTimestamp
          });
        }

        const freeDuration = this._computerFreeDuration(startLog.timestamp, performanceCurrentTime, freeTimeList);
        params.performanceDuration = performanceCurrentTime - startLog.timestamp;
        params.performanceRealDuration = performanceCurrentTime - startLog.timestamp - freeDuration;
      } else {
        params.performanceDuration = 0;
        params.performanceRealDuration = 0;
      }
    }

    this._removeStartLog(name);

    const actionTypeSuffix = options.actionTypeSuffix ?? ".End";
    return enableNotes ? this._pushLog(`${name}${actionTypeSuffix}`, params, options) : null;
  }

  private getValidation(): ValidationRule[] {
    return [
      {
        field: `${this.customizedName}.duration`,
        check: (value: unknown) => {
          return (value as number) >= 0 ? { error: "" } : { error: "不能为负" };
        }
      },
      {
        field: `${this.customizedName}.realDuration`,
        check: (value: unknown) => {
          return (value as number) >= 0 ? { error: "" } : { error: "不能为负" };
        }
      }
    ];
  }

  private _pushLog(name: string, params: LogParams, options: LogOptions): unknown {
    const mergedParams = { ...params };
    return super.push(name, mergedParams, options);
  }

  private _getStartLog(name: string, logList: StartLogEntry[]): StartLogEntry | null {
    for (let i = logList.length - 1; i >= 0; i--) {
      const log = logList[i];
      if (name === log.name) {
        return log;
      }
    }
    return null;
  }

  private _removeStartLog(name: string): void {
    this.timeStartLogList = this.timeStartLogList.filter((log) => log.name !== name);
    this.performanceTimeStartLogList = this.performanceTimeStartLogList.filter((log) => log.name !== name);
  }

  private _computerFreeDuration(startTime: number, endTime: number, freeTimeList: FreeTimeEntry[]): number {
    return freeTimeList.reduce((totalFreeDuration, freeTime) => {
      if (freeTime.endTimestamp <= startTime || freeTime.startTimestamp >= endTime) {
        return totalFreeDuration;
      }

      let overlapDuration = 0;

      if (freeTime.endTimestamp <= endTime && freeTime.startTimestamp >= startTime) {
        overlapDuration = freeTime.duration;
      } else if (freeTime.endTimestamp > startTime && freeTime.startTimestamp <= startTime && freeTime.endTimestamp < endTime) {
        overlapDuration = freeTime.endTimestamp - startTime;
      } else if (freeTime.endTimestamp > endTime && freeTime.startTimestamp < endTime && freeTime.startTimestamp > startTime) {
        overlapDuration = endTime - freeTime.startTimestamp;
      } else if (freeTime.startTimestamp <= startTime && freeTime.endTimestamp >= endTime) {
        overlapDuration = endTime - startTime;
      }

      return totalFreeDuration + overlapDuration;
    }, 0);
  }

  private _userOperation(): void {
    if (this.freeTimer) {
      window.clearTimeout(this.freeTimer);
      this.freeTimer = null;
    }

    if (this.freeStartTimestamp) {
      const startTimestamp = this.freeStartTimestamp;
      const endTimestamp = Date.now();

      if (this.timeStartLogList.length) {
        this.freeTimeList.push({
          startTimestamp,
          endTimestamp,
          duration: endTimestamp - startTimestamp
        });
      }

      this.freeStartTimestamp = null;
    }

    if (this.performanceFreeStartTimestamp) {
      const startTimestamp = this.performanceFreeStartTimestamp;
      const endTimestamp = performanceDateNow();

      if (this.performanceTimeStartLogList.length) {
        this.performanceFreeTimeList.push({
          startTimestamp,
          endTimestamp,
          duration: endTimestamp - startTimestamp
        });
      }

      this.performanceFreeStartTimestamp = null;
    }

    if (this.timeStartLogList.length) {
      this._startFreeTimer();
    }
  }

  private _startFreeTimer(): void {
    const currentTime = Date.now();
    const performanceCurrentTime = performanceDateNow();

    if (!this.freeTimer) {
      this.freeTimer = window.setTimeout(() => {
        this.freeTimer = null;
        this.freeStartTimestamp = currentTime;
        this.performanceFreeStartTimestamp = performanceCurrentTime;
      }, this.freeTimeThreshold);
    }
  }

  private _initEventListener(): void {
    window.addEventListener("keydown", this._userOperation, true);
    window.addEventListener("mousedown", this._userOperation, true);
    window.addEventListener("beforeunload", this._unload);
  }

  public destroy(): void {
    if (this.freeTimer) {
      clearTimeout(this.freeTimer);
      this.freeTimer = null;
    }

    window.removeEventListener("keydown", this._userOperation, true);
    window.removeEventListener("mousedown", this._userOperation, true);
    window.removeEventListener("beforeunload", this._unload);
  }

  private _unload(): void {
    this.emit("before-close", { timeStartLogList: this.timeStartLogList });
    this._pushNotSentEnd(this.freeTimeList, Date.now(), performanceDateNow());
    this.emit("close", { timeStartLogList: this.timeStartLogList });
    this.destroy();
  }

  private _pushNotSentEnd(freeTimeList: FreeTimeEntry[], currentTime: number, performanceCurrentTime: number): void {
    if (!this.enable) {
      return;
    }

    this.pauseSend();
    let notSentLogs: unknown[] = [];

    while (this.timeStartLogList.length > 0) {
      const startLog = this.timeStartLogList[this.timeStartLogList.length - 1];
      
      let endParams: LogParams;
      if (startLog.endParamsCallback) {
        endParams = {
          ...(startLog.endParamsCallback(startLog.name, startLog.params, startLog.options) ?? {}),
          extendText: "关闭软件"
        };
      } else {
        endParams = {
          ...(startLog.params ?? {}),
          extendText: "关闭软件"
        };
      }

      const logResult = this.push(startLog.name, endParams, {
        notSend: true,
        triggerType: LogTriggerType.END,
        currentTime,
        performanceCurrentTime
      });

      notSentLogs.push(logResult);
    }

    if (this.onClose) {
      const closeLog = this.onClose();
      if (closeLog) {
        const logResult = this.push(closeLog.name, closeLog.params, {
          notSend: true,
          currentTime,
          performanceCurrentTime
        });
        notSentLogs.push(logResult);
      }
    }

    if (notSentLogs.length) {
      const storage = new StorageManager(this.getNotEndLogStorageName(), {
        storageType: StorageTypes.localStorage
      });

      storage.get("not-send", (existingLogs: unknown[] | null) => {
        notSentLogs = [...(existingLogs ?? []), ...notSentLogs];
        storage.set("not-send", notSentLogs);
      });
    }
  }

  private getNotEndLogStorageName(): string {
    return `${this.name}-notEnd`;
  }
}

export function createLogger(name: string, config: UsefulTimeLoggerConfig): UsefulTimeLogger {
  return new UsefulTimeLogger(name, config);
}