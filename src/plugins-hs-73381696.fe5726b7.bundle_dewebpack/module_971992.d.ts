/**
 * Performance and behavior metrics tracking module for HSW application.
 * Monitors command execution, rendering performance, and system information.
 */

/**
 * Machine information extracted from user agent
 */
type MachineInfo = string;

/**
 * Graphics configuration information
 */
interface GraphicsConfig {
  /** Name of the graphics card from WebGL context */
  webglName: string;
  /** Name of the graphics card from vendor string */
  graphicsCardName: string;
}

/**
 * Command execution record
 */
interface CommandRecord {
  /** Command type identifier */
  cmd: string;
  /** ISO timestamp when command started */
  startTime: string;
}

/**
 * Client performance data from Electron IPC
 */
interface ClientData {
  [key: string]: unknown;
}

/**
 * Performance log payload
 */
interface PerformanceLogData {
  /** Recently executed commands */
  cmd: CommandRecord[];
  /** User identifier */
  userId: string;
  /** Design asset identifier */
  assetId: string;
  /** Browser user agent string */
  browsersInfo: string;
  /** Machine information from user agent */
  machineInfo: MachineInfo;
  /** Graphics hardware configuration */
  graphicsConfig: GraphicsConfig | null;
  /** Frames per second measurement */
  fps: number;
  /** Render time in milliseconds */
  renderTime: number | undefined;
  /** Active view name */
  view: string;
  /** Memory usage metrics */
  memory: unknown;
  /** Graphics performance metrics */
  graphics: unknown;
  /** IDs of currently selected items */
  selected: string[];
  /** Application publish version */
  publishVersion: string;
  /** Publish version by deployment type */
  publishVersionByType: unknown;
  /** Active environment identifier */
  environmentId: string;
  /** Additional client-side performance data */
  clientData: ClientData;
}

/**
 * Command log payload for behavior tracking
 */
interface CommandLogData {
  /** List of commands to log */
  commandlist: unknown;
  /** Timestamp of log entry */
  timestamp: Date;
  /** Session identifier */
  sessionId: string;
  /** User identifier */
  userId: string;
  /** Design identifier */
  designId: string;
}

/**
 * Application interface with required properties
 */
interface App {
  cmdManager: {
    signalCommandStarted: unknown;
  };
  activeView: {
    name: string;
  };
  floorplan: {
    designMetadata: Map<string, string>;
  };
  designMetadata: Map<string, string>;
  selectionManager: {
    selected(): Array<{ ID: string }>;
  };
  activeEnvironmentId: string;
  getActive3DView(): {
    renderingMgr: {
      getRenderTime(): number;
    };
  } | null;
  getWebglInfo(): {
    graphicsCard: string;
    webglName: string;
  };
}

/**
 * Command event data
 */
interface CommandEvent {
  data: {
    cmd: {
      type: string;
    };
  };
}

/**
 * Metrics info utility class
 */
declare class MetricsInfo {
  constructor(app: App);
  memory(): unknown;
  graphics(): unknown;
}

/**
 * Performance and behavior metrics tracker.
 * Collects and logs application performance data, command execution history,
 * and system information for analytics and debugging.
 */
export default class PerformanceMetrics {
  /** Reference to the main application instance */
  private _app: App;
  
  /** Logger for performance metrics */
  public logger: {
    silence: boolean;
    info(message: string, immediate: boolean): void;
  };
  
  /** Logger for user behavior events */
  public eventLogger: {
    silence: boolean;
    info(message: string, immediate: boolean): void;
  };
  
  /** Utility for collecting metrics information */
  public metricsInfo: MetricsInfo;
  
  /** Rolling buffer of recently executed commands (max 5) */
  private _cmdArray: CommandRecord[];
  
  /** Cached graphics configuration */
  private _graphicsConfig: GraphicsConfig | null;
  
  /** Client performance data from Electron process */
  private _clientData: ClientData | null;
  
  /** Machine information string */
  private _machineInfo: MachineInfo;

  /**
   * Creates a new PerformanceMetrics instance.
   * @param app - The main application instance
   */
  constructor(app: App);

  /**
   * Logs performance metrics including FPS, render time, memory usage,
   * and recent command history.
   * @param fps - Current frames per second measurement
   */
  log(fps: number): void;

  /**
   * Logs command execution for behavior analytics.
   * @param commandlist - Command data to log
   */
  logCommand(commandlist: unknown): void;

  /**
   * Handles command start events, updating the command history buffer.
   * @param event - Command event containing command type and metadata
   * @private
   */
  private _onCommandRunning(event: CommandEvent): void;

  /**
   * Retrieves and caches graphics configuration from WebGL context.
   * @private
   */
  private _getGraphicsConfig(): void;

  /**
   * Extracts machine information from the user agent string.
   * @returns Machine info string extracted from parentheses in user agent
   * @private
   */
  private _getMachineInfo(): MachineInfo;
}