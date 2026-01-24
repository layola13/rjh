/**
 * Handler for customized structure property bar operations.
 * Manages the property bar UI for N-customized structure elements.
 * 
 * @module NCustomizedStructurePropertyBarHandler
 * @originalId 506246
 */

/**
 * Property bar item configuration interface
 */
interface IPropertyBarItem {
  /** Unique identifier for the item */
  id: string;
  /** Parent item identifier for hierarchical structure */
  parentId: string;
  /** Display label for the item */
  label?: string;
  /** Type of property bar control */
  type: string;
  /** Display order in the property bar */
  order?: number;
  /** Child items for nested structures */
  items?: IPropertyBarItem[];
  /** Additional data configuration */
  data?: IPropertyBarItemData;
}

/**
 * Property bar item data configuration
 */
interface IPropertyBarItemData {
  /** Display label for the control */
  label: string;
  /** Default selected value */
  defaultValue: string;
  /** Available option values */
  values: string[];
  /** Whether the control is disabled */
  disabled: boolean;
  /** Change event handler */
  onChange: (event: IPropertyBarChangeEvent) => void;
}

/**
 * Property bar change event interface
 */
interface IPropertyBarChangeEvent {
  /** Event detail containing the new value */
  detail: {
    /** New selected value */
    value: string;
  };
}

/**
 * Structure element interface
 */
interface IStructureElement {
  /**
   * Checks if the element is a wall part
   * @returns True if element is a wall part, false otherwise
   */
  isWallPart(): boolean;
}

/**
 * Command interface for structure operations
 */
interface ICommand {
  /** Command type identifier */
  type: string;
  /** Command execution parameters */
  params: unknown[];
}

/**
 * Command manager interface for executing structure operations
 */
interface ICommandManager {
  /**
   * Creates a command instance
   * @param commandType - Type of command to create
   * @param params - Command parameters
   * @returns Created command instance
   */
  createCommand(commandType: string, params: unknown[]): ICommand;
  
  /**
   * Executes a command with options
   * @param command - Command to execute
   * @param options - Execution options
   */
  execute(command: ICommand, options: Record<string, unknown>): void;
  
  /**
   * Completes the current command execution
   */
  complete(): void;
}

/**
 * Catalog plugin interface
 */
interface ICatalogPlugin {
  /** Plugin type identifier */
  type: string;
}

/**
 * Plugin manager interface
 */
interface IPluginManager {
  /**
   * Retrieves a plugin by type
   * @param pluginType - Type of plugin to retrieve
   * @returns Plugin instance
   */
  getPlugin(pluginType: string): ICatalogPlugin;
}

/**
 * Application interface
 */
interface IApp {
  /** Plugin manager instance */
  pluginManager: IPluginManager;
  /** Command manager instance */
  cmdManager: ICommandManager;
}

/**
 * Handler class for managing N-customized structure property bar.
 * Provides UI controls for switching between wall part and independent modes.
 */
export class NCustomizedStructurePropertyBarHandler {
  /** Application instance */
  private readonly app: IApp;
  
  /** Catalog plugin instance */
  private readonly catalogPlugin: ICatalogPlugin;
  
  /** Command manager instance */
  private readonly cmdMgr: ICommandManager;

  /**
   * Initializes the property bar handler.
   * Sets up references to app, catalog plugin, and command manager.
   */
  constructor() {
    this.app = HSApp.App.getApp();
    this.catalogPlugin = this.app.pluginManager.getPlugin(HSFPConstants.PluginType.Catalog);
    this.cmdMgr = this.app.cmdManager;
  }

  /**
   * Generates property bar items for N-customized structure elements.
   * Creates controls for switching between wall part and independent structure modes.
   * 
   * @param element - The structure element to generate properties for
   * @returns Array of property bar item configurations
   */
  public getNCustomizedStructureItems(element: IStructureElement | null): IPropertyBarItem[] {
    if (!element) {
      return [];
    }

    const STRUCTURE_MODE_WALLPART = "plugin_structure_mode_wallpart";
    const STRUCTURE_MODE_INDEPENDENT = "plugin_structure_mode_independent";

    const items: IPropertyBarItem[] = [];
    
    items.push({
      id: "ncustomized-structure-mode",
      parentId: "content-base-property",
      label: ResourceManager.getString("common_attribute"),
      type: HSFPConstants.PropertyBarType.ThirdLevelNode,
      items: [
        {
          id: "ncustomized-structure-mode-choose",
          parentId: "ncustomized-structure-mode",
          type: HSFPConstants.PropertyBarType.RadioButton,
          order: 240,
          data: {
            label: ResourceManager.getString("plugin_structure_mode"),
            defaultValue: element.isWallPart() 
              ? STRUCTURE_MODE_WALLPART 
              : STRUCTURE_MODE_INDEPENDENT,
            values: [STRUCTURE_MODE_WALLPART, STRUCTURE_MODE_INDEPENDENT],
            disabled: false,
            onChange: (event: IPropertyBarChangeEvent): void => {
              const isWallPartMode = event.detail.value === STRUCTURE_MODE_WALLPART;
              const commandType = HSFPConstants.CommandType.ChangeStructureMode;
              const command = this.cmdMgr.createCommand(commandType, [element, commandType]);
              
              this.cmdMgr.execute(command, {
                wallpartmode: isWallPartMode
              });
              this.cmdMgr.complete();
            }
          }
        }
      ],
      order: 1
    });

    return items;
  }
}