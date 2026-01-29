import EventEmitter from './EventEmitter';

interface Logger {
  setEnableStatus(enabled: boolean): void;
}

interface LoggerInitEvent {
  name: string;
  logger: Logger;
}

class LoggerManager extends EventEmitter {
  private loggerMap: Record<string, Logger>;
  private enable: boolean;

  constructor() {
    super();
    this.loggerMap = {};
    this.enable = true;
  }

  /**
   * Initialize and register a logger
   * @throws {Error} If logger name already exists
   */
  loggerInit(config: LoggerInitEvent): void {
    if (this.loggerMap[config.name]) {
      throw new Error(`logger name '${config.name}'已经存在`);
    }
    this.loggerMap[config.name] = config.logger;
    this.emit('logger-init', config);
  }

  /**
   * Get logger by name
   */
  getLogger(name: string): Logger | undefined {
    return this.loggerMap[name];
  }

  /**
   * Enable or disable all loggers
   */
  setEnableStatus(enabled: boolean): void {
    this.enable = enabled;
    Object.values(this.loggerMap).forEach((logger: Logger) => {
      logger.setEnableStatus(enabled);
    });
  }

  /**
   * Get current enable status
   */
  getEnableStatus(): boolean {
    return this.enable;
  }
}

export const loggerManager = new LoggerManager();
export default loggerManager;