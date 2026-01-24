/**
 * Environment change event listeners and log computation module.
 * Handles environment activation and resumption events.
 */

/**
 * Environment identifier container
 */
interface LastEnvironment {
  /** Unique environment identifier */
  environmentId: string;
  /** Timestamp when environment was recorded (milliseconds since epoch) */
  currentTime?: number;
  /** High-resolution performance timestamp */
  performanceCurrentTime?: number;
}

/**
 * Environment data structure
 */
interface Environment {
  /** Unique environment identifier */
  id: string;
  /** Additional environment properties */
  [key: string]: unknown;
}

/**
 * Event data for environment activation
 */
interface EnvironmentActivatedData {
  /** Newly activated environment ID */
  newEnvironmentId: string;
  /** Previously active environment ID */
  oldEnvironmentId: string;
  /** New environment object */
  env?: Environment;
  /** Old environment object */
  oldEnv?: Environment;
}

/**
 * Event data for environment resumption
 */
interface EnvironmentResumedData {
  /** Environment being resumed */
  environmentId: string;
  /** Previously active environment ID */
  oldEnvironmentId: string;
  /** Environment being resumed */
  env?: Environment;
  /** Old environment object */
  oldEnv?: Environment;
}

/**
 * Generic event wrapper
 */
interface SignalEvent<T> {
  /** Event payload data */
  data?: T;
}

/**
 * Test context for log computation matching
 */
interface LogTestContext {
  /** Newly activated environment ID */
  newEnvironmentId: string;
  /** Previously active environment ID */
  oldEnvironmentId: string;
  /** Last recorded environment state */
  lastEnviroment: LastEnvironment;
}

/**
 * Context for generating log data
 */
interface LogDataContext extends LogTestContext {
  /** New environment object */
  env?: Environment;
  /** Old environment object */
  oldEnv?: Environment;
}

/**
 * Log data item structure
 */
interface LogDataItem {
  /** Log entry type or category */
  type?: string;
  /** Log message or payload */
  [key: string]: unknown;
}

/**
 * Computer log handler interface
 */
interface ComputerLog {
  /**
   * Tests whether this log handler applies to the given context
   * @param context - Environment transition context
   * @returns True if this handler should process the event
   */
  test(context: LogTestContext): boolean;

  /**
   * Generates log data for the environment transition
   * @param context - Full environment transition context with environment objects
   * @returns Array of log data items
   */
  getLogDataList(context: LogDataContext): LogDataItem[];
}

/**
 * Computer log list container
 */
interface ComputerLogListModule {
  /** Array of registered computer log handlers */
  computerLogList: ComputerLog[];
}

/**
 * Performance utility functions
 */
interface PerformanceUtility {
  /**
   * Gets high-resolution current timestamp
   * @returns Performance timestamp in milliseconds
   */
  performanceDateNow(): number;
}

/**
 * Environment manager interface
 */
interface EnvironmentManager {
  /** Signal emitted when environment is activated */
  signalEnvironmentActivated: unknown;
  /** Signal emitted when environment is resumed */
  signalEnvironmentResumed: unknown;
}

/**
 * Application context interface
 */
interface AppContext {
  /** Environment manager instance */
  environmentManager: EnvironmentManager;
}

/**
 * HSApp application interface
 */
interface HSAppInstance {
  /**
   * Gets suspended environment that is pending activation
   * @returns Suspended environment or null
   */
  getPendingSuspendedEnvironment(): Environment | null;
}

declare global {
  const HSApp: {
    App: {
      /**
       * Gets the singleton application instance
       * @returns Application instance
       */
      getApp(): HSAppInstance;
    };
  };
}

/**
 * Environment event listener configuration
 */
interface EnvironmentListener<TData = unknown> {
  /**
   * Gets the signal to listen to
   * @param context - Application context
   * @returns Signal object to subscribe to
   */
  getListenSignal(context: AppContext): unknown;

  /**
   * Handles the event when triggered
   * @param event - Signal event with data payload
   * @returns Log data items if applicable, undefined otherwise
   */
  listen(event: SignalEvent<TData>): LogDataItem[] | undefined;

  /** Stores the last recorded environment state */
  lastEnviroment?: LastEnvironment;
}

/**
 * Environment activated event listener
 */
type EnvironmentActivatedListener = EnvironmentListener<EnvironmentActivatedData>;

/**
 * Environment resumed event listener
 */
type EnvironmentResumedListener = EnvironmentListener<EnvironmentResumedData>;

/**
 * Default export: Array of environment event listeners
 */
declare const listeners: [EnvironmentActivatedListener, EnvironmentResumedListener];

export default listeners;