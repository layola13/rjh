/**
 * LogLevel - A lightweight JavaScript logging library
 * Provides configurable logging with multiple log levels and persistent level storage
 */

/**
 * Log levels enumeration
 */
export enum LogLevel {
  TRACE = 0,
  DEBUG = 1,
  INFO = 2,
  WARN = 3,
  ERROR = 4,
  SILENT = 5
}

/**
 * Log level names corresponding to the enum values
 */
export type LogLevelName = 'trace' | 'debug' | 'info' | 'warn' | 'error';

/**
 * String representation of log levels (case-insensitive)
 */
export type LogLevelString = 'TRACE' | 'DEBUG' | 'INFO' | 'WARN' | 'ERROR' | 'SILENT' | 'trace' | 'debug' | 'info' | 'warn' | 'error' | 'silent';

/**
 * Log level specification - can be numeric enum value or string name
 */
export type LogLevelSpec = LogLevel | LogLevelString;

/**
 * Method factory function signature for creating custom log methods
 * @param methodName - The name of the log method (trace, debug, info, warn, error)
 * @param level - The numeric log level
 * @param loggerName - Optional name of the logger instance
 * @returns A function that performs the actual logging
 */
export type MethodFactory = (
  methodName: LogLevelName,
  level: LogLevel,
  loggerName?: string
) => LogMethod;

/**
 * Individual log method signature
 * @param message - Primary log message
 * @param optionalParams - Additional parameters to log
 */
export type LogMethod = (message?: unknown, ...optionalParams: unknown[]) => void;

/**
 * Logger interface with all log level methods
 */
export interface Logger {
  /** The name of this logger instance */
  readonly name?: string;

  /** Map of available log levels */
  readonly levels: Readonly<{
    TRACE: LogLevel.TRACE;
    DEBUG: LogLevel.DEBUG;
    INFO: LogLevel.INFO;
    WARN: LogLevel.WARN;
    ERROR: LogLevel.ERROR;
    SILENT: LogLevel.SILENT;
  }>;

  /** Factory method for creating log functions */
  methodFactory: MethodFactory;

  /**
   * Get the current log level
   * @returns The current numeric log level
   */
  getLevel(): LogLevel;

  /**
   * Set the log level
   * @param level - The desired log level (number or string)
   * @param persist - Whether to persist the level to storage (default: true)
   * @throws TypeError if level is invalid
   */
  setLevel(level: LogLevelSpec, persist?: boolean): void | string;

  /**
   * Set the default log level (only if no level is persisted)
   * @param level - The default log level
   */
  setDefaultLevel(level: LogLevelSpec): void;

  /**
   * Enable all log levels (set to TRACE)
   * @param persist - Whether to persist the level to storage
   */
  enableAll(persist?: boolean): void;

  /**
   * Disable all log levels (set to SILENT)
   * @param persist - Whether to persist the level to storage
   */
  disableAll(persist?: boolean): void;

  /** Log at TRACE level */
  trace(message?: unknown, ...optionalParams: unknown[]): void;

  /** Log at DEBUG level (alias: log) */
  debug(message?: unknown, ...optionalParams: unknown[]): void;

  /** Log at INFO level */
  info(message?: unknown, ...optionalParams: unknown[]): void;

  /** Log at WARN level */
  warn(message?: unknown, ...optionalParams: unknown[]): void;

  /** Log at ERROR level */
  error(message?: unknown, ...optionalParams: unknown[]): void;

  /** Alias for debug method */
  log(message?: unknown, ...optionalParams: unknown[]): void;
}

/**
 * Root logger interface with additional factory methods
 */
export interface RootLogger extends Logger {
  /**
   * Get or create a named logger instance
   * @param name - The name for the logger
   * @returns A logger instance with the specified name
   * @throws TypeError if name is not a non-empty string
   */
  getLogger(name: string): Logger;

  /**
   * Get all created logger instances
   * @returns A record mapping logger names to logger instances
   */
  getLoggers(): Record<string, Logger>;

  /**
   * Restore the previous global `log` variable (browser only)
   * @returns This logger instance
   */
  noConflict(): RootLogger;
}

/**
 * The default root logger instance
 */
declare const log: RootLogger;

export default log;