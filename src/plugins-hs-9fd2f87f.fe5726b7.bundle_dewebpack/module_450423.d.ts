/**
 * Export 2D Floorplan Plugin
 * Provides functionality to export 2D floorplan as image with customizable settings
 */

/**
 * Image format type for export
 */
type ImageFormat = 'image/png' | 'image/jpeg';

/**
 * Metadata logo configuration
 */
interface LogoConfig {
  /** Logo image source URL */
  src: string;
  /** Logo width in pixels */
  width: number;
  /** Logo height in pixels */
  height: number;
  /** Logo margin in pixels */
  margin: number;
  /** Loaded image element (internal use) */
  image?: HTMLImageElement;
}

/**
 * Metadata title configuration
 */
interface TitleConfig {
  /** Title margin in pixels */
  margin: number;
  /** Title text content */
  text: string;
}

/**
 * Metadata unit configuration
 */
interface UnitConfig {
  /** Right alignment offset in pixels */
  right: number;
  /** Unit margin in pixels */
  margin: number;
  /** Unit text content */
  text: string;
}

/**
 * Metadata section configuration for export image
 */
interface MetadataConfig {
  /** Left position in pixels */
  left: number;
  /** Top position in pixels */
  top: number;
  /** Metadata section width in pixels */
  width?: number;
  /** Metadata section height in pixels */
  height: number;
  /** Background color (hex format) */
  backgroundColor: string;
  /** Font specification (CSS format) */
  font: string;
  /** Font color (hex format) */
  fontColor: string;
  /** Line width in pixels */
  lineWidth: number;
  /** Line color (hex format) */
  lineColor: string;
  /** Logo configuration */
  logo: LogoConfig;
  /** Title configuration */
  title: TitleConfig;
  /** Unit configuration */
  unit: UnitConfig;
}

/**
 * Compass gizmo configuration
 */
interface CompassConfig {
  // Compass-specific properties can be added here
}

/**
 * Entrance indicator gizmo configuration
 */
interface EntranceIndicatorConfig {
  // Entrance indicator-specific properties can be added here
}

/**
 * Gizmo configuration for visual indicators
 */
interface GizmoConfig {
  /** Compass configuration */
  compass: CompassConfig;
  /** Entrance indicator configuration */
  entranceIndictor: EntranceIndicatorConfig;
}

/**
 * Export 2D configuration parameters
 */
interface Export2DConfig {
  /** Output image format */
  format: ImageFormat;
  /** Output image width in pixels */
  width: number;
  /** Output image height in pixels */
  height: number;
  /** Background color (hex format) */
  backgroundColor: string;
  /** Whether camera is visible in export */
  cameraVisible: boolean;
  /** Whether grid is visible in export */
  gridVisible: boolean;
  /** Whether background is visible in export */
  backgroundVisible: boolean;
  /** Whether wall dimensions are visible in export */
  dimensionVisible: boolean;
  /** Whether room area labels are visible in export */
  roomAreaVisible: boolean;
  /** Whether room type labels are visible in export */
  roomTypeVisible: boolean;
  /** Whether furniture is visible in export */
  furnitureVisible: boolean;
  /** Whether customized furniture is visible in export */
  customizedFurnitureVisible: boolean;
  /** Whether customized accessories are visible in export */
  customizedAccessoryVisible: boolean;
  /** Metadata section configuration */
  metadata: MetadataConfig;
  /** Gizmo configuration */
  gizmo: GizmoConfig;
}

/**
 * Plugin dependencies
 */
interface PluginDependencies {
  /** Toolbar plugin reference */
  [HSFPConstants.PluginType.Toolbar]: unknown;
  /** Contextual tools plugin reference */
  [HSFPConstants.PluginType.ContextualTools]: unknown;
  /** Resize widget plugin reference */
  [HSFPConstants.PluginType.ResizeWidget]: unknown;
  /** Catalog plugin reference */
  [HSFPConstants.PluginType.Catalog]: unknown;
  /** Contextual tools plugin (alternate key) */
  'hsw.plugin.contextualtools.Plugin': unknown;
}

/**
 * Export parameters for image generation
 */
interface ExportParams {
  /** Image format */
  format: ImageFormat;
  /** Image width in pixels */
  width: number;
  /** Image height in pixels */
  height: number;
  /** Whether to center the view */
  center: boolean;
}

/**
 * Export callback data
 */
interface ExportCallbackData {
  /** Export parameters */
  params: ExportParams;
  /** Callback function after export completes */
  callback: (imageData: string) => void;
}

/**
 * Command status bar event data
 */
interface CommandStatusBarData {
  /** Current command */
  cmd: unknown;
  /** Menu items collection */
  menuItems: unknown[];
  /** Right-aligned items collection */
  rightItems: unknown[];
}

/**
 * Property bar control types
 */
declare enum PropertyBarControlTypeEnum {
  checkbox = 'checkbox',
  button = 'button'
}

/**
 * Checkbox status enumeration
 */
declare enum CCheckBoxStatusEnum {
  checked = 'checked',
  unchecked = 'unchecked'
}

/**
 * Checkbox control data
 */
interface CheckboxControlData {
  /** Tooltip text */
  tooltip: string;
  /** Display text */
  text: string;
  /** Checkbox status */
  status: CCheckBoxStatusEnum;
  /** Whether control is disabled */
  disabled: boolean;
  /** Click event handler */
  onclick: (event: { target: { checked: boolean } }) => void;
}

/**
 * Button control data
 */
interface ButtonControlData {
  /** Button text */
  text: string;
  /** Tooltip text */
  tooltip: string;
  /** Whether button is disabled */
  disabled: boolean;
  /** Whether button is primary style */
  primary: boolean;
  /** Click event handler */
  onclick: (event: Event) => void;
}

/**
 * Property bar control item
 */
interface PropertyBarControlItem {
  /** Control unique identifier */
  id: string;
  /** Control type */
  type: PropertyBarControlTypeEnum;
  /** Control data */
  data: CheckboxControlData | ButtonControlData;
}

/**
 * Floorplan field changed event
 */
interface FloorplanFieldChangedEvent {
  /** Event target */
  target: {
    /** Changed field name */
    fieldName: string;
  };
}

/**
 * Export 2D Floorplan Plugin
 * Main plugin class for exporting 2D floorplan views
 */
export declare class Export2DPlugin extends HSApp.Plugin.IPlugin {
  /** Plugin configuration */
  config: Export2DConfig;

  /**
   * Constructor
   * Initializes plugin with default configuration
   */
  constructor();

  /**
   * Called when plugin is activated
   * @param context - Plugin context
   * @param dependencies - Plugin dependencies
   */
  onActive(context: { app: HSApp.App }, dependencies: PluginDependencies): void;

  /**
   * Called when plugin is deactivated
   */
  onDeactive(): void;

  /**
   * Get versioned resource URL
   * @param resourcePath - Resource path relative to plugin directory
   * @returns Versioned URL
   */
  resourceUrl(resourcePath: string): string;
}

/**
 * Export 2D Handler
 * Handles export logic and processing
 */
export declare namespace Export2DHandler {
  /** Application instance */
  let app: HSApp.App | null;
  
  /** Export parameters */
  let params: Export2DConfig | undefined;

  /**
   * Initialize handler
   * @param application - Application instance
   * @param plugin - Plugin instance
   * @param dependencies - Plugin dependencies
   */
  function init(
    application: HSApp.App,
    plugin: Export2DPlugin,
    dependencies: PluginDependencies
  ): void;

  /**
   * Update export parameters
   */
  function updateParams(): void;

  /**
   * Get title text from design metadata
   * @returns Design name or empty string
   */
  function getTitleText(): string;

  /**
   * Get unit text for display
   * @returns Formatted unit text
   */
  function getUnitText(): string;

  /**
   * Handle cancel button click
   */
  function onCancelBtnClk(): void;

  /**
   * Handle download button click
   */
  function onDownloadBtnClk(): void;

  /**
   * Handle parameters changed event
   * @param changes - Parameter changes
   */
  function onParametersChanged(changes: Partial<Export2DConfig>): void;

  /**
   * Start export process
   */
  function start(): void;

  /**
   * End export process
   */
  function end(): void;

  /**
   * Check if command is export 2D command
   * @param command - Command to check
   * @returns True if export 2D command
   */
  function isExport2DCmd(command: unknown): boolean;

  /**
   * Execute export with given parameters
   * @param params - Export parameters
   * @param callback - Callback function with result
   */
  function doExport(
    params: Export2DConfig,
    callback: (dataUrl: string) => void
  ): void;
}

/**
 * Export 2D UI Controller
 * Manages UI interactions and rendering
 */
export declare namespace Export2DUI {
  /** Root DOM selector */
  const rootId: '#export2d';
  
  /** Toolbar plugin reference */
  let toolbarPlugin: unknown;
  
  /** Catalog plugin reference */
  let catalogPlugin: unknown;
  
  /** Contextual tool plugin reference */
  let contextualToolPlugin: unknown;
  
  /** Resize widget plugin reference */
  let resizeWidgetPlugin: unknown;

  /**
   * Initialize UI
   * @param dependencies - Plugin dependencies
   */
  function init(dependencies: PluginDependencies): void;

  /**
   * Handle keydown events
   * @param event - Keyboard event
   */
  function keydownHandler(event: KeyboardEvent): void;

  /**
   * Switch to 2D view mode
   */
  function onSwitchView(): void;

  /**
   * Reset to previous view mode
   */
  function onResetView(): void;

  /**
   * Show export UI
   */
  function start(): void;

  /**
   * Hide export UI
   */
  function end(): void;

  /**
   * Initialize toolbar menu item
   */
  function initToolbarMenuItem(): void;

  /**
   * Initialize property bar
   */
  function initPropertyBar(): void;

  /**
   * Handle command status bar population
   * @param event - Event data
   */
  function onPopulateStatusBarByCmd(event: { data: CommandStatusBarData }): void;

  /**
   * Handle floorplan settings changed event
   * @param event - Field changed event
   */
  function onFloorplanSettingsChanged(event: FloorplanFieldChangedEvent): void;
}

/**
 * Plugin module identifier
 */
export const PLUGIN_ID = 'hsw.plugin.export2d';