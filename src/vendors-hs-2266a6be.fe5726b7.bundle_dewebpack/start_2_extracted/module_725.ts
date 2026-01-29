import { FpsUtil } from './fps-util';
import { LoggerName } from './logger-name';
import { UserTrackLogger } from './user-track-logger';

interface LoggerConfig {
  loggerName?: string;
}

interface LogOptions {
  enableNotes?: boolean;
  notSend?: boolean;
  ignoreFpsNull?: boolean;
  actionTypeSuffix?: string;
}

interface LogData {
  fps?: number | null;
  [key: string]: unknown;
}

export class PerformanceLogger extends UserTrackLogger {
  private fpsUtil: FpsUtil;

  constructor(config: LoggerConfig) {
    config.loggerName = LoggerName.PerformanceLogger;
    super(config);
    this.fpsUtil = new FpsUtil();
  }

  pushStartLog(
    eventName: string,
    data?: LogData,
    options?: LogOptions
  ): unknown {
    this.fpsUtil.start(eventName);
    return super.pushStartLog(eventName, data, {
      ...options,
      enableNotes: false,
      notSend: true
    });
  }

  pushEndLog(
    eventName: string,
    data?: LogData,
    options: LogOptions = {}
  ): unknown {
    const fps = this.fpsUtil.end(eventName);
    const enableNotes = !!fps || options.ignoreFpsNull;
    
    const logData = data || {};
    logData.fps = fps;

    return super.pushEndLog(eventName, logData, {
      ...options,
      enableNotes,
      actionTypeSuffix: ''
    });
  }

  protected _pushNotSentEnd(): void {
    // No implementation needed
  }
}