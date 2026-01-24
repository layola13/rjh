/**
 * Toolbar configuration module
 * Handles initialization of various 3D view toolbars with localized strings
 */

/**
 * Toolbar item configuration
 */
interface ToolbarItem {
  /** Display label for the toolbar item */
  label?: string;
  /** Tooltip text shown on hover */
  tooltip?: string;
  [key: string]: unknown;
}

/**
 * Toolbar configuration object
 */
interface ToolbarConfig {
  /** Array of toolbar items to be added */
  addItems: Array<[ToolbarItem, ...unknown[]]>;
  [key: string]: unknown;
}

/**
 * Item getter function type
 */
type ItemGetterFunction = (...args: unknown[]) => unknown;

/**
 * Toolbar registration callback function
 * @param toolbarId - Unique identifier for the toolbar
 * @param defaultToolbarId - Fallback toolbar identifier
 * @param config - Toolbar configuration object
 */
type ToolbarRegistrationCallback = (
  toolbarId: string,
  defaultToolbarId: string,
  config: ToolbarConfig
) => void;

/**
 * Application instance interface
 */
interface Application {
  [key: string]: unknown;
}

/**
 * Resource manager for string localization
 */
declare const ResourceManager: {
  /**
   * Retrieves a localized string by key
   * @param key - Resource string key
   * @returns Localized string value
   */
  getString(key: string): string;
};

/**
 * Toolbar ID constants
 */
declare const ToolbarIds: {
  /** Plane view toolbar identifier */
  readonly PLANE_TOOLBAR_ID: string;
  /** RCP (Right Control Panel) toolbar identifier */
  readonly RCP_TOOLBAR_ID: string;
  /** First-person 3D view toolbar identifier */
  readonly FIRST_PERSON_3D_TOOLBAR_ID: string;
  /** Orbit 3D view toolbar identifier */
  readonly ORBIT_VIEW_3D_TOOLBAR_ID: string;
  /** Orthographic 3D view toolbar identifier */
  readonly ORTH_VIEW_3D_TOOLBAR_ID: string;
  /** Default toolbar identifier */
  readonly DEFAULT_TOOLBAR_ID: string;
};

/**
 * Toolbar configuration modules
 */
declare const PlaneToolbarConfig: ToolbarConfig;
declare const RcpToolbarConfig: ToolbarConfig;
declare const FirstPerson3DToolbarConfig: ToolbarConfig;
declare const OrbitView3DToolbarConfig: ToolbarConfig;
declare const OrthView3DToolbarConfig: ToolbarConfig;

/**
 * Toolbar initializer class
 * Responsible for setting up and registering various 3D view toolbars
 */
export default class ToolbarInitializer {
  /** Application instance reference */
  private _app?: Application;
  
  /** Item getter function reference */
  private _itemGetter?: ItemGetterFunction;

  /**
   * Initializes all toolbar configurations with localized strings
   * @param app - Application instance
   * @param registerToolbar - Callback function to register each toolbar
   * @param itemGetter - Function to retrieve toolbar items
   */
  init_(
    app: Application,
    registerToolbar: ToolbarRegistrationCallback,
    itemGetter: ItemGetterFunction
  ): void;
}