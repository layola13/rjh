import { HSCore } from './core';
import { HSApp } from './app';
import { HSFPConstants } from './constants';

/**
 * Signal type for single room mode events
 */
type Signal<T = void> = HSCore.Util.Signal<T>;

/**
 * Single room handler interface
 */
interface ISingleRoomHandler {
  /**
   * Initialize the handler
   */
  init(): void;

  /**
   * Refresh target room with active view
   * @param view - The active view to refresh
   */
  refreshTargetRoomWithActiveView(view: unknown): void;

  /**
   * Cancel single room mode
   */
  cancelSingleRoom(): void;

  /**
   * Set the target room
   * @param roomId - The room identifier to set as target
   */
  setTargetRoom(roomId: string): void;

  /**
   * Get the current target room
   * @returns The target room identifier or undefined
   */
  getTargetRoom(): string | undefined;

  /**
   * Command to set target room
   * @param roomId - The room identifier
   * @param option1 - First command option
   * @param option2 - Second command option
   */
  cmdSetTargetRoom(roomId: string, option1: unknown, option2: unknown): void;

  /**
   * Update single room mode state
   * @param mode - The mode configuration
   */
  updateSingleRoomMode(mode: unknown): void;

  /**
   * Enter single room mode
   */
  enterSingleRoomMode(): void;

  /**
   * Exit single room mode
   */
  exitSingleRoomMode(): void;

  /**
   * Switch room by ID
   * @param roomId - The room identifier to switch to
   * @param options - Switch options
   */
  switchRoomById(roomId: string, options: unknown): void;
}

/**
 * Single room handler constructor options
 */
interface ISingleRoomHandlerOptions {
  /** Signal emitted when entering single room mode */
  signalEnterSingleRoomMode: Signal;
  /** Signal emitted when exiting single room mode */
  signalExitSingleRoomMode: Signal;
  /** Signal emitted when single room mode changes */
  signalChangeSingleRoomMode: Signal;
}

/**
 * Plugin configuration type
 */
interface IPluginConfig {
  /** Plugin name */
  name: string;
  /** Plugin description */
  description: string;
  /** Array of plugin dependencies */
  dependencies: HSFPConstants.PluginType[];
}

/**
 * Single Room Plugin
 * Manages single room mode switching and room targeting functionality
 */
declare class SingleRoomPlugin extends HSApp.Plugin.IPlugin {
  /** Handler instance managing single room operations */
  private handler?: ISingleRoomHandler;

  /** Signal dispatched when entering single room mode */
  public signalEnterSingleRoomMode?: Signal;

  /** Signal dispatched when exiting single room mode */
  public signalExitSingleRoomMode?: Signal;

  /** Signal dispatched when single room mode changes */
  public signalChangeSingleRoomMode?: Signal;

  /**
   * Constructor
   */
  constructor();

  /**
   * Called when plugin is activated
   * @param context - Plugin activation context
   * @param config - Plugin configuration
   */
  onActive(context: unknown, config: unknown): void;

  /**
   * Called when plugin is deactivated
   */
  onDeactive(): void;

  /**
   * Refresh the target room with the given view
   * @param view - The view to refresh the room with
   */
  refreshTargetRoom(view: unknown): void;

  /**
   * Cancel single room mode
   */
  cancelSingleRoom(): void;

  /**
   * Set the target room
   * @param roomId - The room identifier to set as target
   */
  setTargetRoom(roomId: string): void;

  /**
   * Get the current target room
   * @returns The target room identifier or undefined
   */
  getTargetRoom(): string | undefined;

  /**
   * Execute command to set target room
   * @param roomId - The room identifier
   * @param option1 - First command option
   * @param option2 - Second command option
   */
  cmdSetTargetRoom(roomId: string, option1: unknown, option2: unknown): void;

  /**
   * Update single room mode configuration
   * @param mode - The mode configuration to update
   */
  updateSingleRoomMode(mode: unknown): void;

  /**
   * Enter single room mode
   */
  enterSingleRoomMode(): void;

  /**
   * Exit single room mode
   */
  exitSingleRoomMode(): void;

  /**
   * Switch to a room by its identifier
   * @param roomId - The room identifier to switch to
   * @param options - Options for the room switch
   */
  switchRoomById(roomId: string, options: unknown): void;
}

export { SingleRoomPlugin, ISingleRoomHandler, ISingleRoomHandlerOptions, IPluginConfig };