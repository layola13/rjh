/**
 * Roofs Drawing Plugin
 * Handles layer editing, roof drawing operations, and user permissions
 */

import { Handler } from './handler';
import { NWTKUser } from './user';

/**
 * Plugin interface for roofs drawing functionality
 */
interface IRoofsDrawingPlugin extends HSApp.Plugin.IPlugin {
  /**
   * Handler instance for managing roof drawing operations
   */
  _handler: Handler | undefined;

  /**
   * Called when the plugin is activated
   * @param context - Plugin context containing app reference
   * @param options - Activation options
   */
  onActive(context: PluginContext, options: ActivationOptions): void;

  /**
   * Called when the plugin is deactivated
   */
  onDeactive(): void;

  /**
   * Enter the roofs drawing environment
   * @param options - Drawing environment options
   */
  enterRoofsDrawing(options: DrawingEnvironmentOptions): void;

  /**
   * Exit the roofs drawing environment
   */
  exitRoofsDrawing(): void;

  /**
   * Check if roofs can be drawn in the current state
   * @returns True if roofs can be drawn, false otherwise
   */
  canDrawRoofs(): boolean;

  /**
   * Display the layer selection dialog
   * @returns Promise resolving when dialog is handled
   */
  showLayerChooseDialog(): Promise<void>;

  /**
   * Get the currently selected roof object
   * @returns Selected roof instance, or roof from selected region
   */
  getSelectedRoof(): Roof | undefined;

  /**
   * Check user permissions for entering the roofs drawing environment
   * @param showDialog - Whether to show permission dialog if access denied
   * @returns Promise resolving to true if user has access rights
   */
  checkEnterRights(showDialog?: boolean): Promise<boolean>;

  /**
   * Process payment for trial usage
   * @returns Promise resolving when payment is processed
   */
  payTrialCost(): Promise<void>;

  /**
   * Display the marketing modal for roofs drawing feature
   * @returns Promise resolving when modal is closed
   */
  showRoofsDrawingMarketModal(): Promise<boolean>;
}

/**
 * Plugin context passed during activation
 */
interface PluginContext {
  /**
   * Application instance
   */
  app: HSApp.Application;
}

/**
 * Options for plugin activation
 */
interface ActivationOptions {
  [key: string]: unknown;
}

/**
 * Configuration for entering drawing environment
 */
interface DrawingEnvironmentOptions {
  [key: string]: unknown;
}

/**
 * Roof data structure
 */
interface Roof {
  [key: string]: unknown;
}

/**
 * Roof region containing roof reference
 */
interface RoofRegion {
  /**
   * Associated roof object
   */
  roof: Roof;
}

/**
 * Plugin metadata configuration
 */
interface PluginMetadata {
  /**
   * Plugin name
   */
  name: string;

  /**
   * Plugin description
   */
  description: string;

  /**
   * List of required plugin dependencies
   */
  dependencies: string[];
}

/**
 * Marketing badge plugin interface
 */
interface MarketingBadgePlugin extends HSApp.Plugin.IPlugin {
  /**
   * Show marketing modal for a specific feature
   * @param mode - Display mode (e.g., "render")
   * @param feature - Feature identifier (e.g., "roofs_drawing")
   * @param options - Modal configuration options
   */
  showMarketModal?(
    mode: string,
    feature: string,
    options: MarketModalOptions
  ): void;
}

/**
 * Marketing modal configuration
 */
interface MarketModalOptions {
  /**
   * Callback invoked when modal is closed
   */
  onClose: () => void;
}

/**
 * Roofs Drawing Plugin implementation
 * Manages layer editing, roof drawing operations, and user permissions
 */
declare class RoofsDrawingPlugin implements IRoofsDrawingPlugin {
  /**
   * Handler instance for roof drawing operations
   */
  _handler: Handler | undefined;

  /**
   * Initialize the plugin with metadata
   */
  constructor();

  /**
   * Activate the plugin
   * @param context - Plugin context with app reference
   * @param options - Activation options
   */
  onActive(context: PluginContext, options: ActivationOptions): void;

  /**
   * Deactivate the plugin
   */
  onDeactive(): void;

  /**
   * Enter roofs drawing environment
   * @param options - Drawing environment configuration
   */
  enterRoofsDrawing(options: DrawingEnvironmentOptions): void;

  /**
   * Exit roofs drawing environment
   */
  exitRoofsDrawing(): void;

  /**
   * Check if roofs can be drawn
   * @returns True if drawing is allowed
   */
  canDrawRoofs(): boolean;

  /**
   * Show layer selection dialog
   * @returns Promise resolving when dialog completes
   */
  showLayerChooseDialog(): Promise<void>;

  /**
   * Get currently selected roof
   * @returns Selected roof object or undefined
   */
  getSelectedRoof(): Roof | undefined;

  /**
   * Verify user has rights to enter drawing mode
   * @param showDialog - Show dialog on access denial (default: false)
   * @returns Promise resolving to access status
   */
  checkEnterRights(showDialog?: boolean): Promise<boolean>;

  /**
   * Process trial cost payment
   * @returns Promise resolving when payment completes
   */
  payTrialCost(): Promise<void>;

  /**
   * Display roofs drawing marketing modal
   * @returns Promise resolving to true when modal closes
   */
  showRoofsDrawingMarketModal(): Promise<boolean>;
}

export { RoofsDrawingPlugin, IRoofsDrawingPlugin };