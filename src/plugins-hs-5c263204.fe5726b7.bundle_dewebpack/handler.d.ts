/**
 * Handler module for floorplan mirror operations
 * Original Module ID: 278175
 */

/**
 * Dependencies required by the Handler
 */
interface HandlerDependencies {
  [HSFPConstants.PluginType.Toolbar]: ToolbarPlugin;
  [key: string]: unknown;
}

/**
 * Initialization parameters for the Handler
 */
interface HandlerInitOptions {
  /** Application dependencies */
  dependencies: HandlerDependencies;
  /** Main application instance */
  app: Application;
}

/**
 * Mirror operation options
 */
interface MirrorOptions {
  /** Floorplan instance to mirror */
  floorplan: Floorplan;
  /** Mirror direction (horizontal or vertical) */
  direction: HSCore.Model.MirrorType;
  /** Handler dependencies */
  dependencies: HandlerDependencies;
  /** Handler instance */
  handler: Handler;
}

/**
 * Toolbar item configuration
 */
interface ToolbarItemConfig {
  /** Unique name identifier */
  name: string;
  /** Item type */
  type: 'image' | 'button' | string;
  /** Display label */
  label: string;
  /** Sort order in toolbar */
  order: number;
  /** Icon path or URL */
  icon: string;
  /** Click event handler */
  onclick: () => void;
}

/**
 * Toolbar item interface
 */
interface ToolbarItem {
  /** Enable the toolbar item */
  enable(): void;
  /** Disable the toolbar item */
  disable(): void;
  /** Add a child item */
  add(config: ToolbarItemConfig): void;
}

/**
 * Toolbar plugin interface
 */
interface ToolbarPlugin {
  /** Get toolbar item by name */
  getItem(name: string): ToolbarItem | null;
}

/**
 * Command manager interface
 */
interface CommandManager {
  /** Register a command type */
  register(commandType: string, commandClass: unknown): void;
  /** Create a command instance */
  createCommand(commandType: string, args: unknown[]): Command;
  /** Execute a command */
  execute(command: Command): void;
}

/**
 * Transaction manager interface
 */
interface TransactionManager {
  /** Register a request type */
  register(requestType: string, requestClass: unknown): void;
}

/**
 * 2D view interface
 */
interface View2D {
  /** Fit the view to content */
  fit(): void;
}

/**
 * Application interface
 */
interface Application {
  /** Command manager instance */
  cmdManager: CommandManager;
  /** Transaction manager instance */
  transManager: TransactionManager;
  /** Current floorplan */
  floorplan: Floorplan;
  /** Switch to 2D view mode */
  switchTo2DView(): void;
  /** Get active 2D view */
  getActive2DView(): View2D;
}

/**
 * Command interface
 */
interface Command {
  execute(): void;
  undo(): void;
}

/**
 * Floorplan interface
 */
interface Floorplan {
  // Floorplan properties and methods
  [key: string]: unknown;
}

/**
 * Handler class for managing floorplan mirror operations
 * Handles toolbar integration, command registration, and mirror transformations
 */
export declare class Handler {
  /** Application dependencies */
  private _dependencies: HandlerDependencies;
  
  /** Main application instance */
  private _app: Application;
  
  /** Command manager reference */
  private _cmdMgr: CommandManager;
  
  /** Toolbar plugin reference */
  private _toolbarPlugin: ToolbarPlugin;
  
  /** Signal hook for event management */
  private _signalHook: HSCore.Util.SignalHook;

  /**
   * Initialize the handler with application context
   * Registers commands, requests, and sets up dependencies
   * @param options - Initialization options containing app and dependencies
   */
  init(options: HandlerInitOptions): void;

  /**
   * Execute mirror operation on the floorplan
   * Switches to 2D view, tracks event, and executes mirror command
   * @param direction - Mirror direction (horizontal or vertical)
   * @param eventName - Event tracking identifier
   * @private
   */
  private _mirrorfloorplan(
    direction: HSCore.Model.MirrorType,
    eventName: string
  ): void;

  /**
   * Inject default toolbar items for mirror operations
   * Adds horizontal and vertical mirror buttons to construction toolbar
   * @private
   */
  private _injectDefaultToolbar(): void;

  /**
   * Enable or disable a toolbar item by name
   * @param itemName - Full path name of the toolbar item
   * @param enabled - True to enable, false to disable
   * @private
   */
  private _enableToolbarItem(itemName: string, enabled: boolean): void;

  /**
   * Handle environment change events
   * Enables all mirror-related toolbar items when environment changes
   * @param event - Environment change event data
   * @private
   */
  private _onEnvironmentChange(event: unknown): void;

  /**
   * Clean up resources and unregister event listeners
   * Called when the handler is being destroyed
   */
  uninit(): void;
}