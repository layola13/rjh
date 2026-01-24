/**
 * Customized Modeling Plugin Handler
 * Manages the lifecycle and interactions of customized 3D modeling features
 */

import type { CommandManager } from './CommandManager';
import type { TransactionManager } from './TransactionManager';
import type { CatalogManager } from './CatalogManager';
import type { Logger } from './Logger';
import type { CustomizedModel } from './CustomizedModel';
import type { Entity } from './Entity';
import type { SignalHook } from './SignalHook';
import type { Plugin } from './Plugin';

/**
 * Modeling message handler structure
 */
interface ModelingMessageHandler {
  [key: string]: {
    [action: string]: {
      handler?: (data: unknown) => void;
    };
  };
  getStatusBarItemsForCommand(): StatusBarItem[];
  getRightItemsForCommand(): RightMenuItem[];
  clearPropertybar(): void;
}

/**
 * Status bar item configuration
 */
interface StatusBarItem {
  id: string;
  label: string;
  icon?: string;
  enabled: boolean;
}

/**
 * Right menu item configuration
 */
interface RightMenuItem {
  id: string;
  label: string;
  action: () => void;
}

/**
 * Plugin registry map
 */
interface PluginRegistry {
  [HSFPConstants.PluginType.ContextualTools]: Plugin;
  [HSFPConstants.PluginType.PropertyBar]: Plugin;
  [key: string]: Plugin;
}

/**
 * Command event data
 */
interface CommandEventData {
  cmd: {
    showGizmo?: boolean;
    type?: string;
    output?: {
      content?: Entity | Entity[];
    };
  };
}

/**
 * Property bar population event data
 */
interface PropertyBarEventData {
  data: PropertyBarItem[];
}

/**
 * Property bar item
 */
interface PropertyBarItem {
  id: string;
  type: string;
  label: string;
  value?: unknown;
}

/**
 * Command status bar population event data
 */
interface CommandStatusBarEventData {
  data: {
    cmd: unknown;
    menuItems: StatusBarItem[];
    rightItems: RightMenuItem[];
  };
}

/**
 * UI message data structure
 */
interface UIMessageData {
  data?: string;
}

/**
 * Parsed message structure
 */
interface ParsedMessage {
  name: string;
  action: string;
  data?: unknown;
}

/**
 * Model scale data
 */
interface ModelScaleData {
  XScale: number;
  YScale: number;
  ZScale: number;
}

/**
 * Model metadata
 */
interface ModelMetadata {
  creator: string;
  unit: string;
  isScalable: boolean;
}

/**
 * Model info for upload
 */
interface ModelInfo {
  unit: string;
  XLength: number;
  YLength: number;
  ZLength: number;
}

/**
 * Catalog attribute
 */
interface CatalogAttribute {
  values: Array<{ value: string }>;
}

/**
 * Customized product data
 */
interface CustomizedProductData {
  description: string;
  thumb: string;
  category: string;
  name: string;
  productType: string;
  contentType: string;
  attributes: CatalogAttribute[];
  free: string;
}

/**
 * Upload file options
 */
interface UploadFileOptions {
  resType?: string;
}

/**
 * Material picker options
 */
interface MaterialPickerOptions {
  mydata: {
    types?: string;
  };
  isKeepCategory?: boolean;
  notFilter?: boolean;
  optionFilters?: CategoryFilter[];
  uiControl?: {
    type: string;
  };
}

/**
 * Category filter
 */
interface CategoryFilter {
  categoryType: string;
  filters: Record<string, string>;
}

/**
 * Main handler for customized modeling plugin
 */
export interface CustomizedModelingHandler {
  /** Logger instance for debugging */
  logger: Logger | null;
  
  /** Application instance */
  app: Application | null;
  
  /** Command manager */
  cmdMgr: CommandManager | null;
  
  /** Transaction manager */
  transMgr: TransactionManager | null;
  
  /** Catalog manager */
  catalogMgr: CatalogManager | null;
  
  /** Signal hook for event listening */
  _signalHook: SignalHook | null;
  
  /** Last command data cache */
  _lastCmdData: unknown;
  
  /** Flag for new document creation */
  isCreateNewDocId: boolean;
  
  /** Message handler registry */
  modelingMsgHandler: ModelingMessageHandler;
  
  /** Contextual tools plugin reference */
  _contextualToolsPlugin?: Plugin;
  
  /** Property bar plugin reference */
  _propertyBarPlugin?: Plugin;
  
  /** Selection manager */
  selectionMgr?: SelectionManager;
  
  /** Current entity being edited */
  entity?: CustomizedModel;

  /**
   * Initialize the handler with required dependencies
   * @param cmdMgr - Command manager instance
   * @param transMgr - Transaction manager instance
   * @param catalogMgr - Catalog manager instance
   * @param pluginRegistry - Registry of all plugins
   */
  init(
    cmdMgr: CommandManager,
    transMgr: TransactionManager,
    catalogMgr: CatalogManager,
    pluginRegistry: PluginRegistry
  ): void;

  /**
   * Cleanup resources on handler destruction
   */
  uninit(): void;

  /**
   * Handle command start display logic
   * @param event - Command event data
   */
  beginShowCommandDisplay(event: { data: CommandEventData }): void;

  /**
   * Handle command end display logic
   */
  endShowCommandDisplay(): void;

  /**
   * Handle undo action from UI
   */
  onUIUndo(): void;

  /**
   * Handle redo action from UI
   */
  onUIRedo(): void;

  /**
   * Handle apply action from UI
   */
  onUIApply(): void;

  /**
   * Handle cancel action from UI
   */
  onUICancel(): void;

  /**
   * Handle incoming messages from UI
   * @param event - Message event data
   */
  onUIReceiveMsg(event: UIMessageData): void;

  /**
   * Clear current entity reference
   */
  clearEntity(): void;

  /**
   * Populate property bar with customized model properties
   * @param event - Property bar event data
   */
  _onPopulatePropertyBar(event: PropertyBarEventData): void;

  /**
   * Populate command status bar
   * @param event - Status bar event data
   */
  _onPopulateCommandStatusBar(event: CommandStatusBarEventData): void;

  /**
   * Show confirmation dialog for editing smart customized ceiling
   * @param onConfirm - Callback when user confirms
   */
  _popUpConfirmEditSmartCustomizedCeilingDialog(onConfirm?: () => void): void;

  /**
   * Handle edit button click from UI
   */
  onUIEditBtnClk(): void;

  /**
   * Handle save customized model button click
   */
  onUISaveCustomizedModelClk(): void;

  /**
   * Upload customized content to cloud storage
   * @param entity - Entity to upload
   */
  uploadCustomizedContent(entity: CustomizedModel): void;

  /**
   * Handle edit type button click
   */
  onUIEditTypeBtnClk(): void;

  /**
   * Handle add material button click
   * @param entity - Optional entity to add material to
   */
  onUIAddMaterialBtnClk(entity?: CustomizedModel): void;

  /**
   * Handle group select button click
   */
  onUIGroupSelectClk(): void;

  /**
   * Start editing a customized model
   * @param entity - Entity to edit
   * @param host - Host entity
   * @param modelType - Type of model
   * @param additionalData - Additional configuration data
   */
  onStartEditCustomizedModel(
    entity: CustomizedModel,
    host: Entity | null,
    modelType: string,
    additionalData?: unknown
  ): void;

  /**
   * Find customized model in a room
   * @param room - Room entity
   * @param contentType - Content type to search for
   * @returns Found customized model or undefined
   */
  findCustomizedModel(room: Entity, contentType: string): CustomizedModel | undefined;

  /**
   * Register transaction requests
   * @param transMgr - Transaction manager
   */
  _registerRequests(transMgr: TransactionManager): void;

  /**
   * Handle move command completion
   */
  _onMoveCmdComplete(): void;
}

/**
 * Application interface
 */
interface Application {
  selectionManager: SelectionManager;
  activeEnvironmentId: string;
  cmdManager: CommandManager;
  floorplan: Floorplan;
  pluginManager: PluginManager;
  userTrackLogger: UserTrackLogger;
  registerEnvironment(id: string, env: unknown): void;
  getActive3DView(): View3D;
  switchTo3DView(): void;
}

/**
 * Selection manager
 */
interface SelectionManager {
  selected(includeChildren: boolean): Array<{ entity: Entity }>;
  hasSelected(entity: Entity): boolean;
  select(entity: Entity): void;
}

/**
 * Floorplan interface
 */
interface Floorplan {
  forEachContent(callback: (content: Entity) => void, context: unknown): void;
  forEachGroup(callback: (group: Entity) => void, context: unknown): void;
}

/**
 * Plugin manager
 */
interface PluginManager {
  getPlugin(pluginId: string): Plugin | undefined;
}

/**
 * User tracking logger
 */
interface UserTrackLogger {
  push(action: string, data: unknown): void;
}

/**
 * 3D View interface
 */
interface View3D {
  displayList: Record<string, unknown>;
  getEntityThumbnail(
    displayObject: unknown,
    direction: { x: number; y: number; z: number },
    width: number,
    height: number
  ): Blob;
}

/**
 * Request type registration tuple
 */
type RequestRegistration = [string, new (...args: unknown[]) => unknown];