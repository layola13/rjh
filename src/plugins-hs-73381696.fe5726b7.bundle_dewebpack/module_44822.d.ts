/**
 * Marking System Plugin for toolbar
 * Provides marking/annotation functionality with persistence
 */

import type { HSApp } from './hsapp';
import type { IPlugin, PluginActivationContext, PluginDependencies } from './plugin-types';
import type { Handler } from './handler';
import type { SignalHook } from './signal-hook';
import type { PersistencePlugin } from './persistence-plugin';

/**
 * Plugin initialization options
 */
interface PluginInitOptions {
  /** Application instance */
  app: HSApp;
  /** Resolved plugin dependencies */
  dependencies: PluginDependencies;
}

/**
 * Marking history entry structure
 */
interface MarkingHistoryEntry {
  /** Timestamp of the marking */
  timestamp: Date;
  /** User identifier */
  userId?: string;
  /** Marking content/data */
  content: unknown;
  /** Additional metadata */
  metadata?: Record<string, unknown>;
}

/**
 * Marking System Plugin
 * Manages marking/annotation system for the toolbar with persistence support
 */
declare class MarkingSystemPlugin extends IPlugin {
  /** Handler for marking operations */
  private _handler: Handler;
  
  /** Signal hook for event handling */
  private _signalHook: SignalHook;
  
  /** Application instance reference */
  private _app: HSApp;
  
  /** Signal emitted when marking is logged */
  public signalMarkingToLog: HSApp.Util.Signal<MarkingHistoryEntry>;

  constructor();

  /**
   * Called when plugin is activated
   * @param context - Plugin activation context
   * @param dependencies - Resolved plugin dependencies
   */
  onActive(context: PluginActivationContext, dependencies: PluginDependencies): void;

  /**
   * Called when plugin is deactivated
   */
  onDeactive(): void;

  /**
   * Adds a new entry to marking history
   * @param entry - Marking history entry to add
   */
  addMarkingHistory(entry: MarkingHistoryEntry): void;

  /**
   * Retrieves all marking history entries
   * @returns Array of marking history entries
   */
  getMarkingHistory(): MarkingHistoryEntry[];

  /**
   * Opens the marking system panel UI
   * Automatically triggered after successful save in TPZZ/TPZZCabinet environments
   */
  openMarkingSystemPanel(): void;

  /**
   * Handles successful save operations
   * Checks environment and last marking time to determine if panel should open
   * @internal
   */
  private handleSaveSuccess(): void;
}

/**
 * Storage key for last marking timestamp
 */
declare const LAST_MARKING_TIME_KEY = "Last_Marking_Time";

/**
 * Plugin metadata
 */
declare const PLUGIN_METADATA: {
  /** Plugin display name */
  name: "MarkingSystem Plugin";
  /** Plugin description */
  description: "marking system for toolbar";
  /** Required plugin dependencies */
  dependencies: [typeof HSFPConstants.PluginType.Persistence];
};

export { MarkingSystemPlugin, MarkingHistoryEntry, PluginInitOptions, PLUGIN_METADATA };
export default MarkingSystemPlugin;