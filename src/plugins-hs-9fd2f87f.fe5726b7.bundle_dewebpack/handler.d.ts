/**
 * Handler module for managing editor modes and plugin states
 * Original Module ID: 609051
 */

/**
 * Edit model types
 */
export enum EditModel {
  /** Read-only mode - no editing allowed */
  READONLY = 'READONLY',
  /** Viewer mode - viewing only */
  VIEWER = 'VIEWER',
  /** Edit mode - full editing capabilities */
  EDIT = 'EDIT'
}

/**
 * Plugin type identifiers
 */
export enum PluginType {
  PageHeader = 'PageHeader',
  Toolbar = 'Toolbar',
  Catalog = 'Catalog',
  LeftMenu = 'LeftMenu',
  PropertyBar = 'PropertyBar',
  LayerEdit = 'LayerEdit',
  UserInfo = 'UserInfo',
  CameraPosition = 'hsw.plugin.cameraposition.Plugin'
}

/**
 * Page header configuration options
 */
export interface PageHeaderOptions {
  [key: string]: unknown;
}

/**
 * Handler configuration options
 */
export interface HandlerOptions {
  /** Page header specific options */
  pageHeaderOptions?: PageHeaderOptions;
  [key: string]: unknown;
}

/**
 * Plugin interface - base interface for all plugins
 */
export interface IPlugin {
  [key: string]: unknown;
}

/**
 * Catalog plugin interface
 */
export interface ICatalogPlugin extends IPlugin {
  /** Set catalog to read-only mode */
  setCatalogReadonly(): void;
  /** Set catalog to edit mode */
  setCatalogEdit(): void;
}

/**
 * Toolbar plugin interface
 */
export interface IToolbarPlugin extends IPlugin {
  /** Set toolbar to read-only mode */
  setToolbarReadonlyModel(): void;
  /** Set toolbar to viewer mode */
  setToolbarViewerModel(): void;
  /** Set toolbar to edit mode */
  setToolbarEditModel(): void;
}

/**
 * Property bar plugin interface
 */
export interface IPropertyBarPlugin extends IPlugin {
  /** Set property bar to read-only mode */
  setPropertyBarReadonlyMode(): void;
  /** Set property bar to edit mode */
  setPropertyBarEditMode(): void;
}

/**
 * Layer edit plugin interface
 */
export interface ILayerEditPlugin extends IPlugin {
  /** Set layer edit to read-only mode */
  setLayerEditReadonlyMode(): void;
  /** Set layer edit to edit mode */
  setLayerEditEditMode(): void;
}

/**
 * User info plugin interface
 */
export interface IUserInfoPlugin extends IPlugin {
  /** Set user info to read-only mode */
  setUserInfoReadonlyMode(): void;
  /** Set user info to edit mode */
  setUserInfoEditMode(): void;
}

/**
 * Page header plugin interface
 */
export interface IPageHeaderPlugin extends IPlugin {
  /** Set page header to read-only mode */
  setPageHeaderReadonlyMode(options?: PageHeaderOptions): void;
  /** Set page header to edit mode */
  setPageHeaderEditMode(): void;
}

/**
 * Left menu plugin interface
 */
export interface ILeftMenuPlugin extends IPlugin {
  /** Set left menu to read-only mode */
  setLeftMenuReadonlyMode(): void;
  /** Set left menu to edit mode */
  setLeftMenuEditMode(): void;
}

/**
 * Camera position plugin interface
 */
export interface ICameraPositionPlugin extends IPlugin {
  /** Set camera position to read-only mode */
  setCameraPositionReadonlyMode(): void;
  /** Set camera position to edit mode */
  setCameraPositionEditMode(): void;
}

/**
 * Hotkey map interface
 */
export interface HotkeyMap {
  [key: string]: unknown;
}

/**
 * Hotkey manager interface
 */
export interface IHotkeyManager {
  /** Map of registered hotkeys */
  hotkeyMap: HotkeyMap;
  /** Enable a specific hotkey */
  enable(key: string): void;
  /** Disable a specific hotkey */
  disable(key: string): void;
}

/**
 * Selection manager interface
 */
export interface ISelectionManager {
  /** Unselect all selected items */
  unselectAll(): void;
}

/**
 * Signal interface for document events
 */
export interface ISignal {
  /** Register a listener for the signal */
  listen(callback: () => void, context: unknown): void;
}

/**
 * Application interface
 */
export interface IApp {
  /** Selection manager instance */
  selectionManager: ISelectionManager;
  /** Hotkey manager instance */
  hotkey: IHotkeyManager;
  /** Active environment identifier */
  activeEnvironmentId: string;
  /** Signal fired when document is opened */
  signalDocumentOpened: ISignal;
}

/**
 * Edit status manager interface
 */
export interface IEditStatusManager {
  /** Current edit status */
  status: EditModel;
}

/**
 * Plugin registry - maps plugin types to plugin instances
 */
export interface IPluginRegistry {
  [PluginType.PageHeader]: IPageHeaderPlugin;
  [PluginType.Toolbar]: IToolbarPlugin;
  [PluginType.Catalog]: ICatalogPlugin;
  [PluginType.LeftMenu]: ILeftMenuPlugin;
  [PluginType.PropertyBar]: IPropertyBarPlugin;
  [PluginType.LayerEdit]: ILayerEditPlugin;
  [PluginType.UserInfo]: IUserInfoPlugin;
  [PluginType.CameraPosition]: ICameraPositionPlugin;
  [key: string]: IPlugin;
}

/**
 * Handle function type - async function for mode switching
 */
export type HandleFunction = () => void | Promise<void>;

/**
 * Handle map - maps environment IDs to arrays of handle functions
 */
export type HandleMap = Record<string, HandleFunction[]>;

/**
 * Handler class - manages editor modes and coordinates plugin states
 * Responsible for switching between edit, readonly, and viewer modes
 */
export declare class Handler {
  /** Application instance */
  private _app: IApp | undefined;
  
  /** Map of registered handle functions by environment */
  private _handleMap: HandleMap | undefined;
  
  /** Edit status manager instance */
  private _editStatusManager: IEditStatusManager | undefined;
  
  /** Catalog plugin instance */
  private _catalogPlugin: ICatalogPlugin | undefined;
  
  /** Toolbar plugin instance */
  private _toolbarPlugin: IToolbarPlugin | undefined;
  
  /** Property bar plugin instance */
  private _propertyBarPlugin: IPropertyBarPlugin | undefined;
  
  /** Layer edit plugin instance */
  private _layerEditPlugin: ILayerEditPlugin | undefined;
  
  /** User info plugin instance */
  private _userInfoPlugin: IUserInfoPlugin | undefined;
  
  /** Page header plugin instance */
  private _pageheaderPlugin: IPageHeaderPlugin | undefined;
  
  /** Left menu plugin instance */
  private _leftMenuPlugin: ILeftMenuPlugin | undefined;
  
  /** Camera position plugin instance */
  private _cameraPositionPlugin: ICameraPositionPlugin | undefined;
  
  /** Handler configuration options */
  private _options: HandlerOptions;
  
  /** Callback invoked when design is loaded */
  private _onDesignLoadedHandle: (() => void) | undefined;

  /**
   * Initialize the handler with application and plugins
   * @param app - Application instance
   * @param editStatusManager - Edit status manager
   * @param pluginRegistry - Registry of all plugins
   */
  init(
    app: IApp,
    editStatusManager: IEditStatusManager,
    pluginRegistry: IPluginRegistry
  ): void;

  /**
   * Handle design loaded event
   * Invokes registered design loaded callback if exists
   */
  onDesignLoaded(): void;

  /**
   * Register a handle function for a specific environment
   * @param handleFn - Function to execute during mode switch
   * @param environmentId - Environment identifier (defaults to 'common')
   */
  registerHandle(handleFn: HandleFunction, environmentId?: string): void;

  /**
   * Switch editor mode and execute registered handles
   * @param model - Target edit model (optional, uses current status if not provided)
   */
  switchModel(model?: EditModel): void;

  /**
   * Switch to read-only mode
   * Disables all editing capabilities across plugins
   */
  readonlyModel(): void;

  /**
   * Switch to viewer mode
   * Similar to readonly but optimized for viewing
   */
  viewerModel(): void;

  /**
   * Switch to edit mode
   * Enables full editing capabilities across plugins
   */
  editModel(): void;

  /**
   * Enable or disable hotkeys
   * @param enabled - Whether to enable hotkeys
   */
  enableHotKey(enabled: boolean): void;

  /**
   * Set handler configuration options
   * @param options - Configuration options
   */
  setOptions(options: HandlerOptions): void;
}