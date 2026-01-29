import { FpsUtil } from './FpsUtil';
import { LoggerName } from './LoggerName';
import { UserTrackLogger } from './UserTrackLogger';

interface LoggerConfig {
  loggerName?: LoggerName;
  [key: string]: unknown;
}

interface LogMetadata {
  [key: string]: unknown;
}

interface LogOptions {
  enableNotes?: boolean;
  notSend?: boolean;
  ignoreFpsNull?: boolean;
  actionTypeSuffix?: string;
}

interface EndLogMetadata extends LogMetadata {
  fps?: number | null;
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
    metadata?: LogMetadata,
    options?: LogOptions
  ): unknown {
    this.fpsUtil.start(eventName);
    return super.pushStartLog(eventName, metadata, {
      ...options,
      enableNotes: false,
      notSend: true
    });
  }

  pushEndLog(
    eventName: string,
    metadata?: EndLogMetadata,
    options?: LogOptions
  ): unknown {
    const fps = this.fpsUtil.end(eventName);
    const enableNotes = !!fps || !!options?.ignoreFpsNull;
    
    const endMetadata = metadata ?? {};
    endMetadata.fps = fps;

    return super.pushEndLog(eventName, endMetadata, {
      ...options,
      enableNotes,
      actionTypeSuffix: ''
    });
  }

  protected _pushNotSentEnd(): void {
    // No-op implementation
  }
}