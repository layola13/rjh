/**
 * Handler for intelligent recommendation system
 * Manages product recommendations based on user selections and environment state
 */

import type { Application } from './Application';
import type { CatalogPlugin } from './CatalogPlugin';
import type { SelectionManager } from './SelectionManager';
import type { CommandManager } from './CommandManager';
import type { EnvironmentManager } from './EnvironmentManager';
import type { Content, CustomizedModel, PAssembly, Floor, Face, Group } from './Model';
import type { Floorplan } from './Floorplan';
import type { PluginManager } from './PluginManager';
import type { GuidePlugin } from './GuidePlugin';
import type { Signal } from './Signal';

/**
 * Search parameters for recommendation queries
 */
export interface SearchParams {
  /** Unique design identifier */
  designId: string;
  /** ID of the currently selected model */
  selectedModelId: string;
  /** Attributes of rooms in the floorplan */
  roomsAttribute: RoomAttribute[];
  /** IDs of models not in any specific room */
  otherModelIds: string[];
}

/**
 * Room attribute information
 */
export interface RoomAttribute {
  /** Room area in square units */
  area: number;
  /** Unique room identifier */
  roomId: string;
  /** Type/category of the room */
  roomType: string;
  /** Whether this room contains the currently selected content */
  isCurrent: boolean;
  /** Model IDs present in this room */
  modelIds: string[];
}

/**
 * Auto-recommendation display data
 */
export interface AutoRecommendData {
  /** Whether to show auto-recommend item */
  isShowAutoRecommendItem: boolean;
  /** Target floor/space information */
  floor: Partial<Floor>;
  /** Target entity information */
  entity: Partial<Content>;
}

/**
 * Recommendation decorations data
 */
export interface RecommendDecorationsData {
  /** Whether to show decoration recommendations */
  isShowRecommendDecorationsItem: boolean;
  /** Associated entity */
  entity: Record<string, unknown>;
}

/**
 * Product recommendation data
 */
export interface ProductData {
  /** Total number of recommended products */
  total: number;
  /** Array of recommended product items */
  items: unknown[];
}

/**
 * Dialog display data
 */
export interface DialogData {
  /** Selected entity */
  entity: Content;
  /** Auto-recommendation data */
  autoRecommendData: AutoRecommendData;
  /** Decoration recommendation data */
  recommendDecorationsData: RecommendDecorationsData;
  /** Search parameters used for recommendation */
  searchParams?: SearchParams;
  /** Retrieved product data */
  modelData?: ProductData;
  /** Callback invoked when dialog is hidden */
  hideDialogCallback?: () => void;
}

/**
 * Selection change event data
 */
export interface SelectionChangeEvent {
  data?: {
    /** Newly selected entities */
    newEntities?: Content[];
    /** Previously selected entities */
    oldEntities?: Content[];
  };
}

/**
 * Command event data
 */
export interface CommandEvent {
  data?: {
    cmd?: {
      /** Type of command being executed */
      type: string;
    };
  };
}

/**
 * Catalog event data
 */
export interface CatalogEvent {
  data?: {
    /** Whether catalog is shown */
    isShow: boolean;
  };
}

/**
 * Recommendation engine interface
 */
interface Recommendation {
  /**
   * Fetch product recommendations based on search parameters
   * @param params - Search parameters
   * @returns Promise resolving to product data
   */
  getProductData(params: SearchParams): Promise<ProductData>;
}

/**
 * Signal hook utility for managing event listeners
 */
interface SignalHook {
  /**
   * Listen to a signal
   * @param signal - Signal to listen to
   * @param handler - Handler function
   * @returns This SignalHook for chaining
   */
  listen(signal: Signal, handler: Function): SignalHook;
  
  /**
   * Remove all registered listeners
   */
  unlistenAll(): void;
}

/**
 * Plugin configuration map
 */
interface PluginConfig {
  [HSFPConstants.PluginType.Catalog]: CatalogPlugin;
}

/**
 * Main handler class for intelligent product recommendation system
 * Manages recommendation lifecycle, dialog display, and user interactions
 */
export declare class Handler {
  /** Application instance reference */
  private readonly _app: Application;
  
  /** Catalog plugin instance */
  private readonly _catalogPlugin: CatalogPlugin;
  
  /** Signal hook for event management */
  private readonly _signalHook: SignalHook;
  
  /** Recommendation engine instance */
  private readonly _recommendation: Recommendation;
  
  /** Current environment identifier (e.g., 'shejijia', 'icbu') */
  private readonly currentEnv: string;
  
  /** Current search parameters for recommendations */
  public searchParams?: SearchParams;
  
  /** Map of entity category IDs */
  public entityCategoryIdsMap?: Map<string, string>;
  
  /** Currently selected content entity */
  private _selectedContent?: Content;
  
  /** Whether dialog should be displayed */
  private _needShowDialog: boolean;
  
  /** Whether to permanently hide dialog */
  private _noShowDialog: boolean;
  
  /** Whether recommendation entry UI should be hidden */
  private _hideRecommendEntry: boolean;
  
  /** Whether recommendations can currently be triggered */
  public canRecommend: boolean;
  
  /** Throttled selection change handler */
  private _throttleSelectionChanged?: (event: SelectionChangeEvent, force: boolean) => void;
  
  /** React component instance for recommendation dialog */
  public dialogComp?: {
    hideDialog(): void;
  };

  /**
   * Creates a new Handler instance
   * @param app - Application instance
   * @param plugins - Plugin configuration map
   */
  constructor(app: Application, plugins: PluginConfig);

  /**
   * Initialize the handler
   * Sets up event listeners and configuration
   */
  init(): void;

  /**
   * Clean up and remove all event listeners
   */
  private _uninit(): void;

  /**
   * Handle catalog visibility changes
   * @param event - Catalog event data
   */
  signalShowCatalog(event: CatalogEvent): void;

  /**
   * Handle document opened event
   * @param event - Document event
   */
  private _onDocumentOpened(event: unknown): void;

  /**
   * Set whether to suppress dialog display
   * @param noShow - True to suppress dialog
   */
  setNoShowDialog(noShow: boolean): void;

  /**
   * Get current dialog suppression state
   * @returns True if dialog is suppressed
   */
  getNoShowDialog(): boolean;

  /**
   * Handle command starting event
   * @param event - Command event data
   */
  commandStarting(event: CommandEvent): void;

  /**
   * Handle command terminated event
   * @param event - Command event data
   */
  commandTerminated(event: CommandEvent): void;

  /**
   * Check if current command should block recommendations
   * @param event - Command event data
   * @returns True if command blocks recommendations
   */
  isCurrCmdIncludes(event: CommandEvent): boolean;

  /**
   * Handle selection change event
   * @param event - Selection change event data
   */
  private _onSelectionChange(event: SelectionChangeEvent): void;

  /**
   * Get auto-recommendation data for selected content
   * @param content - Selected content entity
   * @returns Auto-recommendation data
   */
  private _getAutoRecommendData(content: Content): AutoRecommendData;

  /**
   * Update recommendations based on current selection
   * @param event - Selection change event
   * @param force - Whether to force update regardless of state
   */
  updateRecommend(event: SelectionChangeEvent, force?: boolean): Promise<void>;

  /**
   * Hide the recommendation dialog
   */
  private _hideDialog(): void;

  /**
   * Fetch recommendation products
   * @param params - Search parameters
   * @returns Promise resolving to product data
   */
  getRecommendationProducts(params: SearchParams): Promise<ProductData>;

  /**
   * Show recommendation dialog with data
   * @param data - Dialog display data
   */
  private _showDialog(data: DialogData): void;

  /**
   * Check if current view environment allows recommendations
   * @returns True if environment supports recommendations
   */
  private _viewEnvEnable(): boolean;

  /**
   * Check if entity type supports data updates
   * @param entity - Entity to check
   * @returns True if entity supports updates
   */
  private _updateDataEnable(entity: unknown): boolean;

  /**
   * Build search parameters from selected content (V2)
   * @param content - Selected content entity
   * @returns Search parameters object
   */
  private _searchFieldBuildV2(content: Content): SearchParams;

  /**
   * Get all contents within a specific room
   * @param room - Target room/floor
   * @param floorplan - Floorplan instance
   * @returns Array of contents in the room
   */
  private _getContentsInRoom(room: Floor, floorplan: Floorplan): (Content | Group)[];

  /**
   * Get current environment identifier
   * @returns Environment string (e.g., 'shejijia', 'icbu', 'fp')
   */
  private _getCurrentEnv(): string;
}