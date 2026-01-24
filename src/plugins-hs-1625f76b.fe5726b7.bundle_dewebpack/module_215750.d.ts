/**
 * Material replacement plugin for face/mesh material editing
 * Handles UV manipulation, scaling, rotation, and offset adjustments
 */

import { SignalHook } from 'HSCore.Util';
import { Material } from 'HSCore.Material';
import { ColorModeEnum } from 'HSCore.Material';

/**
 * Plugin dependencies injected during initialization
 */
export interface PluginDependencies {
  /** Plugin for contextual tools UI */
  contextualToolsPlugin: unknown;
  /** Plugin for catalog/material selection */
  catalogPlugin: CatalogPlugin;
  /** Plugin for right property bar UI */
  rightPropertybarPlugin: RightPropertybarPlugin;
}

/**
 * Catalog plugin interface for opening material selection panels
 */
export interface CatalogPlugin {
  openIndependentPanel(config: CatalogPanelConfig, panelId: string): void;
}

/**
 * Configuration for catalog panel
 */
export interface CatalogPanelConfig {
  query: {
    seekId?: string;
    categoryId: string;
  };
  mydata: {
    modelSearchFilter: {
      sceneType: string;
    };
    types: string;
  };
  optionFilters: Array<{
    categoryType: string;
    filters: Record<string, unknown>;
  }>;
  isKeepCategory: boolean;
  notFilter: boolean;
  uiControl: {
    type: string;
  };
  supportEnterpriseCategory: boolean;
  excludeType?: string;
  sceneType: string;
}

/**
 * Right property bar plugin with signal for population
 */
export interface RightPropertybarPlugin {
  signalPopulatePropertyBar: Signal<PropertyBarPopulateEvent>;
}

/**
 * Generic signal interface
 */
export interface Signal<T> {
  dispatch(data?: T): void;
}

/**
 * Event data for property bar population
 */
export interface PropertyBarPopulateEvent {
  data: PropertyBarItem[];
}

/**
 * Property bar item configuration
 */
export interface PropertyBarItem {
  id?: string;
  parentId?: string;
  type: string;
  label?: string;
  order?: number;
  items?: PropertyBarItem[];
  enableDetailsInfo?: boolean;
  className?: string;
  disableClose?: boolean;
  resetItem?: ResetItemConfig;
  data?: PropertyBarItemData;
  uniqueKey?: boolean;
}

/**
 * Reset button configuration
 */
export interface ResetItemConfig {
  text: string;
  onResetClick: () => void;
}

/**
 * Property bar item data (for inputs/sliders)
 */
export interface PropertyBarItemData {
  label?: string;
  name?: string;
  className?: string;
  options?: {
    twoWays?: boolean;
    rules?: {
      range?: { min: number; max: number };
      positiveOnly?: boolean;
    };
    unitType?: string;
    displayDigits?: number;
    readOnly?: boolean;
  };
  value?: number;
  unitType?: string;
  controller?: PropertyController;
  scaleStep?: number;
  sliderInputOptions?: PropertyBarItemData[];
  proportionalOption?: ProportionalOption;
}

/**
 * Proportional scaling option
 */
export interface ProportionalOption {
  checked: boolean;
  showTooltip: boolean;
  disabled: boolean;
  onChange: () => void;
}

/**
 * Controller for property value changes
 */
export interface PropertyController {
  onValueChangeStart?: () => void;
  onValueChanged?: (event: PropertyChangeEvent) => void;
  onValueChangeEnd?: () => void;
}

/**
 * Property change event
 */
export interface PropertyChangeEvent {
  detail: {
    value: number;
  };
}

/**
 * UV transformation parameters
 */
export interface UVTransformData {
  rotation?: number;
  percentOffsetX?: number;
  percentOffsetY?: number;
  scalingTileSize_x?: number;
  scalingTileSize_y?: number;
}

/**
 * Command manager interface
 */
export interface CommandManager {
  current?: Command;
  createCommand(type: string, args: unknown[]): Command;
  execute(cmd: Command): void;
  complete(cmd?: Command): void;
  cancel(): void;
  receive(message: CommandMessage): void;
}

/**
 * Command interface
 */
export interface Command {
  type: string;
  showGizmo?: boolean;
}

/**
 * Command message for UV changes
 */
export interface CommandMessage {
  msg: string;
  data: UVTransformData;
}

/**
 * Entity with material management
 */
export interface Entity {
  getMaterial(meshName: string): Material | undefined;
}

/**
 * Selected mesh/face object
 */
export interface SelectedObject {
  meshName: string;
  entity?: Entity;
}

/**
 * Material replacement plugin class
 * Manages UV transformations (scale, rotation, offset) for face materials
 */
export default class MaterialReplacePlugin {
  /** Maximum scale factor allowed */
  private readonly MAX_TIMES: number = 10;
  
  /** Contextual tools plugin reference */
  private readonly contextualToolsPlugin: unknown;
  
  /** Catalog plugin for material selection */
  private readonly catalogPlugin: CatalogPlugin;
  
  /** Right property bar plugin */
  private readonly RightPropertybarPlugin: RightPropertybarPlugin;
  
  /** Signal hook for event subscriptions */
  private readonly _signalHook: SignalHook;
  
  /** Lock state for proportional scaling */
  private lock: boolean = false;
  
  /** Command manager reference */
  private cmdMgr!: CommandManager;
  
  /** Current entity being edited */
  private entity!: Entity;
  
  /** Current command being executed */
  private cmd?: Command;

  /**
   * Constructor
   * @param dependencies - Plugin dependencies
   */
  constructor(dependencies: PluginDependencies);

  /**
   * Initialize the plugin
   * @param entity - Entity to manage materials for
   */
  init(entity: Entity): void;

  /**
   * Populate right property bar with material editing controls
   * @param event - Property bar populate event
   */
  onPopulateRightPropertyBarV2(event: PropertyBarPopulateEvent): void;

  /**
   * Create or reuse edit material command
   */
  createEditMaterialCmd(): void;

  /**
   * Complete the current edit material command
   */
  endEditMaterialCmd(): void;

  /**
   * Toggle proportional scaling lock
   */
  toggleLock(): void;

  /**
   * Build scale data with proportional constraints
   * @param message - Command message with scale data
   * @returns Modified command message
   */
  buildScaleData(message: CommandMessage): CommandMessage;

  /**
   * Reset all UV transformations
   * @param transformData - Default UV transform values
   */
  resetAll(transformData: UVTransformData): void;

  /**
   * Initialize property bar items for UV controls (position, rotation)
   * @returns Array of property bar items
   */
  initPropertyBarItemsV2(): PropertyBarItem[];

  /**
   * Initialize property bar items for material/color controls
   * @returns Array of property bar items
   */
  initPropertyBarSizeCardItemsV2(): PropertyBarItem[];
}