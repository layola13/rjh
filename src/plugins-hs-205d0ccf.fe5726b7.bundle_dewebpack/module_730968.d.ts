/**
 * Module: TgWall Editing Plugin
 * Provides wall editing functionality including command registration and geometric path generation
 */

import { Loop } from './loop-module';
import { CmdCreateTgWall, CmdCreateRectTgWall } from './wall-commands';
import { CmdCreatePolygonTgWall } from './polygon-wall-commands';
import { CreateTgWallRequest, SwitchArcWallRequest } from './wall-requests';

/**
 * Point coordinates in 2D space
 */
interface Point2D {
  /** X coordinate */
  x: number;
  /** Y coordinate */
  y: number;
}

/**
 * Plugin configuration options
 */
interface PluginConfig {
  /** Plugin name identifier */
  name: string;
  /** Description of plugin functionality */
  description: string;
  /** Array of plugin dependencies */
  dependencies: string[];
}

/**
 * Application context containing managers
 */
interface AppContext {
  /** Application instance */
  app: {
    /** Command manager for registering commands */
    cmdManager: CommandManager;
    /** Transaction manager for registering requests */
    transManager: TransactionManager;
  };
}

/**
 * Command manager interface
 */
interface CommandManager {
  /**
   * Register multiple command handlers
   * @param commands - Array of command type and handler pairs
   */
  register(commands: Array<[string, new (...args: any[]) => any]>): void;
}

/**
 * Transaction manager interface
 */
interface TransactionManager {
  /**
   * Register multiple request handlers
   * @param requests - Array of request type and handler pairs
   */
  register(requests: Array<[string, new (...args: any[]) => any]>): void;
}

/**
 * Curve representation returned by geometric operations
 */
interface Curve {
  // Curve implementation details
}

/**
 * TgWall editing plugin class
 * Handles wall creation, editing commands and geometric path generation
 */
declare class TgWallEditingPlugin extends HSApp.Plugin.IPlugin {
  /**
   * Creates a new TgWall editing plugin instance
   */
  constructor();

  /**
   * Called when plugin is activated
   * Registers all wall-related commands and transaction handlers
   * @param context - Application context with manager instances
   */
  onActive(context: AppContext): void;

  /**
   * Called when plugin is deactivated
   * Cleanup operations if needed
   */
  onDeactive(): void;

  /**
   * Generates a convex path for wall geometry
   * Creates an 8-point convex shape with specific proportions
   * 
   * @param width - Total width of the convex shape (default: 5)
   * @param height - Total height of the convex shape (default: 5)
   * @returns Array of curves representing the convex path
   */
  getConvexPath(width?: number, height?: number): Curve[];

  /**
   * Generates an L-shaped path for wall geometry
   * Creates a 6-point L-shape with specified dimensions
   * 
   * @param width - Total width of the L-shape (default: 5)
   * @param height - Total height of the L-shape (default: 5)
   * @returns Array of curves representing the L-shaped path
   */
  getLPath(width?: number, height?: number): Curve[];
}

/**
 * Plugin registration constants
 */
declare namespace HSFPConstants {
  enum CommandType {
    CreateTgWall = 'CreateTgWall',
    CreateRectTgWall = 'CreateRectTgWall',
    CreatePolygonTgWall = 'CreatePolygonTgWall'
  }

  enum RequestType {
    CreateTgWall = 'CreateTgWall',
    SwitchArcWall = 'SwitchArcWall'
  }

  enum PluginType {
    TgWall = 'TgWall'
  }
}

/**
 * HSApp plugin namespace
 */
declare namespace HSApp.Plugin {
  /**
   * Base plugin interface
   */
  abstract class IPlugin {
    constructor(config: PluginConfig);
  }

  /**
   * Register a plugin with the application
   * @param pluginType - Type identifier for the plugin
   * @param pluginClass - Plugin class constructor
   */
  function registerPlugin(
    pluginType: string,
    pluginClass: new () => IPlugin
  ): void;
}

export { TgWallEditingPlugin, Point2D, PluginConfig, AppContext };