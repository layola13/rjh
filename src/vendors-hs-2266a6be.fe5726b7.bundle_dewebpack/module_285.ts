import EventEmitter from './704';

interface Logger {
  setEnableStatus(enabled: boolean): void;
}

interface LoggerInitEvent {
  name: string;
  logger: Logger;
}

class LoggerManager extends EventEmitter {
  private loggerMap: Record<string, Logger> = {};
  private enable: boolean = true;

  /**
   * Initialize and register a new logger
   * @param event - Logger initialization event containing name and logger instance
   * @throws Error if logger name already exists
   */
  loggerInit(event: LoggerInitEvent): void {
    if (this.loggerMap[event.name]) {
      throw new Error(`logger name '${event.name}'已经存在`);
    }
    this.loggerMap[event.name] = event.logger;
    this.emit('logger-init', event);
  }

  /**
   * Retrieve a logger by name
   * @param name - The name of the logger to retrieve
   * @returns The logger instance or undefined if not found
   */
  getLogger(name: string): Logger | undefined {
    return this.loggerMap[name];
  }

  /**
   * Set the enabled status for all registered loggers
   * @param enabled - Whether logging should be enabled
   */
  setEnableStatus(enabled: boolean): void {
    this.enable = enabled;
    Object.values(this.loggerMap).forEach((logger) => {
      logger.setEnableStatus(enabled);
    });
  }

  /**
   * Get the current enabled status
   * @returns The current enable status
   */
  getEnableStatus(): boolean {
    return this.enable;
  }
}

export const loggerManager = new LoggerManager();
export default loggerManager;