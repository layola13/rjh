/**
 * Log level enumeration
 * Defines available logging levels for the Logger system
 */
export enum LogLevelEnum {
  /** Performance logging level */
  perf = "perf",
  /** Debug logging level */
  debug = "debug",
  /** Information logging level */
  info = "info",
  /** Warning logging level */
  warning = "warn",
  /** Error logging level */
  error = "error"
}

/**
 * Performance measurement data
 */
export interface PerfData {
  /** Label identifier for the performance measurement */
  label: string;
  /** Start timestamp in milliseconds */
  startTime: number;
  /** Duration of the measurement in milliseconds */
  duration: number;
}

/**
 * Log processor function type
 * Transforms log messages before they are output
 */
export type LogProcessor = (message: string) => string;

/**
 * Console-like interface for log output
 */
export interface ConsoleInterface {
  log: (...args: unknown[]) => void;
  assert: (condition: boolean, message: string, category: string) => void;
  debug: (message: string) => void;
  error: (message: string) => void;
  info: (message: string | PerfData) => void;
  time: (label: string) => void;
  timeEnd: (label: string) => void;
  warn: (message: string) => void;
}

/**
 * Log collector interface
 * Handles collection and storage of log entries
 */
export interface LogCollector {
  /**
   * Add a log entry
   * @param level - Log level
   * @param message - Log message content
   * @param category - Log category/source
   * @param force - Whether to force logging regardless of level
   * @param metadata - Optional additional metadata
   */
  addLog(
    level: LogLevelEnum,
    message: string,
    category: string,
    force: boolean,
    metadata?: unknown
  ): void;

  /**
   * Add a performance log entry
   * @param perfData - Performance measurement data
   * @param category - Log category/source
   * @param force - Whether to force logging
   */
  addPerfLog?(perfData: PerfData, category: string, force: boolean): void;
}

/**
 * Main Logger singleton class
 * Manages global logging configuration and log object instances
 */
export declare class Logger {
  /** Singleton instance */
  private static instance: Logger;

  /** Whether logging is enabled globally */
  enabled: boolean;

  /** Current minimum log level threshold */
  level: number;

  /** Console interface for output */
  console?: ConsoleInterface;

  /** Log collector for persistence/transmission */
  collector?: LogCollector;

  /** Set of message processors */
  processors?: Set<LogProcessor>;

  /** Map of category names to LogObject instances */
  private loggerMap: Map<string, LogObject>;

  private constructor();

  /**
   * Set the global log level
   * @param level - Log level name or numeric value
   */
  static setLevel(level: string): void;

  /**
   * Get or create a LogObject for a specific category
   * @param category - Category name for the logger
   * @returns LogObject instance
   */
  static logger(category?: string): LogObject;

  /**
   * Set the default console interface
   * @param console - Console implementation to use
   */
  static setDefaultConsole(console: ConsoleInterface): void;

  /**
   * Get the current console interface
   */
  static get console(): ConsoleInterface;

  /**
   * Get or create a LogObject for a category
   * @param category - Category name
   * @returns LogObject instance
   */
  getLogObject(category?: string): LogObject;

  /**
   * Set the log collector
   * @param collector - Collector implementation
   */
  setCollector(collector: LogCollector): void;

  /**
   * Add a log message processor
   * @param processor - Function to process log messages
   */
  addProcessor: (processor: LogProcessor) => void;

  /**
   * Remove a log message processor
   * @param processor - Processor to remove
   */
  removeProcessor: (processor: LogProcessor) => void;
}

/**
 * Log object for a specific category
 * Provides logging methods with automatic category tagging
 */
export declare class LogObject {
  /** The parent Logger instance */
  private _logger: Logger;

  /** Map of active performance timers */
  private _perfMap: Map<string, number>;

  /** Category identifier for this log object */
  readonly category: string;

  /** Whether to suppress console output */
  silence: boolean;

  /**
   * @param category - Category name
   * @param logger - Parent Logger instance
   */
  constructor(category: string, logger: Logger);

  /**
   * Log a debug message
   * @param message - Message to log
   */
  debug(message: string): void;

  /**
   * Log an info message
   * @param message - Message to log
   * @param force - Force logging regardless of level
   */
  info(message: string, force?: boolean): void;

  /**
   * Log a warning message
   * @param message - Message to log
   * @param force - Force logging regardless of level
   */
  warning(message: string, force?: boolean): void;

  /**
   * Log an error message
   * @param error - Error object or message
   * @param force - Force logging regardless of level
   * @param metadata - Optional additional metadata
   */
  error(error: Error | string, force?: boolean, metadata?: unknown): void;

  /**
   * Assert a condition and log if false
   * @param condition - Condition to check
   * @param message - Message to log if assertion fails
   * @param metadata - Optional additional metadata
   */
  assert(condition: boolean, message: string, metadata?: unknown): void;

  /**
   * Start a performance timer
   * @param label - Timer label
   */
  time(label: string): void;

  /**
   * End a performance timer and log the result
   * @param label - Timer label
   * @param force - Force logging regardless of level
   */
  timeEnd(label: string, force?: boolean): void;

  /**
   * Internal logging implementation
   * @param message - Message to log
   * @param level - Log level
   * @param force - Force logging regardless of level
   * @param metadata - Optional additional metadata
   */
  private _log(
    message: string,
    level: LogLevelEnum,
    force?: boolean,
    metadata?: unknown
  ): void;

  /**
   * Internal performance logging implementation
   * @param perfData - Performance measurement data
   * @param force - Force logging regardless of level
   */
  private _logPerf(perfData: PerfData, force?: boolean): void;
}