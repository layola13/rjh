/**
 * Layer Editing Plugin Module
 * Handles layer edit commands and gizmos in the HSFP application.
 * Module ID: 230123
 */

import { FloorDimension } from './floor-dimension';

/**
 * Plugin metadata configuration
 */
interface PluginMetadata {
  /** Plugin display name */
  name: string;
  /** Plugin description */
  description: string;
  /** Array of dependent plugin types required for this plugin to function */
  dependencies: string[];
}

/**
 * Application context provided during plugin activation
 */
interface PluginContext {
  /** Main application instance */
  app: unknown;
}

/**
 * Layer edit bar parameters configuration
 */
interface LayerEditBarParams {
  [key: string]: unknown;
}

/**
 * Layer data structure returned from edit operations
 */
interface LayerEditData {
  [key: string]: unknown;
}

/**
 * Floorplan modification data structure
 */
interface FloorplanModificationData {
  [key: string]: unknown;
}

/**
 * Category dependency configuration for floorplan modifications
 */
interface CategoryDependency {
  [key: string]: unknown;
}

/**
 * Layer edit mode enumeration
 */
type EditMode = string | number;

/**
 * Internal handler for layer editing operations
 */
interface LayerEditHandler {
  init(app: unknown, config: unknown): void;
  enterSlabEdit(data: unknown): void;
  exitSlabEdit(): void;
  _canShow(): boolean;
  show(): void;
  hide(): void;
  disableLayerEdit(flag: boolean): void;
  enableLayerEdit(): void;
  setPosition(x: number, y: number): void;
  resetPosition(): void;
  setEditMode(mode: EditMode): void;
  setLayerEditReadonlyMode(): void;
  setLayerEditEditMode(): void;
  setDarkMode(enabled: boolean): void;
  setlayerEditBarParams(params: LayerEditBarParams): void;
  getLayersEditData(layerId: string): LayerEditData;
  activateLayer(layerId: string): void;
  exportFloorplanModificationData(dependency: CategoryDependency): FloorplanModificationData;
}

/**
 * Base plugin interface from HSFP framework
 */
declare class IPlugin {
  constructor(metadata: PluginMetadata);
}

/**
 * Layer Editing Plugin
 * 
 * Manages layer editing functionality including:
 * - Slab editing operations
 * - Layer visibility and activation
 * - Edit mode controls (readonly/edit)
 * - Position management
 * - Dark mode support
 * - Floorplan modification data export
 */
declare class LayerEditPlugin extends IPlugin {
  /**
   * Internal handler instance managing layer edit operations
   * @private
   */
  private _handler: LayerEditHandler;

  constructor();

  /**
   * Called when the plugin is activated
   * @param context - Plugin context containing app instance
   * @param config - Plugin configuration object
   */
  onActive(context: PluginContext, config: unknown): void;

  /**
   * Called when the plugin is deactivated
   */
  onDeactive(): void;

  /**
   * Enter slab editing mode
   * @param data - Slab data to edit
   */
  enterSlabEdit(data: unknown): void;

  /**
   * Exit slab editing mode
   */
  exitSlabEdit(): void;

  /**
   * Check if the layer editor can be shown
   * @returns True if the editor can be displayed
   */
  canShow(): boolean;

  /**
   * Show the layer editor UI
   */
  show(): void;

  /**
   * Hide the layer editor UI
   */
  hide(): void;

  /**
   * Disable layer editing functionality
   * @param flag - Additional flag parameter (default: false)
   */
  disableLayerEdit(flag?: boolean): void;

  /**
   * Enable layer editing functionality
   */
  enableLayerEdit(): void;

  /**
   * Set the position of the layer editor
   * @param x - Horizontal position
   * @param y - Vertical position
   */
  setPosition(x: number, y: number): void;

  /**
   * Reset the layer editor position to default
   */
  resetPosition(): void;

  /**
   * Set the current edit mode
   * @param mode - Edit mode identifier
   */
  setEditMode(mode: EditMode): void;

  /**
   * Set layer editor to readonly mode
   */
  setLayerEditReadonlyMode(): void;

  /**
   * Set layer editor to edit mode
   */
  setLayerEditEditMode(): void;

  /**
   * Toggle dark mode for the layer editor
   * @param enabled - True to enable dark mode, false to disable
   */
  setDarkMode(enabled: boolean): void;

  /**
   * Configure layer edit bar parameters
   * @param params - Configuration parameters for the layer edit bar
   */
  setlayerEditBarParams(params: LayerEditBarParams): void;

  /**
   * Retrieve edit data for specified layers
   * @param layerId - Layer identifier
   * @returns Layer edit data
   */
  getLayersEditData(layerId: string): LayerEditData;

  /**
   * Activate a specific layer
   * @param layerId - Layer identifier to activate
   */
  activateLayer(layerId: string): void;

  /**
   * Export floorplan modification data with category dependencies
   * @param categoryName - Category dependency name (default: "defaultCategoryDependency")
   * @returns Promise resolving to floorplan modification data
   */
  exportFloorplanModificationData(categoryName?: string): Promise<FloorplanModificationData>;

  /**
   * Create a floor dimension gizmo instance
   * @param param1 - First parameter for dimension creation
   * @param param2 - Second parameter for dimension creation
   * @param param3 - Third parameter for dimension creation
   * @returns Floor dimension gizmo instance
   */
  createFloorDimensionGizmo(param1: unknown, param2: unknown, param3: unknown): FloorDimension;
}

/**
 * Global HSFP constants namespace
 */
declare namespace HSFPConstants {
  /**
   * Plugin type identifiers
   */
  enum PluginType {
    Toolbar = 'Toolbar',
    ContextualTools = 'ContextualTools',
    PropertyBar = 'PropertyBar',
    LeftMenu = 'LeftMenu',
    RightMenu = 'RightMenu',
    PageHeader = 'PageHeader',
    LayerEdit = 'LayerEdit'
  }
}

/**
 * Global HSFP application namespace
 */
declare namespace HSApp {
  namespace Plugin {
    /**
     * Register a plugin with the application
     * @param pluginType - Plugin type identifier
     * @param pluginClass - Plugin class constructor
     */
    function registerPlugin(pluginType: string, pluginClass: typeof IPlugin): void;
  }
}

export { LayerEditPlugin, LayerEditHandler, PluginMetadata, LayerEditBarParams, LayerEditData, FloorplanModificationData };