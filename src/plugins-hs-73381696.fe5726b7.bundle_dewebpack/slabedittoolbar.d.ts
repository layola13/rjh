/**
 * Slab edit toolbar module
 * Provides toolbar functionality for editing slabs and outdoor spaces in the application
 */

/**
 * Plugin manager interface for accessing various application plugins
 */
interface PluginManager {
  getPlugin(pluginType: string): any;
}

/**
 * Command manager interface for creating and executing commands
 */
interface CommandManager {
  createCommand(commandType: string, args: any[]): Command;
  execute(command: Command): void;
}

/**
 * Command interface representing an executable action
 */
interface Command {
  // Command implementation details
}

/**
 * Application interface representing the main application instance
 */
interface Application {
  cmdManager: CommandManager;
  pluginManager: PluginManager;
  signalContextualtoolRefresh: Signal<{ forceUpdate: boolean }>;
}

/**
 * Signal interface for event dispatching
 */
interface Signal<T = any> {
  dispatch(data: T): void;
}

/**
 * Toolbar plugin interface for managing toolbars
 */
interface ToolbarPlugin {
  readonly ToolbarIdEnum: {
    DEFAULT_TOOLBAR_ID: string;
  };
  readonly signalToolbarChanged: Signal<ToolbarChangedData>;
  
  getActiveToolbarId(): string;
  activateToolbar(toolbarId: string): void;
  addLinkedToolbar(toolbarId: string, parentId: string, config: ToolbarConfig): void;
  showSecondToolbar(show: boolean): void;
  getItem(name: string, toolbarId: string): ToolbarItem | undefined;
}

/**
 * Page header plugin interface for managing page header state
 */
interface PageHeaderPlugin {
  beforeEnterEnv(config: PageHeaderConfig, position: string): void;
  afterOuterEnv(): void;
}

/**
 * Contextual tools plugin interface for managing contextual UI elements
 */
interface ContextualToolsPlugin {
  readonly signalPopulateStatusBar: Signal<PopulateStatusBarData>;
}

/**
 * Status bar plugin interface for managing status bar content
 */
interface StatusBarPlugin {
  update(leftItems: StatusBarItem[], menuItems: StatusBarItem[], rightItems: StatusBarItem[]): void;
}

/**
 * Data structure for toolbar changed event
 */
interface ToolbarChangedData {
  newId: string;
}

/**
 * Data structure for populate status bar event
 */
interface PopulateStatusBarData {
  leftItems: StatusBarItem[];
  menuItems: StatusBarItem[];
  rightItems: StatusBarItem[];
}

/**
 * Status bar item configuration
 */
interface StatusBarItem {
  // Status bar item properties
}

/**
 * Toolbar item interface representing a toolbar button or control
 */
interface ToolbarItem {
  setPressed(pressed: boolean): void;
}

/**
 * Page header configuration for complete button
 */
interface PageHeaderConfig {
  getRenderItem(): React.ReactElement;
}

/**
 * Hotkey configuration for toolbar items
 */
interface HotkeyConfig {
  win?: string[];
  mac?: string[];
}

/**
 * Toolbar button configuration
 */
interface ToolbarButtonConfig {
  type: 'button';
  label: string;
  name: string;
  icon?: string;
  tooltip?: string;
  hotkey?: string | HotkeyConfig;
  lock?: boolean;
  order: number;
  logGroup?: string;
  lineType?: 'second';
  command?: string;
  onclick: () => void;
}

/**
 * Toolbar divider configuration
 */
interface ToolbarDividerConfig {
  type: 'divider';
  name: string;
  lineType?: 'second';
  order: number;
}

/**
 * Toolbar folder configuration
 */
interface ToolbarFolderConfig {
  type: 'folder';
  label: string;
  name: string;
  icon: string;
  order: number;
}

/**
 * Toolbar configuration structure
 */
interface ToolbarConfig {
  addItems: Array<[ToolbarButtonConfig | ToolbarDividerConfig | ToolbarFolderConfig, string]>;
  includeItems: string[];
}

/**
 * Sketch builder interface for building and managing sketches
 */
interface SketchBuilder {
  // Sketch builder methods
}

/**
 * Entity interface representing a 3D entity in the scene
 */
interface Entity {
  // Entity properties
}

/**
 * Sketch view interface for viewing and manipulating sketches
 */
interface SketchView {
  entity: Entity;
}

/**
 * Handler interface for slab edit operations
 */
interface SlabEditHandler {
  onApplySave(): void;
  onResetChanges(): void;
  onAddGuideLine(): void;
  onClearGuideLines(): void;
  onMeasureTool(): void;
  onAddLine(): void;
  onAddRect(): void;
  onAddPolygon(): void;
  onAddCircle(): void;
  onFillet(): void;
  getSketchView(): SketchView;
}

/**
 * Plugin map interface for accessing plugins by type
 */
interface PluginMap {
  [HSFPConstants.PluginType.Toolbar]: ToolbarPlugin;
  [HSFPConstants.PluginType.PageHeader]: PageHeaderPlugin;
  [key: string]: any;
}

/**
 * Creation state tracking for different toolbar types
 */
interface CreationState {
  outdoorspace: boolean;
  other: boolean;
}

/**
 * Slab Edit Toolbar class
 * Manages the toolbar UI and interactions for editing slabs and outdoor spaces
 */
export declare class SlabEditToolbar {
  /** Toolbar plugin instance for managing toolbar items */
  private toolbarPlugin: ToolbarPlugin;
  
  /** Page header plugin instance for managing page header state */
  private pageheaderPlugin: PageHeaderPlugin;
  
  /** Contextual tools plugin instance for managing contextual UI */
  private contextualToolsPlugin?: ContextualToolsPlugin;
  
  /** Tracks whether toolbar has been created for different types */
  private created: CreationState;
  
  /** Handler for slab edit operations */
  private handler?: SlabEditHandler;
  
  /** Main application instance */
  private app: Application;
  
  /** Command manager for executing commands */
  private cmdMgr: CommandManager;
  
  /** Current toolbar identifier */
  private toolbarId?: string;
  
  /** Left status bar items */
  private leftItems?: StatusBarItem[];
  
  /** Menu status bar items */
  private menuItems?: StatusBarItem[];
  
  /** Right status bar items */
  private rightItems?: StatusBarItem[];
  
  /** Signal hook for managing event listeners */
  private signalHook?: any;
  
  /** Sketch builder instance for creating sketches */
  private sketchBuilder?: SketchBuilder;

  /**
   * Creates a new SlabEditToolbar instance
   * @param plugins - Map of plugins including toolbar and page header plugins
   */
  constructor(plugins: PluginMap);

  /**
   * Activates the slab edit toolbar
   * @param handler - Handler for slab edit operations
   * @param isOutdoorSpace - Whether this is for outdoor space editing
   * @param sketchBuilder - Sketch builder instance
   * @returns The previously active toolbar ID
   */
  activate(handler: SlabEditHandler, isOutdoorSpace: boolean, sketchBuilder: SketchBuilder): string;

  /**
   * Handles the populate status bar event
   * Caches status bar items and clears left items
   * @param event - Event containing status bar data
   */
  private _onPopulateStatusBar(event: { data: PopulateStatusBarData }): void;

  /**
   * Handles toolbar changed event
   * Shows second toolbar when this toolbar becomes active
   * @param event - Event containing toolbar change data
   */
  private _onToolbarChanged(event: { data: ToolbarChangedData }): void;

  /**
   * Restores the previous toolbar state and cleans up
   * @param previousToolbarId - The toolbar ID to restore
   */
  restore(previousToolbarId?: string): void;

  /**
   * Creates the page header complete button configuration
   * @returns Page header configuration with complete button
   */
  private _getPageHeaderCompleteBtn(): PageHeaderConfig;

  /**
   * Initializes the toolbar with appropriate items based on edit type
   * @param isOutdoorSpace - Whether this is for outdoor space editing
   */
  private init(isOutdoorSpace: boolean): void;
}