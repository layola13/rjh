/**
 * Logger configuration options
 */
export interface LoggerOptions {
  /**
   * Prefix string for log messages
   * @default "i18next:"
   */
  prefix?: string;

  /**
   * Enable debug mode for detailed logging
   * @default false
   */
  debug?: boolean;
}

/**
 * Logger interface for handling log outputs
 */
export interface ILogger {
  /**
   * Log an informational message
   */
  log(...args: unknown[]): void;

  /**
   * Log a warning message
   */
  warn(...args: unknown[]): void;

  /**
   * Log an error message
   */
  error(...args: unknown[]): void;
}

/**
 * Logger module for internationalization logging
 * Handles formatted log output with configurable prefix and debug mode
 */
export declare class Logger {
  /**
   * Prefix string prepended to all log messages
   */
  prefix: string;

  /**
   * Underlying logger instance
   */
  logger: ILogger;

  /**
   * Logger configuration options
   */
  options: LoggerOptions;

  /**
   * Debug mode flag
   */
  debug: boolean;

  /**
   * Creates a new Logger instance
   * @param logger - Logger instance to use for output (defaults to console)
   * @param options - Configuration options for the logger
   */
  constructor(logger?: ILogger, options?: LoggerOptions);
}

export default Logger;