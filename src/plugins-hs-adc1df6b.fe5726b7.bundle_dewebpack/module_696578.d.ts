/**
 * Persistence plugin logger instance
 * Provides logging functionality specifically for persistence-related plugin operations
 */
declare const _default: ReturnType<typeof log.logger>;

export default _default;

/**
 * External dependency: Log utility
 * Assumes a global or imported 'log' object with a 'logger' method
 */
declare const log: {
  /**
   * Creates a namespaced logger instance
   * @param namespace - The logging namespace/category identifier
   * @returns A configured logger instance for the specified namespace
   */
  logger(namespace: string): Logger;
};

/**
 * Logger interface
 * Represents a logging utility with common logging methods
 */
interface Logger {
  /**
   * Log informational messages
   * @param message - The message to log
   * @param optionalParams - Additional parameters to log
   */
  info(message: string, ...optionalParams: unknown[]): void;
  
  /**
   * Log warning messages
   * @param message - The warning message
   * @param optionalParams - Additional parameters to log
   */
  warn(message: string, ...optionalParams: unknown[]): void;
  
  /**
   * Log error messages
   * @param message - The error message
   * @param optionalParams - Additional parameters to log
   */
  error(message: string, ...optionalParams: unknown[]): void;
  
  /**
   * Log debug messages
   * @param message - The debug message
   * @param optionalParams - Additional parameters to log
   */
  debug(message: string, ...optionalParams: unknown[]): void;
}