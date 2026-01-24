/**
 * Command monitoring and logging service
 * Tracks command execution statistics and logs them periodically
 */

/**
 * Command data structure passed in signal events
 */
interface CommandEventData {
  /** Command object containing type information */
  cmd?: {
    /** Type identifier of the command */
    type: string;
  };
}

/**
 * Signal event structure for command started notifications
 */
interface CommandStartedEvent {
  /** Event payload */
  data: CommandEventData;
}

/**
 * Logger interface for recording command statistics
 */
interface ICommandLogger {
  /**
   * Log command execution statistics
   * @param commandMap - Map of command types to execution counts
   */
  logCommand(commandMap: Map<string, number>): void;
}

/**
 * Signal hook utility for event subscription
 */
interface ISignalHook {
  /**
   * Subscribe to a signal
   * @param signal - Signal to listen to
   * @param handler - Callback function
   */
  listen(signal: unknown, handler: (event: CommandStartedEvent) => void): void;
  
  /**
   * Unsubscribe from all signals
   */
  unlistenAll(): void;
}

/**
 * Command manager interface
 */
interface ICommandManager {
  /** Signal emitted when a command starts */
  signalCommandStarted: unknown;
}

/**
 * Application interface
 */
interface IApp {
  /** Command manager instance */
  cmdManager: ICommandManager;
}

/**
 * Global HSCore utility namespace
 */
declare global {
  namespace HSCore {
    namespace Util {
      class SignalHook implements ISignalHook {
        constructor(context: unknown);
        listen(signal: unknown, handler: (event: CommandStartedEvent) => void): void;
        unlistenAll(): void;
      }
    }
  }
  
  namespace HSApp {
    namespace App {
      function getApp(): IApp;
    }
  }
}

/**
 * Command monitoring service that tracks and logs command execution statistics
 * Automatically logs aggregated command counts every 10 seconds
 */
export default class CommandMonitor {
  /** Map storing command types and their execution counts */
  private _commandMap: Map<string, number>;
  
  /** Signal hook for subscribing to command events */
  private _signalHook: ISignalHook;
  
  /** Logger instance for recording statistics */
  private _logger: ICommandLogger;
  
  /** Interval timer for periodic logging */
  private _timer?: NodeJS.Timeout;

  /**
   * Creates a new CommandMonitor instance
   * @param loggerConfig - Configuration object passed to the logger
   */
  constructor(loggerConfig: unknown);

  /**
   * Initialize the monitor and start tracking commands
   * Sets up event listeners and starts the periodic logging timer (10s interval)
   */
  init(): void;

  /**
   * Clean up resources and stop monitoring
   * Resets state, removes listeners, and clears the logging timer
   */
  clear(): void;

  /**
   * Reset command statistics
   * Clears the internal command count map
   */
  reset(): void;

  /**
   * Internal handler for command started events
   * Increments the count for the command type
   * @param event - Command started event containing command data
   * @private
   */
  private _onCommandStarted(event: CommandStartedEvent): void;
}