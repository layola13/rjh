export enum LogLevelEnum {
  perf = "perf",
  debug = "debug",
  info = "info",
  warning = "warn",
  error = "error"
}

interface LogLevelMap {
  readonly [LogLevelEnum.debug]: number;
  readonly [LogLevelEnum.info]: number;
  readonly [LogLevelEnum.warning]: number;
  readonly [LogLevelEnum.error]: number;
  readonly [LogLevelEnum.perf]: number;
}

const LOG_LEVEL_PRIORITY: LogLevelMap = Object.freeze({
  [LogLevelEnum.debug]: 1,
  [LogLevelEnum.info]: 2,
  [LogLevelEnum.warning]: 3,
  [LogLevelEnum.error]: 4,
  [LogLevelEnum.perf]: 2
});

const noOp = (): void => {};

interface ConsoleInterface {
  log: (...args: unknown[]) => void;
  assert: (condition: boolean, ...args: unknown[]) => void;
  debug: (...args: unknown[]) => void;
  error: (...args: unknown[]) => void;
  info: (...args: unknown[]) => void;
  time: (label: string) => void;
  timeEnd: (label: string) => void;
  warn: (...args: unknown[]) => void;
}

const NOOP_CONSOLE: ConsoleInterface = {
  log: noOp,
  assert: noOp,
  debug: noOp,
  error: noOp,
  info: noOp,
  time: noOp,
  timeEnd: noOp,
  warn: noOp
};

interface PerfLog {
  label: string;
  startTime: number;
  duration: number;
}

interface LogCollector {
  addLog(level: LogLevelEnum, message: string, category: string, force: boolean, extra?: unknown): void;
  addPerfLog?(perfLog: PerfLog, category: string, force: boolean): void;
}

type LogProcessor = (message: string) => string;

const MAX_TIMER_COUNT = 10;

export class Logger {
  static instance = new Logger();

  enabled: boolean = true;
  level: number = LOG_LEVEL_PRIORITY[LogLevelEnum.info];
  console?: ConsoleInterface;
  collector?: LogCollector;
  processors?: Set<LogProcessor>;
  private loggerMap: Map<string, LogObject> = new Map();

  /**
   * Set the global log level
   * @param levelOrPriority - Log level enum value or numeric priority
   */
  static setLevel(levelOrPriority: string): void {
    const logLevel = LogLevelEnum[levelOrPriority as keyof typeof LogLevelEnum];
    if (logLevel) {
      this.instance.level = LOG_LEVEL_PRIORITY[logLevel];
    } else {
      const numericLevel = parseInt(levelOrPriority);
      if (Number.isInteger(numericLevel)) {
        this.instance.level = numericLevel;
      }
    }
  }

  /**
   * Get or create a logger instance for a specific category
   * @param category - Logger category name
   */
  static logger(category: string): LogObject {
    return this.instance.getLogObject(category);
  }

  /**
   * Set the default console implementation
   * @param consoleImpl - Console interface implementation
   */
  static setDefaultConsole(consoleImpl: ConsoleInterface): void {
    this.instance.console = consoleImpl;
  }

  /**
   * Get the current console instance
   */
  static get console(): ConsoleInterface {
    return this.instance.console ?? NOOP_CONSOLE;
  }

  /**
   * Get or create a log object for a specific category
   * @param category - Logger category name
   */
  getLogObject(category: string): LogObject {
    const loggerMap = this.loggerMap;
    const fullCategory = category ? `${category}.v2` : "default.Logger.v2";
    
    let logObject = loggerMap.get(fullCategory);
    if (!logObject) {
      logObject = new LogObject(fullCategory, this);
      loggerMap.set(logObject.category, logObject);
    }
    
    return logObject;
  }

  /**
   * Set the log collector
   * @param collector - Log collector implementation
   */
  setCollector(collector: LogCollector): void {
    this.collector = collector;
  }

  /**
   * Add a log processor
   * @param processor - Function to process log messages
   */
  addProcessor = (processor: LogProcessor): void => {
    if (processor) {
      if (!this.processors) {
        this.processors = new Set();
      }
      this.processors.add(processor);
    }
  };

  /**
   * Remove a log processor
   * @param processor - Processor to remove
   */
  removeProcessor = (processor: LogProcessor): void => {
    this.processors?.delete(processor);
  };
}

export class LogObject {
  category: string;
  silence: boolean = false;
  private _logger: Logger;
  private _perfMap: Map<string, number> = new Map();

  constructor(category: string, logger: Logger) {
    this._logger = logger;
    this.category = category;
  }

  /**
   * Log a debug message
   * @param message - Message to log
   */
  debug(message: string): void {
    this._log(message, LogLevelEnum.debug, false);
  }

  /**
   * Log an info message
   * @param message - Message to log
   * @param force - Force log regardless of level
   */
  info(message: string, force: boolean = false): void {
    this._log(message, LogLevelEnum.info, force);
  }

  /**
   * Log a warning message
   * @param message - Message to log
   * @param force - Force log regardless of level
   */
  warning(message: string, force: boolean = false): void {
    this._log(message, LogLevelEnum.warning, force);
  }

  /**
   * Log an error message
   * @param error - Error object or message
   * @param force - Force log regardless of level
   * @param extra - Additional context data
   */
  error(error: Error | string, force: boolean = true, extra?: unknown): void {
    const message = error && typeof error === 'object' && 'stack' in error 
      ? error.stack ?? JSON.stringify(error)
      : JSON.stringify(error);
    this._log(message, LogLevelEnum.error, true, extra);
  }

  /**
   * Assert a condition and log if false
   * @param condition - Condition to check
   * @param message - Message to log on failure
   * @param extra - Additional context data
   */
  assert(condition: boolean, message: string, extra?: unknown): void {
    if (!condition && this._logger.collector) {
      this._logger.collector.addLog(
        LogLevelEnum.error,
        `Assertion failed: ${message}`,
        this.category,
        true,
        extra
      );
    }
    this._logger.console?.assert(condition, message, this.category);
  }

  /**
   * Start a performance timer
   * @param label - Timer label
   */
  time(label: string): void {
    if (this._perfMap.size > MAX_TIMER_COUNT) {
      this.warning("The number of timers has exceeded the maximum limit", false);
    } else {
      if (this._perfMap.get(label) !== undefined) {
        this.warning(`Timer '${label}' already exists`, false);
      }
      this._perfMap.set(label, Date.now());
    }
  }

  /**
   * End a performance timer and log the result
   * @param label - Timer label
   * @param force - Force log regardless of level
   */
  timeEnd(label: string, force: boolean = false): void {
    const startTime = this._perfMap.get(label);
    
    if (startTime === undefined) {
      this.warning(`Timer '${label}' does not exist`, false);
    } else {
      const perfLog: PerfLog = {
        label,
        startTime,
        duration: Date.now() - startTime
      };
      this._perfMap.delete(label);
      this._logPerf(perfLog, force);
    }
  }

  private _log(message: string, level: LogLevelEnum, force: boolean = false, extra?: unknown): void {
    const { enabled, collector, processors } = this._logger;
    
    if (!enabled) return;
    
    const logLevel = level ?? LogLevelEnum.debug;
    if (!force && this._logger.level > LOG_LEVEL_PRIORITY[logLevel]) return;
    
    let processedMessage = message;
    processors?.forEach((processor) => {
      processedMessage = processor(processedMessage);
    });
    
    collector?.addLog(logLevel, processedMessage, this.category, force, extra);
    
    if (!this.silence && this._logger.console?.[logLevel]) {
      this._logger.console[logLevel](message);
    }
  }

  private _logPerf(perfLog: PerfLog, force: boolean = false): void {
    const { enabled, collector } = this._logger;
    
    if (!enabled) return;
    
    collector?.addPerfLog?.(perfLog, this.category, force);
    
    if (!this.silence && this._logger.console) {
      this._logger.console.info(perfLog.label, perfLog);
    }
  }
}