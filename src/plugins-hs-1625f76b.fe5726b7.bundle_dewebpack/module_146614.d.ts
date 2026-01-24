/**
 * Content Part Material Replace Plugin Handler
 * Manages material replacement functionality for customized products in the 3D floorplan editor
 */

import { HSCore } from './635589';
import { App, Entity, Plugin, Command, Environment } from './core-types';

/**
 * Configuration options for initializing the plugin
 */
interface PluginInitOptions {
  context: {
    app: App;
  };
  dependencies: Record<string, Plugin>;
}

/**
 * Environment registration configuration
 */
interface EnvironmentConfig {
  context: any;
  dependencies: {
    [HSFPConstants.PluginType.ContextualTools]: Plugin;
    [HSFPConstants.PluginType.Toolbar]: Plugin;
    [HSFPConstants.PluginType.ResizeWidget]: Plugin;
    [HSFPConstants.PluginType.ViewSwitch]: Plugin;
    [HSFPConstants.PluginType.PageHeader]: Plugin;
    [HSFPConstants.PluginType.PropertyBar]: Plugin;
  };
}

/**
 * Document opening event data
 */
interface DocumentOpeningEventData {
  data?: {
    productsMap?: Map<string, Entity>;
  };
}

/**
 * Catalog item click event data
 */
interface CatalogItemClickEventData {
  data?: {
    meta?: Entity;
  };
}

/**
 * Material search parameters
 */
interface MaterialSearchParams {
  text?: string;
  offset?: number;
  folderId?: string;
  isInFolder?: boolean;
}

/**
 * Material search request payload
 */
interface MaterialSearchRequest {
  id: string;
  partId: string;
  keyword: string;
  folderId: string;
  isInFolder: boolean;
  offset: number;
  limit: number;
}

/**
 * Material metadata information
 */
interface MaterialMetaInfo {
  [key: string]: any;
}

/**
 * Material list item
 */
interface MaterialItem {
  materialMetaInfo?: MaterialMetaInfo;
  [key: string]: any;
}

/**
 * Material search result
 */
interface MaterialSearchResult {
  items: any[];
  total: number;
}

/**
 * Material search API response
 */
interface MaterialSearchResponse {
  ret?: string[];
  data?: {
    result?: {
      materialList?: MaterialItem[];
      folderTreeList?: any[];
      total?: number;
    };
  };
}

/**
 * Model part material info
 */
interface ModelPartMaterial {
  modelPartId: string;
  materialList: any[];
  [key: string]: any;
}

/**
 * Product order result
 */
interface ProductOrderResult {
  modelId: string;
  modelPartMaterialList: ModelPartMaterial[];
}

/**
 * Product order API response
 */
interface ProductOrderResponse {
  ret?: string[];
  data?: {
    result?: ProductOrderResult[];
  };
}

/**
 * Command terminated event data
 */
interface CommandTerminatedEventData {
  data?: {
    cmd?: Command;
  };
}

/**
 * Left menu item configuration
 */
interface LeftMenuItem {
  label: string;
  id: string;
  disable: boolean;
  src: string;
  order: number;
  onClick: () => void;
}

/**
 * Left menu populate event data
 */
interface LeftMenuPopulateEventData {
  data: {
    defaultItems: LeftMenuItem[];
  };
}

/**
 * Content Part Material Replace Plugin Handler
 * Handles material replacement for customized products in the floorplan
 */
declare class ContentPartMaterialReplaceHandler {
  /** Main application instance */
  app?: App;

  /** Single room instance when in single room mode */
  singleRoom?: any;

  /** Currently selected entity for material replacement */
  selectedEntity?: Entity;

  /** Signal hook for event management */
  signalHook?: HSCore.Util.SignalHook;

  /** ID of the environment before entering material replace mode */
  fromEnvironmentId?: string;

  /** Left menu plugin reference */
  menuPlugin?: Plugin;

  /** Catalog plugin reference */
  catalogPlugin?: Plugin;

  /** Toolbar plugin reference */
  toolBarPlugin?: Plugin;

  /** Single room plugin reference */
  singleRoomPlugin?: Plugin;

  /** Map storing initial content part material data by product ID */
  initContentPartMaterialMap: Map<string, ModelPartMaterial[]>;

  /** Currently selected mesh/part name */
  selectedMeshName?: string;

  /** Current material list search result */
  currentMaterialList?: MaterialSearchResult;

  /** Folder tree structure for material organization */
  folderTreeList: any[];

  /**
   * Initialize the plugin handler
   * @param options - Plugin initialization options
   */
  init(options: PluginInitOptions): void;

  /**
   * Register signal hook listeners for various events
   */
  listenSignalHook(): void;

  /**
   * Register custom environment for material replacement
   * @param config - Environment configuration
   */
  registerEnvironments(config: EnvironmentConfig): void;

  /**
   * Handle left menu population event
   * @param event - Menu populate event data
   */
  onPopulateLeftMenu(event: LeftMenuPopulateEventData): void;

  /**
   * Handle document opening event
   * @param event - Document opening event data
   */
  onDocumentOpening(event: DocumentOpeningEventData): void;

  /**
   * Handle catalog item click event
   * @param event - Catalog item click event data
   */
  onCatalogItemClick(event: CatalogItemClickEventData): void;

  /**
   * Fetch product metadata by IDs
   * @param productIds - Array of product IDs
   * @returns Promise resolving to product metadata result
   */
  getProductMetaByIds(productIds: string[]): Promise<MaterialSearchResult>;

  /**
   * Search for materials based on criteria
   * @param params - Material search parameters
   * @returns Promise resolving to material search result
   */
  getMaterialList(params: MaterialSearchParams): Promise<MaterialSearchResult>;

  /**
   * Fetch product order list with material information
   * @param productIds - Array of product IDs (defaults to selected entity)
   * @returns Promise resolving to material map
   */
  getProductOrderList(productIds?: string[]): Promise<Map<string, ModelPartMaterial[]>>;

  /**
   * Initialize left menu items for customized products
   * @param entity - The selected entity
   * @returns Array of menu items
   */
  initLeftMenuItems(entity: Entity): LeftMenuItem[];

  /**
   * Start material replacement mode (styler)
   * @param entity - Entity to replace materials for
   */
  startStyler(entity: Entity): void;

  /**
   * Exit material replacement mode
   */
  exitStyler(): void;

  /**
   * Check if entity is a customized product
   * @param entity - Entity to check
   * @returns True if entity is customized product
   */
  isCustomizedProduct(entity?: Entity): boolean;

  /**
   * Get the currently selected entity
   * @returns Selected entity
   */
  getSelectedEntity(): Entity | undefined;

  /**
   * Get the currently selected mesh/part name
   * @returns Selected mesh name
   */
  getSelectMeshName(): string | undefined;

  /**
   * Set the currently selected mesh/part name
   * @param meshName - Name of the mesh/part
   */
  setSelectMeshName(meshName: string): void;

  /**
   * Get current material list result
   * @returns Current material list or empty result
   */
  getCurrMaterialList(): MaterialSearchResult;

  /**
   * Get folder tree list for material organization
   * @returns Folder tree array
   */
  getFolderTreeList(): any[];

  /**
   * Get content parts data for an entity
   * @param entity - Entity to get parts for (defaults to selected entity)
   * @returns Array of model part materials
   */
  getContentPartsData(entity?: Entity): ModelPartMaterial[];

  /**
   * Get material list for a specific part
   * @param entity - Entity containing the part
   * @param partId - Part ID to get materials for
   * @returns Material list for the part
   */
  getPartMaterialList(entity: Entity, partId: string): any[] | undefined;

  /**
   * Change the selected part and update UI
   * @param partId - Part ID to select
   * @param shouldRefreshPropertyBar - Whether to refresh property bar (default: true)
   */
  changeSelectPart(partId: string, shouldRefreshPropertyBar?: boolean): void;

  /**
   * Check if design contains any customized products
   * @returns True if design has customized products
   */
  designHasCustomizedProducts(): boolean;

  /**
   * Handle command terminated event
   * @param event - Command terminated event data
   */
  commandTerminated(event: CommandTerminatedEventData): void;

  /**
   * Update mirror floorplan status based on customized products
   */
  changeMirrorFloorplanStatus(): void;

  /**
   * Set mirror floorplan button visibility
   * @param hasCustomizedProducts - Whether design has customized products
   */
  setMirrorFloorplanStatus(hasCustomizedProducts: boolean): void;

  /**
   * Get all content part IDs for selected entity
   * @returns Array of part IDs
   */
  getContentPartIds(): string[];
}

export default ContentPartMaterialReplaceHandler;