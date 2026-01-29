import { UsefulTimeLogger } from './UsefulTimeLogger';
import { LoggerName } from './LoggerName';

interface DependLogger {
  dependLoggerName: string;
  dependLength: number;
  dependKeyList: string[];
}

interface ApiLoggerConfig {
  dependLoggerList: DependLogger[];
}

export const apiLoggerConfig: ApiLoggerConfig = {
  dependLoggerList: [
    {
      dependLoggerName: LoggerName.UserTrackLogger,
      dependLength: 1,
      dependKeyList: ['traceId']
    }
  ]
};

interface CollecterConfig {
  linkUserTraceId?: () => string | undefined;
  [key: string]: unknown;
}

interface LogParamsCollecterOptions {
  collecterConfig?: CollecterConfig;
}

interface ApiLoggerOptions {
  logParamsCollecterOptions?: LogParamsCollecterOptions;
  dependLoggerList?: DependLogger[];
}

interface DependLogEntry {
  traceId?: string;
  [key: string]: unknown;
}

export class ApiLogger extends UsefulTimeLogger {
  private static logger: ApiLogger;
  private dependLogMap: Record<string, DependLogEntry[]> = {};

  constructor(options: ApiLoggerOptions) {
    if (ApiLogger.logger) {
      return ApiLogger.logger;
    }

    options.logParamsCollecterOptions = options.logParamsCollecterOptions || {};

    const collecterConfig: CollecterConfig = {
      ...(options.logParamsCollecterOptions.collecterConfig || {})
    };

    collecterConfig.linkUserTraceId = () => {
      const userTrackLogs = this.dependLogMap[LoggerName.UserTrackLogger] || [];
      return userTrackLogs.length ? userTrackLogs[userTrackLogs.length - 1].traceId : undefined;
    };

    options.logParamsCollecterOptions.collecterConfig = collecterConfig;
    options.dependLoggerList = options.dependLoggerList || apiLoggerConfig.dependLoggerList;

    super(LoggerName.MtopApiLogger, options);

    ApiLogger.logger = this;
  }
}