/**
 * Camera plugin for handling camera operations and commands
 * @module CameraPlugin
 */

/**
 * Command registration entry for camera commands
 */
interface CommandRegistration {
  /** Command type identifier */
  commandType: string;
  /** Command handler class */
  handler: new (...args: any[]) => ICommand;
}

/**
 * Plugin activation event context
 */
interface PluginActivationEvent {
  /** Reference to the main application instance */
  app: {
    /** Command manager for registering and executing commands */
    cmdManager: {
      /** Register multiple command handlers */
      register(commands: Array<[string, new (...args: any[]) => ICommand]>): void;
    };
  };
}

/**
 * Base command interface
 */
interface ICommand {
  execute(...args: any[]): void;
  undo?(): void;
}

/**
 * Camera plugin configuration
 */
interface PluginConfig {
  /** Plugin identifier name */
  name: string;
  /** Human-readable description of plugin functionality */
  description: string;
  /** Array of plugin dependencies */
  dependencies: string[];
}

/**
 * Base plugin interface from HSApp framework
 */
declare class IPlugin {
  constructor(config: PluginConfig);
  
  /**
   * Called when plugin is activated
   * @param event - Activation event containing app context
   */
  onActive(event: PluginActivationEvent): void;
  
  /**
   * Called when plugin is deactivated
   */
  onDeactive(): void;
}

/**
 * Camera plugin for processing camera change commands
 * Handles various camera operations including movement, FOV, clipping, and targeting
 */
declare class CameraPlugin extends IPlugin {
  constructor();
  
  /**
   * Registers all camera-related command handlers when plugin activates
   * @param event - Activation event containing command manager reference
   */
  onActive(event: PluginActivationEvent): void;
  
  /**
   * Cleanup handler for plugin deactivation
   */
  onDeactive(): void;
}

/**
 * Command for automatic camera movement animations
 */
declare class AutoMoveCameraCommand implements ICommand {
  execute(...args: any[]): void;
}

/**
 * Command for changing camera clipping planes
 */
declare class ChangeCameraClipCommand implements ICommand {
  execute(...args: any[]): void;
}

/**
 * Command for changing camera field of view
 */
declare class ChangeCameraFovCommand implements ICommand {
  execute(...args: any[]): void;
}

/**
 * Command for basic camera movement
 */
declare class MoveCameraCommand implements ICommand {
  execute(...args: any[]): void;
}

/**
 * Command for 3D camera movement
 */
declare class MoveCamera3DCommand implements ICommand {
  execute(...args: any[]): void;
}

/**
 * Command for orthographic camera movement in 3D space
 */
declare class CmdMoveOrthCamera3D implements ICommand {
  execute(...args: any[]): void;
}

/**
 * Command for moving camera clipping planes
 */
declare class MoveCameraClipCommand implements ICommand {
  execute(...args: any[]): void;
}

/**
 * Command for moving camera target/look-at point
 */
declare class MoveCameraTargetCommand implements ICommand {
  execute(...args: any[]): void;
}

/**
 * Command for resetting camera to default state
 */
declare class ResetCameraCommand implements ICommand {
  execute(...args: any[]): void;
}

/**
 * Global constants for command types
 */
declare namespace HSFPConstants {
  enum CommandType {
    AutoMoveCamera = 'AutoMoveCamera',
    ChangeCameraClip = 'ChangeCameraClip',
    ChangeCameraFov = 'ChangeCameraFov',
    MoveCamera = 'MoveCamera',
    MoveCamera3D = 'MoveCamera3D',
    MoveOrthCamera3D = 'MoveOrthCamera3D',
    MoveCameraClip = 'MoveCameraClip',
    MoveCameraTarget = 'MoveCameraTarget',
    ResetCamera = 'ResetCamera'
  }
}

/**
 * HSApp framework namespace
 */
declare namespace HSApp {
  namespace Plugin {
    /**
     * Registers a plugin with the framework
     * @param pluginId - Unique identifier for the plugin
     * @param pluginClass - Plugin class constructor
     */
    function registerPlugin(pluginId: string, pluginClass: new () => IPlugin): void;
    
    export { IPlugin };
  }
}

export {
  CameraPlugin,
  AutoMoveCameraCommand,
  ChangeCameraClipCommand,
  ChangeCameraFovCommand,
  MoveCameraCommand,
  MoveCamera3DCommand,
  CmdMoveOrthCamera3D,
  MoveCameraClipCommand,
  MoveCameraTargetCommand,
  ResetCameraCommand,
  PluginConfig,
  PluginActivationEvent,
  CommandRegistration,
  ICommand,
  IPlugin
};