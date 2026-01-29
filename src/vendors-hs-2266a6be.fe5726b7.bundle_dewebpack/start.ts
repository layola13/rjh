export enum LogTriggerType {
  START = "start",
  END = "end",
  TRIGGER = "trigger"
}

interface LogParams {
  duration?: number;
  realDuration?: number;
  performanceDuration?: number;
  performanceRealDuration?: number;
  extendText?: string;
  [key: string]: unknown;
}

interface PushOptions {
  currentTime?: number;
  performanceCurrentTime?: number;
  triggerType?: LogTriggerType;
  enableNotes?: boolean;
  actionTypeSuffix?: string;
  noDuration?: boolean;
  endParamsCallback?: EndParamsCallback;
  validation?: ValidationRule[];
  notSend?: boolean;
}

interface ValidationRule {
  field: string;
  check: (value: unknown) => { error: string };
}

interface TimeStartLog {
  name: string;
  params: LogParams;
  options: PushOptions;
  endParamsCallback?: EndParamsCallback;
  timestamp: number;
}

interface FreeTimeRecord {
  startTimestamp: number;
  endTimestamp: number;
  duration: number;
}

interface UsefulTimeLoggerConfig {
  freeTimeThreshold?: number;
  onClose?: () => { name: string; params: LogParams } | void;
  storageType?: string;
}

interface BeforeCloseEvent {
  timeStartLogList: TimeStartLog[];
}

type EndParamsCallback = (name: string, params: LogParams, options: PushOptions) => LogParams | undefined;

type PushLogFunction = (name: string, params: LogParams, options: PushOptions) => unknown;

export class UsefulTimeLogger extends DependOtherLogger {
  private timeStartLogList: TimeStartLog[] = [];
  private performanceTimeStartLogList: TimeStartLog[] = [];
  private freeTimeList: FreeTimeRecord[] = [];
  private performanceFreeTimeList: FreeTimeRecord[] = [];
  private freeTimeThreshold: number;
  private freeTimer: number | null = null;
  private freeStartTimestamp: number | null = null;
  private performanceFreeStartTimestamp: number | null = null;
  private onClose?: () => { name: string; params: LogParams } | void;
  private pushLogMap: Record<LogTriggerType, PushLogFunction>;

  constructor(name: string, config: UsefulTimeLoggerConfig) {
    super(name, config);
    
    this.freeTimeThreshold = config?.freeTimeThreshold ?? DEFAULT_FREE_TIME_THRESHOLD;
    this.onClose = config.onClose;
    
    this.pushLogMap = {
      [LogTriggerType.START]: this.pushStartLog.bind(this),
      [LogTriggerType.END]: this.pushEndLog.bind(this),
      [LogTriggerType.TRIGGER]: this._pushLog.bind(this)
    };
    
    this._initEventListener();
    this.initLastNotEndLog();
  }

  public push(name: string, params: LogParams = {}, options: PushOptions = {}): unknown {
    const mergedParams = { ...params };
    options.currentTime = options.currentTime ?? Date.now();
    options.performanceCurrentTime = options.performanceCurrentTime ?? performanceDateNow();
    
    let result: unknown = null;
    const triggerType = options.triggerType ?? LogTriggerType.TRIGGER;
    const pushFunction = this.pushLogMap[triggerType];
    
    if (pushFunction) {
      result = pushFunction(name, mergedParams, options);
    }
    
    if (this.timeStartLogList.length) {
      this._startFreeTimer();
    } else {
      this.freeTimeList = [];
    }
    
    return result;
  }

  private initLastNotEndLog(): void {
    const storage = new Storage(this.getNotEndLogStorageName(), {
      storageType: StorageTypes.localStorage
    });
    
    storage.get("not-send").then((notSentLogs: unknown[]) => {
      storage.clear("not-send");
      if (notSentLogs) {
        notSentLogs.forEach((log) => {
          this.logSender.push(log, false);
        });
      }
    });
  }

  private pushStartLog(name: string, params: LogParams, options: PushOptions): unknown {
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

  private pushEndLog(name: string, params: LogParams, options: PushOptions): unknown {
    const { noDuration, enableNotes = true } = options;
    const validation = this.getValidation();
    
    options.validation = options.validation ?? [];
    if (validation) {
      options.validation = [...options.validation, ...validation];
    }
    
    if (this.timeStartLogList && !noDuration) {
      const startLog = this._getStartLog(name, this.timeStartLogList);
      const currentTime = options.currentTime ?? Date.now();
      
      if (startLog) {
        const freeTimeRecords = [...this.freeTimeList];
        if (this.freeStartTimestamp) {
          freeTimeRecords.push({
            startTimestamp: this.freeStartTimestamp,
            endTimestamp: currentTime,
            duration: currentTime - this.freeStartTimestamp
          });
        }
        
        const freeDuration = this._computerFreeDuration(startLog.timestamp, currentTime, freeTimeRecords);
        params.duration = currentTime - startLog.timestamp;
        params.realDuration = currentTime - startLog.timestamp - freeDuration;
      } else {
        params.duration = 0;
        params.realDuration = 0;
      }
    }
    
    if (this.performanceTimeStartLogList && !noDuration) {
      const startLog = this._getStartLog(name, this.performanceTimeStartLogList);
      const performanceTime = options.performanceCurrentTime ?? performanceDateNow();
      
      if (startLog) {
        const freeTimeRecords = [...this.performanceFreeTimeList];
        if (this.performanceFreeStartTimestamp) {
          freeTimeRecords.push({
            startTimestamp: this.performanceFreeStartTimestamp,
            endTimestamp: performanceTime,
            duration: performanceTime - this.performanceFreeStartTimestamp
          });
        }
        
        const freeDuration = this._computerFreeDuration(startLog.timestamp, performanceTime, freeTimeRecords);
        params.performanceDuration = performanceTime - startLog.timestamp;
        params.performanceRealDuration = performanceTime - startLog.timestamp - freeDuration;
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
        check: (value: unknown) => 
          (value as number) >= 0 ? { error: "" } : { error: "不能为负" }
      },
      {
        field: `${this.customizedName}.realDuration`,
        check: (value: unknown) => 
          (value as number) >= 0 ? { error: "" } : { error: "不能为负" }
      }
    ];
  }

  private _pushLog(name: string, params: LogParams, options: PushOptions): unknown {
    const mergedParams = { ...params };
    return super.push(name, mergedParams, options);
  }

  private _getStartLog(name: string, logList: TimeStartLog[]): TimeStartLog | null {
    for (let i = logList.length - 1; i >= 0; i--) {
      const log = logList[i];
      if (name === log.name) {
        return log;
      }
    }
    return null;
  }

  private _removeStartLog(name: string): void {
    this.timeStartLogList = this.timeStartLogList.filter(log => log.name !== name);
    this.performanceTimeStartLogList = this.performanceTimeStartLogList.filter(log => log.name !== name);
  }

  private _computerFreeDuration(startTime: number, endTime: number, freeTimeRecords: FreeTimeRecord[]): number {
    return freeTimeRecords.reduce((totalFreeDuration, record) => {
      if (record.endTimestamp <= startTime || record.startTimestamp >= endTime) {
        return totalFreeDuration;
      }
      
      let freeDuration = 0;
      
      if (record.endTimestamp <= endTime && record.startTimestamp >= startTime) {
        freeDuration = record.duration;
      } else if (record.endTimestamp > startTime && record.startTimestamp <= startTime && record.endTimestamp < endTime) {
        freeDuration = record.endTimestamp - startTime;
      } else if (record.endTimestamp > endTime && record.startTimestamp < endTime && record.startTimestamp > startTime) {
        freeDuration = endTime - record.startTimestamp;
      } else if (record.startTimestamp <= startTime && record.endTimestamp >= endTime) {
        freeDuration = endTime - startTime;
      }
      
      return totalFreeDuration + freeDuration;
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
    const performanceTime = performanceDateNow();
    
    if (!this.freeTimer) {
      this.freeTimer = window.setTimeout(() => {
        this.freeTimer = null;
        this.freeStartTimestamp = currentTime;
        this.performanceFreeStartTimestamp = performanceTime;
      }, this.freeTimeThreshold);
    }
  }

  private _initEventListener(): void {
    window.addEventListener("keydown", this._userOperation.bind(this), true);
    window.addEventListener("mousedown", this._userOperation.bind(this), true);
    window.addEventListener("beforeunload", this._unload.bind(this));
  }

  public destroy(): void {
    if (this.freeTimer) {
      clearTimeout(this.freeTimer);
      this.freeTimer = null;
    }
    
    window.removeEventListener("keydown", this._userOperation.bind(this), true);
    window.removeEventListener("mousedown", this._userOperation.bind(this), true);
    window.removeEventListener("beforeunload", this._unload.bind(this));
  }

  private _unload(): void {
    this.emit("before-close", {
      timeStartLogList: this.timeStartLogList
    });
    
    this._pushNotSentEnd(this.freeTimeList, Date.now(), performanceDateNow());
    
    this.emit("close", {
      timeStartLogList: this.timeStartLogList
    });
    
    this.destroy();
  }

  private _pushNotSentEnd(freeTimeList: FreeTimeRecord[], currentTime: number, performanceTime: number): void {
    if (!this.enable) {
      return;
    }
    
    this.pauseSend();
    const notSentLogs: unknown[] = [];
    
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
      
      const log = this.push(startLog.name, endParams, {
        notSend: true,
        triggerType: LogTriggerType.END,
        currentTime,
        performanceCurrentTime: performanceTime
      });
      
      notSentLogs.push(log);
    }
    
    if (this.onClose) {
      const closeLog = this.onClose();
      if (closeLog) {
        const log = this.push(closeLog.name, closeLog.params, {
          notSend: true,
          currentTime,
          performanceCurrentTime: performanceTime
        });
        notSentLogs.push(log);
      }
    }
    
    if (notSentLogs.length) {
      const storage = new Storage(this.getNotEndLogStorageName(), {
        storageType: StorageTypes.localStorage
      });
      
      storage.get("not-send", (existingLogs: unknown[]) => {
        const allLogs = [...(existingLogs ?? []), ...notSentLogs];
        storage.set("not-send", allLogs);
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