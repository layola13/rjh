/**
 * Module: module_836239
 * Original ID: 836239
 * 
 * Display controller for handling rotation operations on various entity types.
 * Supports rotation of CustomizedPMInstanceModel, NCustomizedStructure, NCustomizedBeam, Hole, and generic content.
 */

import HSCore from 'hscore';
import HSApp from 'hsapp';
import HSFPConstants from 'hsfp-constants';

/**
 * Supported entity types that can be rotated
 */
type RotatableEntity = 
  | HSCore.Model.CustomizedPMInstanceModel 
  | HSCore.Model.NCustomizedStructure 
  | HSCore.Model.NCustomizedBeam 
  | HSCore.Model.Hole 
  | unknown;

/**
 * Drag event data interface
 */
interface DragEvent {
  /** Event-specific data passed during drag operations */
  [key: string]: unknown;
}

/**
 * Command signal event data
 */
interface CommandSignalEvent {
  data: {
    /** The command that triggered the signal */
    cmd?: {
      /** Type identifier for the command */
      type: string;
      [key: string]: unknown;
    };
  };
}

/**
 * Application context interface
 */
interface ApplicationContext {
  /** Command manager for executing and managing commands */
  cmdManager: CommandManager;
  /** Plugin manager for accessing application plugins */
  pluginManager: PluginManager;
  [key: string]: unknown;
}

/**
 * Command manager interface
 */
interface CommandManager {
  /** Signal emitted when a command starts */
  signalCommandStarted: HSCore.Util.Signal;
  /** Signal emitted when a command resumes */
  signalCommandResumed: HSCore.Util.Signal;
  /** Currently executing command */
  current?: Command;
  /**
   * Creates a new command instance
   * @param commandType - Type of command to create
   * @param args - Arguments for the command
   */
  createCommand(commandType: string, args: unknown[]): Command;
  /**
   * Executes a command
   * @param command - Command to execute
   */
  execute(command: Command): void;
  /**
   * Sends data to the current command
   * @param action - Action type
   * @param data - Optional data payload
   */
  receive(action: string, data?: unknown): boolean;
  /**
   * Completes the current command
   */
  complete(): void;
}

/**
 * Command interface
 */
interface Command {
  /** Type identifier for the command */
  type: string;
  /** Whether to show the gizmo visual aid */
  showGizmo: boolean;
  [key: string]: unknown;
}

/**
 * Plugin manager interface
 */
interface PluginManager {
  /**
   * Retrieves a plugin by type
   * @param pluginType - Type identifier of the plugin
   */
  getPlugin(pluginType: string): Plugin | null;
}

/**
 * Plugin interface
 */
interface Plugin {
  /**
   * Hides the left menu
   */
  hideLeftMenu?(): void;
  [key: string]: unknown;
}

/**
 * Controller options passed during initialization
 */
interface ControllerOptions {
  /** Application context reference */
  application: ApplicationContext;
  [key: string]: unknown;
}

/**
 * Rotation display controller for handling drag-based rotation operations.
 * Extends the base DisplayController to provide rotation-specific behavior.
 */
export default class RotationDisplayController extends HSApp.View.Base.DisplayController {
  /** The entity being rotated */
  private entity: RotatableEntity;
  
  /** Reference to the application context */
  private app: ApplicationContext;
  
  /** Command manager instance */
  private cmdMgr: CommandManager;
  
  /** Signal hook for listening to command events */
  private signalHook: HSCore.Util.SignalHook;

  /**
   * Creates a new rotation display controller
   * @param entity - The entity to be rotated
   * @param options - Controller initialization options
   */
  constructor(entity: RotatableEntity, options: ControllerOptions);

  /**
   * Handles the drag start event to initiate rotation
   * @param event - The drag start event data
   * @returns True if the drag start was handled successfully
   */
  ondragstart(event: DragEvent): boolean;

  /**
   * Handles the drag move event to update rotation
   * @param event - The drag move event data
   * @returns True if the drag move was handled by an active rotation command
   */
  ondragmove(event: DragEvent): boolean;

  /**
   * Handles the drag end event to complete rotation
   * @returns True if the drag end was handled by an active rotation command
   */
  ondragend(): boolean;

  /**
   * Internal callback when a rotation command starts or resumes
   * Hides the left menu when rotation commands are active
   * @param event - Command signal event data
   * @private
   */
  private _onCommandRunning(event: CommandSignalEvent): void;

  /**
   * Cleans up resources when the controller is destroyed
   * @param args - Destruction arguments passed to parent class
   */
  destroy(...args: unknown[]): void;
}