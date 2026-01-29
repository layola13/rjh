import { ExtendLogger } from './47';
import LoggerManager from './285';
import { setKeyValue, getKeyValue, deleteKey } from './63';

interface DependLoggerConfig {
  dependLoggerName: string;
  dependKeyList?: string[];
  exceptionKeyList?: string[];
  dependLength?: number;
}

interface DependLoggerOptions {
  dependLoggerList?: DependLoggerConfig[];
}

interface UseDependLoggerOptions extends DependLoggerOptions {
  dependKey?: string;
}

interface LogParams {
  [key: string]: unknown;
  currentTime?: number;
}

interface LogEvent {
  params?: LogParams;
}

interface BeforeCollectEvent {
  logger: unknown;
  id: string | number;
  params: LogParams;
  options: unknown;
}

interface LoggerInitEvent {
  name: string;
  logger: ExtendLogger;
}

export class DependOtherLogger extends ExtendLogger {
  protected dependLogMap: Record<string, LogParams[]> = {};
  protected dependLoggerList: DependLoggerConfig[];

  constructor(name: string, options: DependLoggerOptions) {
    super(name, options);
    this.dependLoggerList = options.dependLoggerList || [];
    this.init();
  }

  protected init(): void {
    this.dependLoggerList.forEach((config) => {
      new Promise<ExtendLogger>((resolve) => {
        const logger = LoggerManager.getLogger(config.dependLoggerName);
        if (logger) {
          return resolve(logger);
        }

        const onLoggerInit = (event: LoggerInitEvent): void => {
          if (event.name === config.dependLoggerName) {
            const initializedLogger = event.logger;
            LoggerManager.off('logger-init', onLoggerInit);
            resolve(initializedLogger);
          }
        };

        LoggerManager.on('logger-init', onLoggerInit);
      }).then((logger) => {
        logger.on('log-pushed', (event: LogEvent) => {
          this.addDependLog(event, config.dependLoggerName);
        });
      });
    });
  }

  protected addDependLog(event: LogEvent, loggerName: string): void {
    const computedLog = this.computerDependLog(event.params || {}, loggerName);
    
    if (!computedLog) {
      return;
    }

    this.dependLogMap[loggerName] = this.dependLogMap[loggerName] || [];
    this.dependLogMap[loggerName].push(computedLog);

    const config = this.dependLoggerList.find(
      (item) => item.dependLoggerName === loggerName
    ) || {};

    if (config.dependLength && this.dependLogMap[loggerName].length > config.dependLength) {
      const removeCount = this.dependLogMap[loggerName].length - config.dependLength;
      this.dependLogMap[loggerName].splice(0, removeCount);
    }
  }

  protected computerDependLog(params: LogParams, loggerName: string): LogParams | undefined {
    const config = this.dependLoggerList.find(
      (item) => item.dependLoggerName === loggerName
    );

    if (!config) {
      return undefined;
    }

    let result: LogParams;

    if (config.dependKeyList) {
      result = {};
      config.dependKeyList.forEach((key) => {
        setKeyValue(result, key, getKeyValue(params, key));
      });
    } else {
      result = JSON.parse(JSON.stringify(params));
    }

    if (config.exceptionKeyList) {
      config.exceptionKeyList.forEach((key) => {
        deleteKey(result, key);
      });
    }

    return result;
  }
}

export class UseDependOtherLogger extends DependOtherLogger {
  protected dependKey: string;

  constructor(name: string, options: UseDependLoggerOptions) {
    super(name, options);
    this.dependKey = options.dependKey || '';
    this.on('log-before-collect', this.beforeCollect);
  }

  protected beforeCollect = (event: BeforeCollectEvent): void => {
    const { logger, id, params, options } = event;
    const usedLog = this.getUseLog({ logger, id, params, options });
    
    if (usedLog) {
      params[this.dependKey] = usedLog;
    }
  };

  protected getDependLog(): LogParams[] {
    let allLogs: LogParams[] = [];

    Object.values(this.dependLogMap).forEach((logs) => {
      allLogs = [...allLogs, ...logs];
    });

    allLogs.sort((a, b) => (a.currentTime || 0) - (b.currentTime || 0));

    return allLogs;
  }

  protected getUseLog(event: BeforeCollectEvent): LogParams[] {
    return this.getDependLog();
  }
}