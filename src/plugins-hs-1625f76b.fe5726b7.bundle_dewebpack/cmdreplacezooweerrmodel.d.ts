/**
 * Command for replacing zoo models with reverse render models
 * @module CmdReplaceZooWeeRRModel
 */

import { Command } from 'HSApp.Cmd';
import { App } from 'HSApp.App';
import { ICatalogPlugin } from 'HSFPConstants.PluginType';
import { ISelectionManager, ITransactionManager } from 'HSApp';
import { Message } from 'NWTK';

/**
 * Signal event data for panel hidden event
 */
interface IPanelHiddenEventData {
  /** Whether to keep the panel opening */
  keepOpening?: boolean;
}

/**
 * Event object for panel hidden signal
 */
interface IPanelHiddenEvent {
  /** Event data payload */
  data?: IPanelHiddenEventData;
}

/**
 * Options for opening replace panel
 */
interface IReplaceRenderPanelOptions {
  /** Source identifier for the panel */
  source: string;
  /** Custom title for the panel */
  customTitle: string;
  /** Function to query products from catalog */
  queryProducts: () => Promise<unknown>;
}

/**
 * Catalog plugin interface with reverse render functionality
 */
interface ICatalogPlugin {
  /** Signal emitted when independent panel is hidden */
  signalIndependentHidden: {
    listen(handler: (event: IPanelHiddenEvent) => void, context: unknown): void;
    unlisten(handler: (event: IPanelHiddenEvent) => void, context: unknown): void;
  };
  
  /** Opens the reverse render replace panel */
  openReverseRenderReplacePanel(options: IReplaceRenderPanelOptions): void;
  
  /** Closes the independent panel */
  closeIndependent(): void;
}

/**
 * Context interface for command execution
 */
interface ICommandContext {
  /** Selection manager instance */
  selectionManager: ISelectionManager;
  /** Transaction manager instance */
  transManager: ITransactionManager;
}

/**
 * Selection manager interface
 */
interface ISelectionManager {
  /** Get currently selected items */
  selected(): unknown[];
  /** Unselect an item */
  unselect(item: unknown): void;
  /** Select an item */
  select(item: unknown): void;
}

/**
 * Transaction manager interface
 */
interface ITransactionManager {
  /** Create a transaction request */
  createRequest(
    type: string,
    params: [unknown, unknown, Record<string, unknown>]
  ): unknown;
  
  /** Commit a transaction request */
  commit(request: unknown): unknown | null;
}

/**
 * Command for replacing zoo models with reverse render models from catalog
 * Handles panel display, model selection and replacement operations
 */
export declare class CmdReplaceZooWeeRRModel extends Command {
  /** Catalog plugin instance */
  private _catalogPlugin?: ICatalogPlugin;
  
  /** Application instance */
  private _app: App;
  
  /** Flag indicating if hidden handler was called */
  private _hiddenHandlerCalled?: boolean;
  
  /** Command context */
  protected context: ICommandContext;
  
  /** Command manager */
  protected mgr: {
    complete(command: Command): void;
  };
  
  /**
   * Creates a new instance of CmdReplaceZooWeeRRModel
   */
  constructor();
  
  /**
   * Execute the command - shows the replace panel
   */
  onExecute(): void;
  
  /**
   * Cleanup when command finishes
   * Unregisters listeners and closes panel if needed
   */
  onCleanup(): void;
  
  /**
   * Shows the replace panel with custom configuration
   * @private
   */
  private _showReplacePanel(): void;
  
  /**
   * Receives messages during command execution
   * @param messageType - Type of message received
   * @param data - Message data payload
   * @returns True if message was handled
   */
  onReceive(messageType: string, data: unknown): boolean;
  
  /**
   * Handler for panel hidden event
   * @param event - Panel hidden event data
   * @private
   */
  private _onPanelHidden(event: IPanelHiddenEvent): void;
  
  /**
   * Indicates whether this command supports undo/redo
   * @returns False - this command cannot be undone/redone
   */
  canUndoRedo(): boolean;
  
  /**
   * Indicates whether undo/redo is allowed during command execution
   * @returns True - undo/redo is allowed during execution
   */
  canUndoRedoInCommand(): boolean;
  
  /**
   * Internal handler when panel is hidden
   * Unselects the currently selected item
   * @private
   */
  private _panelHiddenHandler(): void;
  
  /**
   * Replaces the selected model with a new model from catalog
   * @param context - Command execution context
   * @param newModel - New model to replace with
   * @private
   */
  private _replaceSelectedModel(context: ICommandContext, newModel: unknown): void;
}