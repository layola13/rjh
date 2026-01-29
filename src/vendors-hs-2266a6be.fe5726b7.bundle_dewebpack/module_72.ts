import { LoggerName } from './914';
import { UsefulTimeLogger } from './129';

interface UserTrackLoggerOptions {
  loggerName?: string;
  freeBetweenTimeThreshold?: number;
}

interface PushOptions {
  triggerType?: string;
}

interface LogParams {
  betweenLogsDuration?: number;
  [key: string]: unknown;
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

interface PushLogEvent {
  id: string;
  params: LogParams;
  options?: PushOptions;
}

interface PushEndEvent extends PushLogEvent {
  log: unknown;
}

export class UserTrackLogger extends UsefulTimeLogger {
  private freeBetweenTimeThreshold: number;
  private lastTrackLog?: TrackLog;
  private extendLogger?: Record<string, UserTrackLogger>;

  constructor(options: UserTrackLoggerOptions) {
    super(options.loggerName || LoggerName.UserTrackLogger, options);
    this.freeBetweenTimeThreshold = options.freeBetweenTimeThreshold || 300000;
  }

  setEnableStatus(enabled: boolean): void {
    super.setEnableStatus(enabled);
    
    if (this.extendLogger) {
      Object.values(this.extendLogger).forEach((logger) => {
        logger.setEnableStatus(enabled);
      });
    }
  }

  push(id: string, params: LogParams, options?: PushOptions): unknown {
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

    const lastTime = lastLog.currentTime;
    const timeDiff = Date.now() - lastTime;

    if (timeDiff > 0 && timeDiff <= this.freeBetweenTimeThreshold) {
      if (!customizedInfo.group || customizedInfo.isCumulatingTime) {
        return timeDiff + customizedInfo.betweenLogsDuration;
      }
      return timeDiff;
    }

    return 0;
  }
}