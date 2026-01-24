/**
 * Performance monitoring operation types
 */
export enum OperationType {
  saveDesign = "saveDesign"
}

/**
 * Configuration for a performance operation
 */
interface OperationConfig {
  /** The type of operation to monitor */
  type: OperationType;
  
  /**
   * Gets the signal that marks the start of the operation
   * @param context - The application context containing plugin manager
   * @returns The start signal or undefined if not available
   */
  getStartSignal: (context: OperationContext) => Signal | undefined;
  
  /**
   * Gets the signal that marks the end of the operation
   * @param context - The application context containing plugin manager
   * @returns The end signal or undefined if not available
   */
  getEndSignal: (context: OperationContext) => Signal | undefined;
}

/**
 * Application context providing access to plugins
 */
interface OperationContext {
  pluginManager: {
    getPlugin(type: string): PersistencePlugin | undefined;
  };
}

/**
 * Persistence plugin interface with save signals
 */
interface PersistencePlugin {
  signalSaveStart?: Signal;
  signalSaveSucceeded?: Signal;
}

/**
 * Generic signal type for event notifications
 */
interface Signal {
  // Signal implementation details
}

/**
 * Performance monitoring operations for tracking operation timings
 * Monitors various operations like save design and logs their duration
 */
export declare class Operation {
  private static _signalHook: HSCore.Util.SignalHook;
  
  /**
   * Activates performance monitoring for configured operations
   * Sets up listeners on start and end signals to measure operation duration
   * @param context - The application context containing plugin manager
   */
  static active(context: OperationContext): void;
  
  /**
   * Clears all registered signal listeners
   * Should be called when stopping performance monitoring
   */
  static clear(): void;
}

/**
 * Global HSCore utility types
 */
declare namespace HSCore.Util {
  class SignalHook {
    constructor(owner: unknown);
    listen(signal: Signal, callback: () => void): void;
    unlistenAll(): void;
  }
}

declare namespace HSFPConstants {
  enum PluginType {
    Persistence = "Persistence"
  }
}

declare namespace log {
  interface Logger {
    silence: boolean;
    time(label: string): void;
    timeEnd(label: string, log?: boolean): void;
  }
  
  function logger(name: string): Logger;
}