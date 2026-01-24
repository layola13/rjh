/**
 * Layer edit bar parameter interface
 */
export interface ILayerEditBarParams {
  // Specific properties would be defined in the imported module
}

/**
 * Layer data structure for export
 */
export interface LayerData {
  layer: any; // HSApp layer type
  // Additional layer properties
}

/**
 * Active layer data structure
 */
export interface ActiveLayerData {
  // Active layer specific properties
}

/**
 * Options for getting layers edit data
 */
export interface GetLayersEditDataOptions {
  includedLayers?: any[]; // Array of layer objects to include
}

/**
 * Result of getting layers edit data
 */
export interface LayersEditDataResult {
  allLayersData: LayerData[];
  activeLayerData: ActiveLayerData;
}

/**
 * Floorplan modification data export result
 */
export interface FloorplanModificationData {
  design_id: string;
  design_version: string;
  activeLayerIndex: number;
  layersData: Array<{
    layerIndex: number;
    data: any;
  }>;
}

/**
 * Layer edit bar initialization parameters
 */
export interface LayerEditBarInitParams {
  app: any; // HSApp.App instance
  handler: any;
  dependencies: Record<string, any>;
}

/**
 * Signal hook event data for selection changes
 */
export interface SelectionChangedEventData {
  event?: MouseEvent;
}

/**
 * Signal hook event data for environment activation
 */
export interface EnvironmentActivatedEventData {
  newEnvironmentId: string;
}

/**
 * Signal hook event data for status bar population
 */
export interface PopulateStatusBarEventData {
  option?: {
    refreshLayerEditBar?: boolean;
  };
}

/**
 * Context menu customized item
 */
export interface ContextMenuCustomizedItem {
  label: string;
  id: string;
  src: string;
  order: number;
  uiMode: string[];
  disable?: boolean;
  onClick: () => void;
}

/**
 * Signal hook event data for right menu population
 */
export interface PopulateRightMenuCustomizedEventData {
  defaultItems: ContextMenuCustomizedItem[];
  customizedItems: ContextMenuCustomizedItem[];
}

/**
 * Layer editor plugin handler class
 * Manages layer editing functionality, slab editing environment, and UI interactions
 */
export default class LayerEditorPlugin {
  /**
   * Signal hook for managing event listeners
   */
  private _signalHook: any; // HSCore.Util.SignalHook instance

  /**
   * Layer edit bar UI component
   */
  public layerEditBar: any;

  /**
   * Flag indicating if layer edit is manually disabled
   */
  private _manualDisable: boolean;

  /**
   * Application instance reference
   */
  private _app: any; // HSApp.App instance

  /**
   * Environment ID to return to after exiting slab edit
   */
  private _fromEnvironmentId?: string;

  /**
   * Previous 2D view mode before entering slab edit
   */
  private _prevEnv2DViewMode: any; // HSApp.View.ViewModeEnum

  /**
   * Contextual tools plugin reference
   */
  private _contextualToolsPlugin?: any;

  /**
   * Menu plugin reference
   */
  private _menuPlugin?: any;

  /**
   * Bottom offset for layer edit bar positioning
   */
  public offsetBottom: number;

  constructor();

  /**
   * Initialize the layer editor plugin
   * @param app - Application instance
   * @param dependencies - Plugin dependencies map
   */
  public init(app: any, dependencies: Record<string, any>): void;

  /**
   * Start listening to slab edit specific signals
   */
  private _listenSlabEditSignals(): void;

  /**
   * Stop listening to slab edit specific signals
   */
  private _unListenSlabEditSignals(): void;

  /**
   * Register all layer-related commands with the command manager
   */
  public registerCommands(): void;

  /**
   * Register all layer-related requests with the transaction manager
   */
  public registerRequests(): void;

  /**
   * Register slab edit environment
   * @param dependencies - Plugin dependencies
   */
  public registerEnvironments(dependencies: Record<string, any>): void;

  /**
   * Handle selection change events
   * @param event - Selection changed event data
   */
  private _onSelectionChanged(event: { data: SelectionChangedEventData }): void;

  /**
   * Enter slab edit mode for a specific layer
   * @param layer - Layer to edit
   */
  public enterSlabEdit(layer: any): void;

  /**
   * Exit slab edit mode and return to previous environment
   */
  public exitSlabEdit(): void;

  /**
   * Set parameters for the layer edit bar
   * @param params - Layer edit bar parameters
   */
  public setlayerEditBarParams(params: ILayerEditBarParams): void;

  /**
   * Show the layer edit bar
   */
  public show(): void;

  /**
   * Hide the layer edit bar
   */
  public hide(): void;

  /**
   * Set the position of the layer edit bar
   * @param left - Left position (optional)
   * @param bottom - Bottom position (optional)
   */
  public setPosition(left?: number, bottom?: number): void;

  /**
   * Reset the layer edit bar position to default
   */
  public resetPosition(): void;

  /**
   * Set the edit mode for the layer edit bar
   * @param mode - Edit mode value
   */
  public setEditMode(mode: any): void;

  /**
   * Enable or disable dark mode for the layer edit bar
   * @param enabled - True to enable dark mode
   */
  public setDarkMode(enabled: boolean): void;

  /**
   * Disable layer editing
   * @param manual - True if manually disabled (default: false)
   */
  public disableLayerEdit(manual?: boolean): void;

  /**
   * Set layer edit bar to readonly mode
   */
  public setLayerEditReadonlyMode(): void;

  /**
   * Set layer edit bar to edit mode
   */
  public setLayerEditEditMode(): void;

  /**
   * Enable layer editing
   */
  public enableLayerEdit(): void;

  /**
   * Initialize the layer editor UI component
   */
  public initLayerEditor(): void;

  /**
   * Handle view change events
   */
  public onViewChanged(): void;

  /**
   * Handle environment activation events
   * @param event - Environment activation event data
   */
  private _onEnvironmentActivated(event: { data: EnvironmentActivatedEventData }): void;

  /**
   * Check if the layer edit bar can be shown based on current state
   * @returns True if the bar can be shown
   */
  private _canShow(): boolean;

  /**
   * Switch the 2D view mode
   * @param mode - View mode to switch to
   */
  private _switch2DViewMode(mode: any): void;

  /**
   * Update the visibility of the layer edit bar based on current state
   */
  public updateVisibility(): void;

  /**
   * Check if currently in slab edit environment
   * @returns True if in slab edit environment
   */
  public isInEditSlabEnv(): boolean;

  /**
   * Handle status bar population events
   * @param event - Populate status bar event data
   */
  private _onPopulateStatusBar(event: { data: PopulateStatusBarEventData }): void;

  /**
   * Handle right menu customization for slab edit context
   * @param event - Populate right menu event data
   */
  public onPopulateRightmenuCustomized(event: { data: PopulateRightMenuCustomizedEventData }): void;

  /**
   * Get layers edit data with optional filtering
   * @param options - Options for filtering layers
   * @returns Object containing all layers data and active layer data
   */
  public getLayersEditData(options?: GetLayersEditDataOptions): LayersEditDataResult;

  /**
   * Activate a specific layer
   * @param layer - Layer to activate
   */
  public activateLayer(layer: any): void;

  /**
   * Get list of environment IDs where the layer edit bar should be shown
   * @returns Array of environment IDs
   */
  private _getShowEnvironments(): string[];

  /**
   * Export floorplan modification data for all layers
   * @param target - Export target parameter
   * @returns Floorplan modification data structure
   */
  public exportFloorplanModificationData(target: any): FloorplanModificationData;
}