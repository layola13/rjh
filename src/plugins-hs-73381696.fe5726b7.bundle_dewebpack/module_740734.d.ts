/**
 * Canvas change tracking plugin for user behavior analytics
 * Monitors canvas size adjustments through various UI controls
 */

/**
 * Type of canvas change operation
 */
type CanvasChangeType = 'slider' | 'zoomOut' | 'zoomIn' | 'fit';

/**
 * Data payload for canvas change events
 */
interface CanvasChangeData {
  /** Type of canvas change operation */
  type?: CanvasChangeType;
}

/**
 * Canvas changing event from contextual tools plugin
 */
interface CanvasChangingEvent {
  /** Event data containing operation type */
  data?: CanvasChangeData;
}

/**
 * User tracking log entry
 */
interface TrackLog {
  /** Action type identifier */
  actionType: string;
  /** Custom metadata for the action */
  customizedInfo?: Record<string, unknown>;
}

/**
 * User track logger for analytics
 */
interface UserTrackLogger {
  /**
   * Retrieves the most recent tracking log entry
   * @returns The last logged action or null
   */
  getLastTrackLog(): TrackLog | null;
}

/**
 * Contextual tools plugin providing canvas manipulation signals
 */
interface ContextualToolsPlugin {
  /** Signal emitted when canvas is being changed */
  signalCanvasChanging: unknown;
}

/**
 * Plugin manager for accessing registered plugins
 */
interface PluginManager {
  /**
   * Gets a plugin instance by type
   * @param pluginType - Plugin type constant
   * @returns The requested plugin instance
   */
  getPlugin(pluginType: string): ContextualToolsPlugin;
}

/**
 * Log data structure for tracking events
 */
interface LogData {
  actionType: string;
  metadata: Record<string, unknown>;
  immediate: boolean;
}

/**
 * Plugin listener configuration
 */
interface PluginListener {
  /**
   * Gets the signal to listen to from the plugin manager
   * @param context - Object containing plugin manager
   * @returns Signal for canvas changes
   */
  getListenSignal(context: { pluginManager: PluginManager }): unknown;

  /**
   * Handles canvas change events and creates tracking logs
   * @param event - Canvas changing event with operation data
   * @returns Array of log data entries or undefined if duplicate
   */
  listen(event: CanvasChangingEvent): LogData[] | undefined;
}

/**
 * Human-readable descriptions for canvas operations
 */
const CANVAS_OPERATION_DESCRIPTIONS: Record<CanvasChangeType, string> = {
  slider: '正在用slider改变2D画布大小',
  zoomOut: '点击缩小按钮',
  zoomIn: '点击放大按钮',
  fit: '点击适应画布'
};

/**
 * Creates structured log data for user tracking
 * @param actionType - Type of action being logged
 * @param metadata - Additional data about the action
 * @param immediate - Whether to log immediately
 * @returns Formatted log data object
 */
declare function createLogData(
  actionType: string,
  metadata: Record<string, unknown>,
  immediate: boolean
): LogData;

/**
 * Global HSApp namespace
 */
declare namespace HSApp {
  namespace App {
    interface AppInstance {
      userTrackLogger: UserTrackLogger;
    }
    function getApp(): AppInstance;
  }
}

/**
 * Global HSFPConstants namespace
 */
declare namespace HSFPConstants {
  namespace PluginType {
    const ContextualTools: string;
  }
}

/**
 * Canvas change tracking plugin listeners
 * Prevents duplicate logging of identical consecutive canvas operations
 */
declare const pluginListeners: PluginListener[];

export default pluginListeners;