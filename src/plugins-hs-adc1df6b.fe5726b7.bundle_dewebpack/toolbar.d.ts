/**
 * Toolbar module for outdoor drawing environment
 * Manages toolbar initialization, activation, and interaction handlers
 */

import { HSCore } from './HSCore';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';
import { Icons } from './Icons';
import { SmartText } from './SmartText';

/**
 * Plugin manager interface
 */
interface IPluginManager {
  getPlugin(pluginType: string): any;
}

/**
 * Command manager interface
 */
interface ICommandManager {
  cancel(): void;
  createCommand(commandType: string, args: any[]): any;
  execute(command: any): void;
}

/**
 * Application interface
 */
interface IApp {
  cmdManager: ICommandManager;
  pluginManager: IPluginManager;
  signalContextualtoolRefresh: {
    dispatch(data: { forceUpdate: boolean }): void;
  };
  activeEnvironmentId?: string;
}

/**
 * Toolbar plugin interface
 */
interface IToolbarPlugin {
  getActiveToolbarId(): string | undefined;
  activateToolbar(toolbarId: string): void;
  showSecondToolbar(show: boolean): void;
  addLinkedToolbar(toolbarId: string, parentToolbarId: string, config: IToolbarConfig): void;
  signalToolbarChanged: any;
  ToolbarIdEnum: {
    DEFAULT_TOOLBAR_ID: string;
  };
}

/**
 * Page header plugin interface
 */
interface IPageHeaderPlugin {
  beforeEnterEnv(renderItem: IPageHeaderRenderItem, position: string): void;
  afterOuterEnv(): void;
}

/**
 * Page header render item interface
 */
interface IPageHeaderRenderItem {
  getRenderItem(): React.ReactElement;
}

/**
 * Toolbar changed event data
 */
interface IToolbarChangedEventData {
  data: {
    newId: string;
    oldId?: string;
  };
}

/**
 * Toolbar item base interface
 */
interface IToolbarItemBase {
  type: 'button' | 'folder' | 'divider';
  name: string;
  order: number;
  lineType?: 'second';
}

/**
 * Toolbar button item interface
 */
interface IToolbarButtonItem extends IToolbarItemBase {
  type: 'button';
  label: string;
  icon?: string;
  tooltip?: string;
  hotkey?: string | { win: string[]; mac: string[] };
  command?: string;
  lock?: boolean;
  logGroup?: string;
  onclick?: () => void;
}

/**
 * Toolbar folder item interface
 */
interface IToolbarFolderItem extends IToolbarItemBase {
  type: 'folder';
  label: string;
  icon: string;
}

/**
 * Toolbar divider item interface
 */
interface IToolbarDividerItem extends IToolbarItemBase {
  type: 'divider';
}

/**
 * Toolbar item union type
 */
type ToolbarItem = IToolbarButtonItem | IToolbarFolderItem | IToolbarDividerItem;

/**
 * Toolbar configuration interface
 */
interface IToolbarConfig {
  addItems: Array<[ToolbarItem, string]>;
  includeItems: string[];
}

/**
 * Outdoor drawing environment handler interface
 */
interface IOutdoorDrawingHandler {
  onApplySave(): void;
  onAddGuideLine(): void;
  onClearGuideLines(): void;
  onMeasureTool(): void;
  onAddLine(): void;
  onAddRect(): void;
  onAddPolygon(): void;
  onAddCircle(): void;
  onFillet(): void;
}

/**
 * Outdoor drawing environment interface
 */
interface IOutdoorDrawingEnvironment {
  onRecoverAll(): void;
  getSketchBuilder(): any;
  getSketchView(): { entity: any };
}

/**
 * Toolbar class declaration
 * Manages the toolbar for outdoor drawing environment
 */
export declare class Toolbar {
  /**
   * Reference to the outdoor drawing environment
   * @private
   */
  private _environment: IOutdoorDrawingEnvironment;

  /**
   * Toolbar plugin instance
   */
  toolbarPlugin: IToolbarPlugin;

  /**
   * Page header plugin instance
   */
  pageheaderPlugin: IPageHeaderPlugin;

  /**
   * Handler for outdoor drawing operations
   */
  handler: IOutdoorDrawingHandler;

  /**
   * Application instance
   */
  app: IApp;

  /**
   * Command manager instance
   */
  cmdMgr: ICommandManager;

  /**
   * Unique identifier for this toolbar
   */
  toolbarId: string;

  /**
   * Left toolbar items
   */
  leftItems?: any[];

  /**
   * Menu toolbar items
   */
  menuItems?: any[];

  /**
   * Right toolbar items
   */
  rightItems?: any[];

  /**
   * Signal hook for event listening
   */
  signalHook?: HSCore.Util.SignalHook;

  /**
   * Constructor
   * @param environment - The outdoor drawing environment instance
   * @param handler - Handler for outdoor drawing operations
   * @param plugins - Plugin registry object
   */
  constructor(
    environment: IOutdoorDrawingEnvironment,
    handler: IOutdoorDrawingHandler,
    plugins: Record<string, any>
  );

  /**
   * Activate the toolbar
   * Shows the outdoor drawing toolbar and page header complete button
   * @returns The previously active toolbar ID
   */
  activate(): string | undefined;

  /**
   * Handle toolbar changed event
   * Shows second toolbar when this toolbar becomes active
   * @param event - Toolbar changed event data
   * @private
   */
  private _onToolbarChanged(event: IToolbarChangedEventData): void;

  /**
   * Restore previous toolbar state
   * @param previousToolbarId - The toolbar ID to restore
   */
  restore(previousToolbarId?: string): void;

  /**
   * Get page header complete button configuration
   * @returns Page header render item configuration
   * @private
   */
  private _getPageHeaderCompleteBtn(): IPageHeaderRenderItem;

  /**
   * Initialize toolbar configuration
   * Sets up all toolbar items, buttons, and event handlers
   * @private
   */
  private init(): void;
}