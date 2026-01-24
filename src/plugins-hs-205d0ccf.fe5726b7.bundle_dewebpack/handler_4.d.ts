/**
 * Handler module for Sketch2D plugin
 * Manages command and request registration for 2D sketching operations
 */

/**
 * Application instance interface
 */
interface IApp {
  /** Command manager for registering and executing commands */
  cmdManager: ICommandManager;
  /** Transaction manager for registering and managing requests */
  transManager: ITransactionManager;
}

/**
 * Command manager interface
 */
interface ICommandManager {
  /**
   * Register multiple command type to command class mappings
   * @param mappings - Array of [commandType, commandClass] tuples
   */
  register(mappings: Array<[string, any]>): void;
}

/**
 * Transaction manager interface
 */
interface ITransactionManager {
  /**
   * Register multiple request type to request class mappings
   * @param mappings - Array of [requestType, requestClass] tuples
   */
  register(mappings: Array<[string, any]>): void;
}

/**
 * Plugin context interface
 */
interface IContext {
  /** Application instance */
  app: IApp;
}

/**
 * Left menu plugin interface
 */
interface ILeftMenuPlugin {
  /**
   * Register a strategy for left menu items
   * @param strategy - Strategy instance to register
   */
  registerStrategy(strategy: any): void;
}

/**
 * Plugin dependencies map
 */
interface IPluginDependencies {
  [key: string]: any;
}

/**
 * Plugin initialization parameters
 */
interface IPluginInitParams {
  /** Plugin execution context */
  context: IContext;
  /** Plugin dependencies map */
  dependencies: IPluginDependencies;
}

/**
 * Handler class for Sketch2D plugin
 * Responsible for initializing and registering commands, requests, and strategies
 */
export declare class Handler {
  /** Left menu plugin instance */
  leftMenuPlugin?: ILeftMenuPlugin;
  
  /** Application instance */
  app?: IApp;
  
  /** Plugin context */
  context?: IContext;

  /**
   * Initialize the handler with plugin parameters
   * Registers commands, requests, left menu strategies, and extraordinary sketch2d components
   * @param params - Plugin initialization parameters
   */
  init(params: IPluginInitParams): void;

  /**
   * Register left menu strategies
   * Retrieves strategies from DataBuilder and registers them with the left menu plugin
   * @private
   */
  private _registerLeftMenuStrategies(): void;

  /**
   * Register standard Sketch2D commands
   * Registers drawing, editing, and utility commands for 2D sketching
   */
  registerCommands(): void;

  /**
   * Register standard Sketch2D requests
   * Registers request handlers for drawing, editing, and transformation operations
   */
  registerRequests(): void;

  /**
   * Register extraordinary Sketch2D commands
   * Registers extended command set for advanced 2D sketching operations
   * @private
   */
  private _registerExSketch2dCmd(): void;

  /**
   * Register extraordinary Sketch2D requests
   * Registers extended request handlers for advanced 2D sketching operations
   * @private
   */
  private _registerExSketch2dReq(): void;
}