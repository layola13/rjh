/**
 * Catalog plugin type declarations
 * Provides general environment for floorplan catalog management
 */

import { Handler } from './Handler';
import { UI } from './UI';
import { Signal } from 'HSCore/Util/Signal';
import { SignalHook } from 'HSCore/Util/SignalHook';
import { IPlugin } from 'HSApp/Plugin/IPlugin';

/**
 * Position coordinates interface
 */
export interface Position {
  /** X coordinate in pixels */
  x: number;
  /** Y coordinate in pixels */
  y: number;
}

/**
 * Panel opening options
 */
export interface PanelOptions {
  /** Category ID to display */
  categoryId?: string;
  /** Menu ID to display */
  menuId?: string;
  /** Whether to get front category ID */
  getFrontCategoryId?: boolean;
  /** Whether to show model recovery */
  showModelRecovery?: boolean;
  /** Search query */
  query?: string;
  /** Whether this is a replace scene operation */
  replaceScene?: boolean;
}

/**
 * Customized product data structure
 */
export interface CustomizedProductData {
  /** Product ID */
  productId: string;
  /** Product category */
  category?: string;
  /** Product data payload */
  productData?: unknown;
  /** Free resource file */
  free?: File | string;
}

/**
 * Delete product response
 */
export interface DeleteProductResponse {
  /** Deletion result */
  result: boolean;
}

/**
 * Event tracking environment data
 */
export interface EventTrackData {
  /** Current environment query param */
  env?: string;
  /** Active environment ID */
  IF_env?: number;
  /** Product GUID */
  GUID?: string;
  /** Model type string */
  sModelType?: string;
}

/**
 * Layout constraint function
 */
export type LayoutConstrainFn = (params: { isShow: boolean; width: number }) => void;

/**
 * Main Catalog Plugin class
 * Manages catalog display, product operations, and panel interactions
 */
export declare class CatalogPlugin extends IPlugin {
  /** Event handler instance */
  handler: Handler;
  
  /** UI manager instance */
  ui: UI;
  
  /** Current environment ID */
  env: number;
  
  /** Menu configuration data */
  menuData: unknown;
  
  /** Catalog signal manager instance */
  catalogSignalManager: any;
  
  /** Base API manager instance */
  baseApiManager: any;
  
  /** Root DOM container element */
  rootContainer: HTMLElement | null;
  
  /** Current product page mode */
  productPageMode: string | undefined;
  
  /** Whether catalog is currently shown */
  catalogShow: boolean;
  
  /** Panel identifier */
  PanelId: string;
  
  /** Application catalog manager */
  appCatalogManager: any;
  
  /** Application instance */
  app: any;
  
  /** Command manager */
  cmdMgr: any;
  
  /** Signal hook for event listening */
  signalHook: SignalHook;
  
  // Signal declarations
  /** Fires when catalog item is clicked */
  signalItemClicked: Signal;
  
  /** Fires when mouse hovers over item */
  signalItemMouseOver: Signal;
  
  /** Fires when mouse leaves item */
  signalItemMouseOut: Signal;
  
  /** Fires when independent panel is hidden */
  signalIndependentHidden: Signal;
  
  /** Fires when customized product panel is registered */
  signalCustomizedProductPanelRegistered: Signal;
  
  /** Fires when catalog is expanded */
  signalExpandCatalog: Signal;
  
  /** Fires when catalog is shown */
  signalShowCatalog: Signal;
  
  /** Fires when independent panel is shown */
  signalIndependentPanelShow: Signal;
  
  /** Fires when menu item is clicked */
  signalMenuItemClick: Signal;
  
  /** Fires when upload items is clicked */
  signalUploadItemsClick: Signal;
  
  /** Fires when page scroll starts */
  signalPageScrollStart: Signal;
  
  /** Fires when page number changes */
  signalPageNumChange: Signal;
  
  /** Fires when catalog render completes */
  signalCatalogRenderEnd: Signal;
  
  /** Fires when catalog tabs are clicked */
  signalCatalogTabsClick: Signal;
  
  /** Fires when favorite ID list is updated */
  signalUpdateFavIdList: Signal;
  
  /** Fires when upload model is clicked */
  signalUploadModelClick: Signal;

  constructor();

  /**
   * Plugin activation lifecycle hook
   * @param context - Activation context
   * @param options - Activation options
   */
  onActive(context: any, options: any): void;

  /**
   * Plugin deactivation lifecycle hook
   */
  onDeactive(): void;

  /**
   * Register signal listeners
   * @param context - Application context
   */
  listenSignal(context: any): void;

  /**
   * Show the catalog panel
   * @param forceRefresh - Whether to force refresh catalog data
   */
  showCatalog(forceRefresh?: boolean): void;

  /**
   * Hide the catalog panel
   */
  hideCatalog(): void;

  /**
   * Toggle catalog visibility
   * @param visible - Explicit visibility state
   */
  toggleCatalog(visible?: boolean): void;

  /**
   * Get large view container element
   * @returns Large view container DOM element
   */
  getLargeViewContainer(): HTMLElement;

  /**
   * Show catalog page by category ID
   * @param options - Category display options
   */
  showPageByCategoryId(options: { categoryId: string; menuId: string }): void;

  /**
   * Add mini metadata processor
   * @param processor - Processor function
   */
  addMiniMetaProcessor(processor: (data: any) => any): void;

  /**
   * Initialize all signal references
   */
  getSignal(): void;

  /**
   * Set independent panel initial position
   * @param position - Initial position coordinates
   */
  setIndependentPanelInitialPos(position?: Position): void;

  /**
   * Open independent replacement panel
   * @param options - Panel options
   * @param param2 - Additional parameter
   * @param param3 - Additional parameter
   */
  openIndependentPanel(options?: PanelOptions, param2?: any, param3?: any): Promise<void>;

  /**
   * Open page panel
   * @param options - Page panel options
   */
  openPagePanel(options: any): void;

  /**
   * Show 3D viewer
   * @param data - Viewer data
   */
  show3DViewer(data: any): void;

  /**
   * Show moodboard image viewer
   * @param data - Image data
   */
  showMoodboardImageViewer(data: any): void;

  /**
   * Open reverse render replace panel
   * @param data - Render data
   */
  openReverseRenderReplacePanel(data: any): void;

  /**
   * Close independent panel
   */
  closeIndependent(): void;

  /**
   * Set model IDs for search filtering
   * @param modelIds - Array of model IDs
   */
  setModelIdsSearch(modelIds: string[]): void;

  /**
   * Clear model IDs search filter
   */
  clearModelIdsSearch(): void;

  /**
   * Get base API manager instance
   */
  get BaseApiManager(): any;

  /**
   * Add customized product to catalog
   * @param productData - Product data
   * @param category - Product category
   * @returns Promise resolving to product ID
   */
  addCustomizedProduct(productData: CustomizedProductData, category?: string): Promise<any>;

  /**
   * Update existing customized product
   * @param productId - Product ID to update
   * @param productData - Updated product data
   * @param category - Product category
   * @returns Promise resolving to update result
   */
  updateCustomizedProduct(productId: string, productData: unknown, category: string): Promise<any>;

  /**
   * Delete customized product
   * @param productId - Product ID to delete
   * @param category - Product category
   * @returns Promise resolving to deletion result
   */
  deleteCustomizedProduct(productId: string, category: string): Promise<any>;

  /**
   * Delete product from catalog
   * @param productId - Product ID to delete
   * @returns Promise resolving to deletion result
   */
  deleteProduct(productId: string): Promise<DeleteProductResponse>;

  /**
   * Check if model can be deleted
   * @param modelId - Model ID to check
   * @param options - Check options
   * @returns Whether model can be deleted
   */
  checkModelDelete(modelId: string, options: any): boolean;

  /**
   * Show menu tooltip
   * @param data - Tooltip data
   */
  showMenuTooltip(data: any): void;

  /**
   * Change compass widget position based on catalog state
   * @param params - Layout parameters
   */
  changeCompassPosition(params: { isShow: boolean; width: number }): void;

  /**
   * Get current catalog page mode
   * @returns Current page mode
   */
  getCatalogPageMode(): string | undefined;

  /**
   * Set catalog page mode
   * @param mode - Page mode to set
   */
  setCatalogPageMode(mode: string): void;

  /**
   * Get draw room page instance
   * @returns Draw room page
   */
  getDrawRoomPage(): any;

  /**
   * Get template room page container
   * @param options - Container options
   * @returns Page container element
   */
  getTemplateRoomPageContainer(options: any): HTMLElement;

  /**
   * Get house type panel class
   * @returns House type panel constructor
   */
  getHouseTypePanel(): any;

  /**
   * Get AI result page class
   * @returns AI result page constructor
   */
  getAIResultPage(): any;

  /**
   * Get product item by ID
   * @param productId - Product ID
   * @returns Product item data
   */
  getProductItem(productId: string): any;

  /**
   * Change catalog sidebar top offset
   * @param offset - Top offset in pixels
   */
  changeCatalogSidebarTop(offset?: number): void;

  /**
   * Get special topic page instance
   * @returns Special topic page
   */
  getSpecialTopicPage(): any;

  /**
   * Get make custom page instance
   * @returns Make custom page
   */
  getMakeCustomPage(): any;

  /**
   * Check if environment requires catalog refresh
   * @param environmentId - Environment ID to check
   * @returns Whether environment requires refresh
   */
  checkEnvironments(environmentId: number): boolean;

  /**
   * Get registered page map
   * @returns Page map object
   */
  getPageMap(): Record<string, any>;

  /**
   * Set catalog to readonly mode
   */
  setCatalogReadonly(): void;

  /**
   * Set catalog to edit mode
   */
  setCatalogEdit(): void;

  /**
   * Query public templates
   * @param param1 - Query parameter 1
   * @param param2 - Query parameter 2
   * @param param3 - Query parameter 3
   * @returns Query results
   */
  QueryTemplate(param1: any, param2: any, param3: any): Promise<any>;

  /**
   * Get template room product builder
   * @returns Product builder instance
   */
  getTemplateRoomProductBuilder(): any;

  /**
   * Get enterprise library data
   * @param options - Query options
   * @returns Enterprise library data
   */
  getEnterpriseLibraryData(options: any): Promise<any>;
}

/**
 * Plugin registration
 */
export declare const registerCatalogPlugin: () => void;