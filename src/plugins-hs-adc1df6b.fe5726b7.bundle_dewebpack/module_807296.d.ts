/**
 * Open Door Plugin Module
 * Provides functionality for opening and closing doors in 3D models
 */

import { IPlugin } from 'HSApp.Plugin';
import { PluginType } from 'HSFPConstants';

/**
 * Handler interface for door operations
 */
interface IDoorHandler {
  /**
   * Initialize the door handler
   * @param viewer - The 3D viewer instance
   * @param options - Configuration options
   */
  init(viewer: unknown, options: unknown): void;

  /**
   * Uninitialize and cleanup the handler
   */
  uninit(): void;

  /**
   * Internal handler for opening a door
   * @param doorId - Identifier of the door to open
   */
  _onOpenDoor(doorId: string | number): void;

  /**
   * Internal handler for closing a door
   * @param doorId - Identifier of the door to close
   */
  _onCloseDoor(doorId: string | number): void;
}

/**
 * Plugin configuration interface
 */
interface IPluginConfig {
  /** Plugin display name */
  name: string;
  /** Plugin description */
  description: string;
  /** Array of required plugin dependencies */
  dependencies: PluginType[];
}

/**
 * Open Door Plugin class
 * Manages door opening and closing operations in 3D models
 */
declare class OpenDoorPlugin extends IPlugin {
  /** Internal handler for door operations */
  private _handler: IDoorHandler;

  /**
   * Creates a new OpenDoorPlugin instance
   */
  constructor();

  /**
   * Called when the plugin is activated
   * @param viewer - The 3D viewer instance
   * @param options - Activation options
   */
  onActive(viewer: unknown, options: unknown): void;

  /**
   * Called when the plugin is deactivated
   * Performs cleanup operations
   */
  onDeactive(): void;

  /**
   * Opens a specified door in the 3D model
   * @param doorId - Identifier of the door to open
   */
  onOpenDoor(doorId: string | number): void;

  /**
   * Closes a specified door in the 3D model
   * @param doorId - Identifier of the door to close
   */
  onCloseDoor(doorId: string | number): void;
}

/**
 * Global HSApp namespace
 */
declare namespace HSApp {
  namespace Plugin {
    /** Base plugin interface */
    export class IPlugin {
      constructor(config: IPluginConfig);
    }

    /**
     * Registers a plugin with the plugin system
     * @param pluginType - The type identifier for the plugin
     * @param pluginClass - The plugin class constructor
     */
    export function registerPlugin(
      pluginType: PluginType,
      pluginClass: new () => IPlugin
    ): void;
  }
}

/**
 * Global constants namespace
 */
declare namespace HSFPConstants {
  enum PluginType {
    /** Contextual tools plugin type */
    ContextualTools = 'ContextualTools',
    /** Open door plugin type */
    OpenDoor = 'OpenDoor'
  }
}

export { OpenDoorPlugin };