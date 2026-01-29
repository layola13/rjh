import { StoreLogger } from './StoreLogger';

interface PushOptions {
  pushExtendLog?: ExtendLogConfig;
  [key: string]: unknown;
}

interface ExtendLogConfig {
  [loggerName: string]: boolean | unknown[] | ExtendLogParams;
}

interface ExtendLogParams {
  id: string;
  params?: unknown;
  options?: Record<string, unknown>;
}

interface ExtendLoggerMap {
  [key: string]: StoreLogger;
}

interface ExtendLoggerOptions {
  extendLogger?: Record<string, unknown>;
  [key: string]: unknown;
}

interface PushContext {
  id: string;
  params?: unknown;
  options: Record<string, unknown>;
}

export class ExtendLogger extends StoreLogger {
  private extendLogger: ExtendLoggerMap;

  constructor(id: string, options: ExtendLoggerOptions) {
    super(id, options);
    this.extendLogger = this.getExtendLogger(options.extendLogger);
  }

  push(id: string, params?: unknown, options?: PushOptions): unknown {
    const { pushExtendLog, ...restOptions } = options || {};
    const result = super.push(id, params, restOptions);

    if (pushExtendLog) {
      this.pushExtendLogger(pushExtendLog, {
        id,
        params,
        options: restOptions
      });
    }

    return result;
  }

  private pushExtendLogger(config: ExtendLogConfig, context: PushContext): void {
    for (const loggerName in config) {
      const logger = this.extendLogger[loggerName];
      const logConfig = config[loggerName];

      if (!logger || logConfig === false) {
        continue;
      }

      if (logConfig === true) {
        this.pushLog(logger, context.id, context.params, context.options);
      } else if (Array.isArray(logConfig)) {
        this.pushLog(logger, ...logConfig);
      } else {
        const params = logConfig as ExtendLogParams;
        this.pushLog(logger, params.id, params.params, params.options);
      }
    }
  }

  private pushLog(
    logger: StoreLogger,
    id: string,
    params?: unknown,
    options?: Record<string, unknown>
  ): unknown {
    return logger.push(id, params, options || {});
  }

  private getExtendLogger(config?: Record<string, unknown>): ExtendLoggerMap {
    if (!config) {
      return {};
    }

    const extendLoggerMap: ExtendLoggerMap = {};

    for (const key in config) {
      const value = config[key];
      if (value instanceof StoreLogger) {
        extendLoggerMap[key] = value;
      }
    }

    return extendLoggerMap;
  }
}