/**
 * Logger plugin for HSApp framework
 * Provides user tracking, error logging, and performance monitoring capabilities
 */

import { IPlugin } from 'HSApp.Plugin';

/**
 * Application interface for the logger plugin
 */
interface IApp {
  /** Application-specific properties and methods */
  [key: string]: unknown;
}

/**
 * Event data passed to the onActive lifecycle hook
 */
interface IActiveEvent {
  /** The application instance */
  app: IApp;
}

/**
 * User tracking logger for analytics and user behavior monitoring
 */
declare class UserTrackLoggerEvent {
  /**
   * Creates a new user tracking logger instance
   * @param app - The application instance
   */
  constructor(app: IApp);
}

/**
 * Error logger for capturing and reporting application errors
 */
declare class ErrorLoggerEvent {
  /**
   * Creates a new error logger instance
   * @param app - The application instance
   */
  constructor(app: IApp);

  /**
   * Reports an error to the logging system
   * @param error - The error to be logged
   */
  signalError(error: Error | unknown): void;
}

/**
 * Performance logger for tracking application performance metrics
 */
declare class PerformanceLoggerEvent {
  /**
   * Creates a new performance logger instance
   * @param app - The application instance
   */
  constructor(app: IApp);
}

/**
 * Logger plugin that integrates user tracking, error logging, and performance monitoring
 * into the HSApp framework
 */
declare class LoggerPlugin extends IPlugin {
  /**
   * User tracking logger instance
   */
  userTrackLoggerEvent: UserTrackLoggerEvent | undefined;

  /**
   * Error logger instance
   */
  ErrorLoggerEvent: ErrorLoggerEvent | undefined;

  /**
   * Performance logger instance
   */
  PerformanceLoggerEvent: PerformanceLoggerEvent | undefined;

  /**
   * Convenience method for error signaling
   * Delegates to ErrorLoggerEvent.signalError
   */
  signalError: ((error: Error | unknown) => void) | undefined;

  /**
   * Lifecycle hook called when the plugin becomes active
   * Initializes all logger instances
   * @param event - Event data containing the application instance
   */
  onActive(event: IActiveEvent): void;
}

/**
 * HSApp global namespace
 */
declare global {
  namespace HSApp {
    namespace Plugin {
      /**
       * Base plugin interface
       */
      interface IPlugin {
        onActive?(event: IActiveEvent): void;
      }

      /**
       * Registers a plugin with the HSApp framework
       * @param name - Unique plugin identifier
       * @param plugin - Plugin class constructor
       */
      function registerPlugin(name: string, plugin: typeof LoggerPlugin): void;
    }
  }
}

export { LoggerPlugin, UserTrackLoggerEvent, ErrorLoggerEvent, PerformanceLoggerEvent, IApp, IActiveEvent };