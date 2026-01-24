/**
 * Door Stone Plugin Module
 * Handles door stone editing functionality in 3D models
 */

import { HSApp } from './hsapp';
import { HSCore } from './hscore';
import { HSCatalog } from './hscatalog';
import { HSFPConstants } from './constants';
import { HSPaveSDK } from './pave-sdk';

declare namespace DoorStonePlugin {
  /**
   * Edit door stone message enumeration
   */
  enum EditDoorStoneMessageEnum {
    /** Reset door stone to default state */
    resetDoorStone = 'resetDoorStone'
  }

  /**
   * Plugin initialization options
   */
  interface PluginInitOptions {
    name: string;
    description: string;
    dependencies: HSFPConstants.PluginType[];
  }

  /**
   * Plugin dependencies collection
   */
  interface PluginDependencies {
    [HSFPConstants.PluginType.ContextualTools]: HSApp.Plugin.IContextualToolsPlugin;
    [HSFPConstants.PluginType.PropertyBar]: HSApp.Plugin.IPropertyBarPlugin;
    [HSFPConstants.PluginType.Catalog]: HSApp.Plugin.ICatalogPlugin;
    [HSFPConstants.PluginType.MaterialImage]: HSApp.Plugin.IMaterialImagePlugin;
    [HSFPConstants.PluginType.Ngmmixpaint]: HSApp.Plugin.INgmMixPaintPlugin;
  }

  /**
   * Property bar item configuration for material settings
   */
  interface MaterialPropertyConfig {
    /** Blend mode radio button handler */
    blendRadioOnCheck: (value: string) => void;
    /** Wallpaper selection handler */
    wallpaperOnClick: () => void;
    /** Color mode toggle handler */
    colorModeOnClick: () => void;
    /** Color value change handler */
    colorOnValueChange: (color: string) => void;
    /** Replace pattern material configuration */
    replacePatternMaterialConfig: {
      onClick: () => void;
    };
    /** Material expand parameters */
    expandParam: {
      jid: string | null;
      materialId: string;
      categoryId: string | null;
    };
  }

  /**
   * Property bar item configuration for seam settings
   */
  interface SeamPropertyConfig {
    /** Replace seam material handler */
    onReplaceClick: () => void;
  }

  /**
   * Property bar parameter configuration
   */
  interface PropertyBarParams {
    material: MaterialPropertyConfig;
    seam: SeamPropertyConfig;
    pavingOption: Record<string, unknown>;
  }

  /**
   * Face material property bar configuration
   */
  interface FaceMaterialPropertyConfig {
    entity: HSCore.Model.Face;
    material: HSCore.Material.Material;
    propertyParam: PropertyBarParams;
    secondNodeId: string;
  }

  /**
   * Property bar item base interface
   */
  interface PropertyBarItemBase {
    id: string;
    parentId: string;
    order: number;
  }

  /**
   * Second level node property bar item
   */
  interface SecondLevelNodeItem extends PropertyBarItemBase {
    type: HSFPConstants.PropertyBarType.SecondLevelNode;
    label: string;
    status?: boolean;
    onStatusChange?: (status: boolean) => void;
    items: PropertyBarItem[];
    resetItem?: {
      text: string;
      onResetClick: () => void;
    };
  }

  /**
   * Button property bar item
   */
  interface ButtonItem extends PropertyBarItemBase {
    type: HSFPConstants.PropertyBarType.Button;
    data: {
      className: string;
      level: string;
      type: string;
      text: string;
      onClick: (entity: HSCore.Model.Entity) => void;
    };
  }

  /**
   * Check block property bar item
   */
  interface CheckBlockItem extends PropertyBarItemBase {
    type: HSFPConstants.PropertyBarType.CheckBlock;
    data: {
      label: string;
      blocks: Array<{
        icon: string;
        checked: boolean;
      }>;
      onChange: () => void;
    };
  }

  /** Union type for all property bar items */
  type PropertyBarItem = SecondLevelNodeItem | ButtonItem | CheckBlockItem;

  /**
   * Main door stone plugin class
   * Extends the base plugin interface to provide door stone editing capabilities
   */
  class DoorStonePlugin extends HSApp.Plugin.IPlugin {
    /** Handler for plugin operations */
    handler?: DoorStoneHandler;

    /**
     * Called when plugin is activated
     * @param context - Plugin activation context
     * @param dependencies - Required plugin dependencies
     */
    onActive(context: HSApp.PluginContext, dependencies: PluginDependencies): void;

    /**
     * Called when plugin is deactivated
     */
    onDeactive(): void;

    /**
     * Generate aligned rectangular pattern for door stone
     * @param material - Material to generate pattern for
     * @param entity - Entity to apply pattern to
     * @returns Promise resolving to generated material
     */
    generateAlignRectPattern(
      material: HSCore.Material.Material,
      entity: HSCore.Model.Entity
    ): Promise<HSCore.Material.Material>;
  }

  /**
   * Door stone handler interface
   * Manages the core functionality of door stone operations
   */
  interface DoorStoneHandler {
    /** Application instance */
    app: HSApp.Application;
    /** Selection manager */
    selectionMgr: HSApp.SelectionManager;
    /** Command manager */
    cmdMgr: HSApp.CommandManager;
    /** Catalog manager */
    catalogMgr: HSCatalog.Manager;
    /** Plugin dependencies */
    dependencies: PluginDependencies;
    /** Catalog plugin reference */
    catalogPlugin: HSApp.Plugin.ICatalogPlugin;
    /** Contextual tools plugin reference */
    contextualToolsPlugin: HSApp.Plugin.IContextualToolsPlugin;
    /** Property bar plugin reference */
    propertyBarPlugin: HSApp.Plugin.IPropertyBarPlugin;
    /** Material image plugin reference */
    materialImagePlugin: HSApp.Plugin.IMaterialImagePlugin;
    /** Default material for door stones */
    defaultMaterial?: HSCatalog.Item;
    /** Gate stone catalog data */
    gateStoneData?: HSCatalog.Item;
    /** Currently selected entity */
    entity?: HSCore.Model.Entity;
    /** Signal hook for event handling */
    _signalHook: HSCore.Util.SignalHook;
    /** Signal hook for opening events */
    _openingSignalHook: HSCore.Util.SignalHook;
    /** Paint command message enumeration */
    PaintCmdMessageEnum: typeof HSApp.PaintPluginHelper.Enum.PaintCmdMessageEnum;
    /** Mix paint command message enumeration */
    MixPaintCmdMessageEnum: typeof HSApp.PaintPluginHelper.Enum.MixPaintCmdMessageEnum;
    /** Template tiles utility */
    TemplateTilesUtil: typeof HSApp.PaintPluginHelper.Util.TemplateTilesUtil;
    /** Paint service utility */
    PaintService: typeof HSApp.PaintPluginHelper.Util.PaintService;
    /** Mix paint utility */
    MixPaintUtil: typeof HSApp.PaintPluginHelper.Util.MixPaintUtil;

    /**
     * Initialize the handler
     * @param context - Plugin context
     * @param dependencies - Plugin dependencies
     * @param plugin - Plugin instance
     */
    init(
      context: HSApp.PluginContext,
      dependencies: PluginDependencies,
      plugin: DoorStonePlugin
    ): void;

    /**
     * Uninitialize and cleanup the handler
     */
    uninit(): void;

    /**
     * Fetch gate stone data from catalog
     */
    getGateStoneData(): void;

    /**
     * Get property bar items for selected entity
     * @param entity - Selected entity
     * @returns Array of property bar items
     */
    getPropertyBarV2Items(entity: HSCore.Model.Entity): PropertyBarItem[];

    /**
     * Handle property bar population event
     * @param event - Property bar event data
     */
    _onPopulatePropertyBarV2(event: { data: { xInsertCollection: (index: number, items: PropertyBarItem[]) => void } }): void;

    /**
     * Handle material assignment
     */
    onAssignMaterial(): void;

    /**
     * Toggle door stone alignment side
     */
    switchDoorStoneAlignSide(): void;

    /**
     * Prepare to show independent panel
     */
    _willShowIndependentPanel(): void;

    /**
     * Generate aligned rectangular pattern
     * @param material - Material data
     * @param entity - Target entity
     * @returns Promise resolving to generated material
     */
    generateAlignRectPattern(
      material: HSCore.Material.MaterialData,
      entity: HSCore.Model.Entity
    ): Promise<HSCore.Material.Material>;

    /**
     * Handle door stone status change
     * @param enabled - Whether door stone is enabled
     * @param entity - Target entity
     */
    onEditDoorStoneStatus(enabled: boolean, entity: HSCore.Model.Entity): void;

    /**
     * Apply door stone material to all doors in scene
     * @param entity - Source entity with door stone
     */
    applyDoorStoneToAllDoors(entity: HSCore.Model.Entity): void;

    /**
     * Handle edit material command
     */
    _onEditMaterialCmdHandler(): void;

    /**
     * Launch a command
     * @param cmdManager - Command manager
     * @param commandType - Type of command to launch
     * @param entity - Target entity
     * @param param1 - Optional parameter 1
     * @param param2 - Optional parameter 2
     * @param param3 - Optional parameter 3
     * @returns Created command instance
     */
    _launchCmd(
      cmdManager: HSApp.CommandManager,
      commandType: HSFPConstants.CommandType,
      entity: HSCore.Model.Entity,
      param1?: unknown,
      param2?: unknown,
      param3?: unknown
    ): HSApp.Command;

    /**
     * Handle catalog item click event
     * @param event - Click event data
     */
    onCatalogItemClick(event: { data: HSCatalog.Item }): void;

    /**
     * Handle selection change event
     */
    onSelectionChanged(): void;
  }
}

export = DoorStonePlugin;