import { StoreLogger } from './StoreLogger';

interface PushOptions {
  pushExtendLog?: ExtendLogConfig;
  [key: string]: unknown;
}

type ExtendLogConfig = {
  [key: string]: boolean | ExtendLogParams | unknown[];
};

interface ExtendLogParams {
  id: string;
  params: unknown;
  options: Record<string, unknown>;
}

interface ExtendLoggerConfig {
  [key: string]: StoreLogger | unknown;
}

export class ExtendLogger extends StoreLogger {
  private extendLogger: Record<string, StoreLogger>;

  constructor(id: string, config: { extendLogger?: ExtendLoggerConfig }) {
    super(id, config);
    this.extendLogger = this.getExtendLogger(config.extendLogger);
  }

  push(id: string, params: unknown, options?: PushOptions): unknown {
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

  private pushExtendLogger(extendLogConfig: ExtendLogConfig, context: ExtendLogParams): void {
    for (const key in extendLogConfig) {
      const logger = this.extendLogger[key];
      const logValue = extendLogConfig[key];

      if (!logger || logValue === false) {
        continue;
      }

      if (logValue === true) {
        this.pushLog(logger, context.id, context.params, context.options);
      } else if (Array.isArray(logValue)) {
        this.pushLog(logger, ...logValue);
      } else if (typeof logValue === 'object' && logValue !== null) {
        const typedLogValue = logValue as ExtendLogParams;
        this.pushLog(logger, typedLogValue.id, typedLogValue.params, typedLogValue.options);
      }
    }
  }

  private pushLog(logger: StoreLogger, id: string, params?: unknown, options?: Record<string, unknown>): unknown {
    return logger.push(id, params, options || {});
  }

  private getExtendLogger(config?: ExtendLoggerConfig): Record<string, StoreLogger> {
    if (!config) {
      return {};
    }

    const extendLoggers: Record<string, StoreLogger> = {};

    for (const key in config) {
      const value = config[key];
      if (value instanceof StoreLogger) {
        extendLoggers[key] = value;
      }
    }

    return extendLoggers;
  }
}