import { LoggerName } from './914';
import { UsefulTimeLogger } from './129';

interface UserTrackLoggerConfig {
  loggerName?: LoggerName;
  freeBetweenTimeThreshold?: number;
}

interface PushOptions {
  triggerType?: string;
}

interface CustomizedInfo {
  group?: string;
  isCumulatingTime?: boolean;
  betweenLogsDuration: number;
}

interface TrackLog {
  actionType?: string;
  customizedInfo?: CustomizedInfo;
  currentTime: number;
}

interface LogParams {
  betweenLogsDuration: number;
  [key: string]: unknown;
}

interface ExtendLogger {
  setEnableStatus(enabled: boolean): void;
}

const FREE_BETWEEN_TIME_THRESHOLD_DEFAULT = 300000;

export class UserTrackLogger extends UsefulTimeLogger {
  private freeBetweenTimeThreshold: number;
  private lastTrackLog?: TrackLog;
  private extendLogger?: Record<string, ExtendLogger>;

  constructor(config: UserTrackLoggerConfig) {
    const loggerName = config.loggerName || LoggerName.UserTrackLogger;
    super(loggerName, config);
    this.freeBetweenTimeThreshold = config.freeBetweenTimeThreshold || FREE_BETWEEN_TIME_THRESHOLD_DEFAULT;
  }

  public setEnableStatus(enabled: boolean): void {
    super.setEnableStatus(enabled);
    if (this.extendLogger) {
      Object.values(this.extendLogger).forEach((logger) => {
        logger.setEnableStatus(enabled);
      });
    }
  }

  public push(id: string, params: LogParams, options?: PushOptions): unknown {
    this.emit('usertack-push-log', {
      id,
      params,
      options
    });

    const triggerType = options?.triggerType || '';
    params.betweenLogsDuration = this.getDurationBetweenLogs(triggerType);

    const log = super.push(id, params, options);

    this.emit('usertack-push-end', {
      id,
      params,
      options,
      log
    });

    return log;
  }

  private getDurationBetweenLogs(triggerType: string): number {
    const lastLog = this.lastTrackLog;
    const customizedInfo = lastLog?.customizedInfo;

    if (!lastLog || (lastLog && (!lastLog.actionType || !customizedInfo)) || triggerType === 'end') {
      return 0;
    }

    const lastLogTime = lastLog.currentTime;
    const timeDifference = Date.now() - lastLogTime;

    if (timeDifference > 0 && timeDifference <= this.freeBetweenTimeThreshold) {
      let duration = timeDifference;
      if (!customizedInfo.group || customizedInfo.isCumulatingTime) {
        duration += customizedInfo.betweenLogsDuration;
      }
      return duration;
    }

    return 0;
  }
}