/**
 * Content Material Replace Plugin
 * Handles material replacement functionality for 3D content entities in the floor planner
 */

import { HSCore } from '635589';
import { HSApp } from '518193';
import { CmdContentMaterialMoveReplace } from '63497';
import { CmdContentMaterialReplace } from '313414';
import { CmdContentMaterialResetAll } from '68526';
import { CmdContentMaterialChangeUV } from '485639';
import { CmdContentsMaterialReplaceAll } from '412438';
import { ContentMaterialReplaceRequest } from '678926';
import { ContentMaterialResetAllRequest } from '229728';
import { ContentMaterialChangeUVRequest } from '31839';
import { ContentsMaterialReplaceAllRequest } from '3154';

/**
 * Plugin initialization configuration
 */
export interface IPluginInitConfig {
  app: HSApp.App;
  context: unknown;
  dependencies: Record<string, unknown>;
}

/**
 * Message dialog configuration
 */
export interface IMessageDialogConfig {
  title: string;
  content?: string;
  enableCheckbox: boolean;
  checkbox?: {
    checkboxText: string;
    callback: (checked: boolean) => void;
  };
  okButtonContent: string;
  cancelButtonContent: string;
  hideCancelButton: boolean;
  mask: boolean;
  onOk?: () => void;
  onCancel?: () => void;
}

/**
 * Material metadata with transformation properties
 */
export interface IMaterialMetadata {
  seekId: string;
  colorMode?: string;
  blendColor?: string;
  rotation?: number;
  percentOffsetX?: number;
  percentOffsetY?: number;
  scalingTileSize_x?: number;
  scalingTileSize_y?: number;
  clone(): IMaterialMetadata;
}

/**
 * Property bar item configuration
 */
export interface IPropertyBarItem {
  id?: string;
  type: string;
  order: number;
  data: {
    className?: string;
    tooltip?: string;
    text?: string;
    onclick?: () => void;
  };
}

/**
 * Right-click context menu item configuration
 */
export interface IContextMenuItem {
  label: string;
  id: string;
  disable: boolean;
  src: string;
  order: number;
  onClick: () => void;
}

/**
 * Content Material Replace Plugin
 * Manages material replacement operations for 3D models and entities
 */
export default class ContentMaterialReplacePlugin {
  /** Application instance */
  app: HSApp.App;

  /** Plugin context */
  context: unknown;

  /** Signal hook utility for event management */
  signalHook: HSCore.Util.SignalHook;

  /** Catalog plugin dependency */
  private _catalogPlugin: unknown;

  /** Contextual tools plugin dependency */
  private _contextualToolsPlugin: unknown;

  /** Left menu plugin dependency */
  private _menuPlugin: unknown;

  /** Single room plugin dependency */
  private _singleRoomPlugin: unknown;

  /** Currently selected entity for material replacement */
  private _selectedEntity?: HSCore.Model.Content;

  /** Environment ID before entering material replace mode */
  private _fromEnvironmentId?: string;

  /** Current material map (component name -> material metadata) */
  private _currMatMap: Map<string, IMaterialMetadata>;

  /** Original material map for comparison */
  matMap: Map<string, IMaterialMetadata>;

  /** Whether single room mode is active */
  private _isSingleRoomMode: boolean;

  /** Target room in single room mode */
  private _singleRoom?: unknown;

  /**
   * Initialize the plugin with application context and dependencies
   * @param config - Plugin initialization configuration
   */
  init(config: IPluginInitConfig): void;

  /**
   * Clean up plugin resources and event listeners
   */
  dispose(): void;

  /**
   * Set the currently selected entity for material operations
   * @param entity - The entity to select
   */
  setSelectedEntity(entity: HSCore.Model.Content): void;

  /**
   * Get the currently selected entity
   * @returns The selected entity or undefined
   */
  getSelectedEntity(): HSCore.Model.Content | undefined;

  /**
   * Register command handlers with the command manager
   */
  registerCommands(): void;

  /**
   * Register transaction handlers with the transaction manager
   */
  registerTransactions(): void;

  /**
   * Register UI environments and plugin dependencies
   * @param dependencies - Plugin dependency map
   */
  registerEnvironments(dependencies: Record<string, unknown>): void;

  /**
   * Enter material replacement mode
   */
  startStyler(): void;

  /**
   * Exit material replacement mode and restore previous state
   */
  exitStyler(): void;

  /**
   * Check if entity has a pocket (recess/niche) component
   * @returns True if entity has pocket component
   */
  hasPocket(): boolean;

  /**
   * Get the component name for pocket material
   * @returns Component name or undefined
   */
  getPocketMaterialComponent(): string | undefined;

  /**
   * Check if a specific material has been modified
   * @param componentName - Component name to check
   * @param material - Material to compare
   * @returns True if material has changed
   */
  isMaterialChange(componentName: string, material: IMaterialMetadata): boolean;

  /**
   * Get message dialog configuration for material application confirmation
   * @returns Dialog configuration or undefined
   */
  getMessageData(): IMessageDialogConfig | undefined;

  /**
   * Apply current materials to multiple models
   * @param entities - Array of entities to apply materials to
   */
  private _applyMaterialsToModels(entities: HSCore.Model.Content[]): void;

  /**
   * Apply pocket material to multiple opening entities
   * @param entities - Array of door/window entities
   */
  private _applyPocketToModels(entities: HSCore.Model.Content[]): void;

  /**
   * Check if the selected entity's material has changed
   * @returns True if any material property has changed
   */
  private _isEntityMaterialChange(): boolean;

  /**
   * Check if entity is a cabinet or wardrobe component
   * @param entity - Entity to check
   * @returns True if entity is cabinet or wardrobe
   */
  private _isCabinetorWardrobe(entity: HSCore.Model.Content): boolean;

  /**
   * Determine if entity supports material replacement
   * @param entity - Entity to check
   * @returns True if entity can have materials replaced
   */
  private _canReplace(entity?: HSCore.Model.Content): boolean;

  /**
   * Populate right-click context menu with material replace option
   * @param event - Menu population event
   */
  onPopulateRightmenu(event: { data: unknown }): void;

  /**
   * Initialize right-click context menu items
   * @param entity - Selected entity
   * @returns Array of menu items
   */
  initRightmenuItems(entity: HSCore.Model.Content): IContextMenuItem[];

  /**
   * Populate property bar with material replace controls
   * @param event - Property bar population event
   */
  onPopulateRightPropertyBar(event: { data: unknown }): void;

  /**
   * Initialize property bar UI items
   * @param entity - Selected entity
   * @returns Array of property bar items
   */
  initPropertyBarItems(entity: HSCore.Model.Content): IPropertyBarItem[];

  /**
   * Get material map for an entity (component name -> material)
   * @param entity - Entity to extract materials from
   * @returns Map of component names to material metadata
   */
  getMaterialMap(entity: HSCore.Model.Content): Map<string, IMaterialMetadata>;

  /**
   * Register A/B test configuration for old material replace feature
   */
  private _getOldMaterialReplaceABTest(): void;
}