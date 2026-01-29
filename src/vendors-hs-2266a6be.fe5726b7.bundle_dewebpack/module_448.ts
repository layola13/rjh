import { UsefulTimeLogger } from './UsefulTimeLogger';
import { LoggerName } from './LoggerName';

export interface DependLogger {
  dependLoggerName: string;
  dependLength: number;
  dependKeyList: string[];
}

export interface ApiLoggerConfig {
  dependLoggerList: DependLogger[];
}

export const apiLoggerConfig: ApiLoggerConfig = {
  dependLoggerList: [
    {
      dependLoggerName: LoggerName.UserTrackLogger,
      dependLength: 1,
      dependKeyList: ["traceId"]
    }
  ]
};

export interface CollecterConfig {
  linkUserTraceId?: () => string | undefined;
  [key: string]: unknown;
}

export interface LogParamsCollecterOptions {
  collecterConfig?: CollecterConfig;
}

export interface ApiLoggerOptions {
  logParamsCollecterOptions?: LogParamsCollecterOptions;
  dependLoggerList?: DependLogger[];
}

interface DependLogEntry {
  traceId?: string;
  [key: string]: unknown;
}

export class ApiLogger extends UsefulTimeLogger {
  private static logger: ApiLogger;
  protected dependLogMap: Record<string, DependLogEntry[]>;

  constructor(options: ApiLoggerOptions) {
    if (ApiLogger.logger) {
      return ApiLogger.logger;
    }

    options.logParamsCollecterOptions = options.logParamsCollecterOptions || {};

    const collecterConfig: CollecterConfig = {
      ...(options.logParamsCollecterOptions.collecterConfig || {})
    };

    collecterConfig.linkUserTraceId = (): string | undefined => {
      const dependLogs = this.dependLogMap[LoggerName.UserTrackLogger] || [];
      return dependLogs.length ? dependLogs[dependLogs.length - 1].traceId : undefined;
    };

    options.logParamsCollecterOptions.collecterConfig = collecterConfig;
    options.dependLoggerList = options.dependLoggerList || apiLoggerConfig.dependLoggerList;

    super(LoggerName.MtopApiLogger, options);

    ApiLogger.logger = this;
  }
}