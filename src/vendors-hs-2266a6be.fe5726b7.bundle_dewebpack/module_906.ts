import { ExtendLogger } from './47';
import LoggerManager from './285';
import { setKeyValue, getKeyValue, deleteKey } from './63';

interface DependLoggerConfig {
  dependLoggerName: string;
  dependKeyList?: string[];
  exceptionKeyList?: string[];
  dependLength?: number;
}

interface DependOtherLoggerOptions {
  dependLoggerList?: DependLoggerConfig[];
}

interface UseDependOtherLoggerOptions extends DependOtherLoggerOptions {
  dependKey?: string;
}

interface LogParams {
  [key: string]: unknown;
  currentTime?: number;
}

interface LogEvent {
  params?: LogParams;
}

interface LogCollectEvent {
  logger: unknown;
  id: string | number;
  params: LogParams;
  options: unknown;
}

export class DependOtherLogger extends ExtendLogger {
  protected dependLogMap: Record<string, LogParams[]> = {};
  protected dependLoggerList: DependLoggerConfig[];

  constructor(name: string, options: DependOtherLoggerOptions) {
    super(name, options);
    this.dependLoggerList = options.dependLoggerList ?? [];
    this.init();
  }

  protected init(): void {
    this.dependLoggerList.forEach((config) => {
      new Promise<unknown>((resolve) => {
        let logger = LoggerManager.getLogger(config.dependLoggerName);
        if (logger) {
          return resolve(logger);
        }

        const onLoggerInit = (event: { name: string; logger: unknown }): void => {
          if (event.name === config.dependLoggerName) {
            logger = event.logger;
            LoggerManager.off('logger-init', onLoggerInit);
            resolve(logger);
          }
        };

        LoggerManager.on('logger-init', onLoggerInit);
      }).then((logger: any) => {
        logger.on('log-pushed', (event: LogEvent) => {
          this.addDependLog(event, config.dependLoggerName);
        });
      });
    });
  }

  protected addDependLog(event: LogEvent, dependLoggerName: string): void {
    const dependLog = this.computerDependLog(event.params ?? {}, dependLoggerName);
    if (!dependLog) {
      return;
    }

    this.dependLogMap[dependLoggerName] = this.dependLogMap[dependLoggerName] ?? [];
    this.dependLogMap[dependLoggerName].push(dependLog);

    const config = this.dependLoggerList.find(
      (item) => item.dependLoggerName === dependLoggerName
    ) ?? {};

    if (config.dependLength && this.dependLogMap[dependLoggerName].length > config.dependLength) {
      const excessCount = this.dependLogMap[dependLoggerName].length - config.dependLength;
      this.dependLogMap[dependLoggerName].splice(0, excessCount);
    }
  }

  protected computerDependLog(params: LogParams, dependLoggerName: string): LogParams | undefined {
    const config = this.dependLoggerList.find(
      (item) => item.dependLoggerName === dependLoggerName
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

  constructor(name: string, options: UseDependOtherLoggerOptions) {
    super(name, options);
    this.dependKey = options.dependKey ?? '';
    this.on('log-before-collect', this.beforeCollect);
  }

  protected beforeCollect = (event: LogCollectEvent): void => {
    const { logger, id, params, options } = event;
    const useLog = this.getUseLog({ logger, id, params, options });
    if (useLog) {
      params[this.dependKey] = useLog;
    }
  };

  protected getDependLog(): LogParams[] {
    let allLogs: LogParams[] = [];

    Object.values(this.dependLogMap).forEach((logs) => {
      allLogs = [...allLogs, ...logs];
    });

    allLogs.sort((a, b) => (a.currentTime ?? 0) - (b.currentTime ?? 0));

    return allLogs;
  }

  protected getUseLog(event: LogCollectEvent): LogParams[] {
    return this.getDependLog();
  }
}