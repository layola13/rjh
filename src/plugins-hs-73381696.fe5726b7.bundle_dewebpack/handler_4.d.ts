/**
 * Handler module for managing obstacle-related operations in the 3D scene
 * Handles material application, molding management, and UI interactions
 */

import type { SignalHook } from 'HSCore.Util';
import type { 
  Application, 
  CommandManager, 
  SelectionManager, 
  TransactionManager,
  CatalogManager 
} from 'HSApp';
import type { Obstacle, MoldingTypeEnum } from 'HSCore.Model';
import type { Plugin, PluginRegistry } from 'HSFPConstants';
import type { CatalogProduct, CategoryTypeEnum, ProductTypeEnum } from 'HSCatalog';
import type { UI } from './UI';

/**
 * Configuration for catalog panel queries
 */
interface CatalogPanelConfig {
  /** Category type filters */
  types?: CategoryTypeEnum | CategoryTypeEnum[];
  /** Scene type for filtering materials */
  sceneType?: string;
  /** Query parameters for initial selection */
  query?: {
    seekId?: string;
    categoryId?: string;
  };
  /** Optional filters */
  optionFilters?: Array<{
    categoryType: CategoryTypeEnum;
    filters: Record<string, unknown>;
  }>;
  /** Whether to exclude type filtering */
  notFilter?: boolean;
  /** Category types to exclude */
  excludeType?: CategoryTypeEnum;
  /** Additional metadata */
  mydata?: {
    types?: CategoryTypeEnum;
    modelSearchFilter?: {
      sceneType: string;
    };
  };
}

/**
 * Molding configuration data
 */
interface MoldingData {
  /** Molding metadata from catalog */
  metadata?: CatalogProduct;
  /** Material applied to the molding */
  material?: CatalogProduct;
  /** Size dimensions */
  size?: { width?: number; height?: number };
  /** Product seek ID */
  seekId?: string;
}

/**
 * Refresh options for UI components
 */
interface RefreshOptions {
  /** Whether to refresh the status bar */
  refreshStatusBar?: boolean;
}

/**
 * Material data structure for obstacles
 */
interface MaterialData {
  /** Seek ID for the material product */
  seekId: string;
  /** Default texture URI */
  defaultTextureURI?: string;
  /** Current texture URI */
  textureURI?: string;
  /** Tile size in X dimension */
  tileSize_x?: number;
  /** Tile size in Y dimension */
  tileSize_y?: number;
  /** Seam filler support flag */
  seamFillerSupported?: boolean;
  /** Seam width for filler */
  seamWidth?: number;
  /** Seam color for filler */
  seamColor?: string;
  /** Rotation angle in radians */
  rotation?: number;
  /** Equality comparison method */
  equals?(other: MaterialData): boolean;
  /** Set material data properties */
  setMaterialData(data: Partial<MaterialData>): void;
}

/**
 * Display list entry for 3D objects
 */
interface DisplayListEntry {
  /** Unique identifier */
  id: string;
  /** 3D scene node */
  node: unknown;
  /** Molding mesh mapping */
  moldingMeshMap?: Map<string, { meshes: unknown[] }>;
  /** Ungroup mesh components */
  ungroupMesh(): void;
  /** Get materials area mapping */
  getMaterialsArea(): Map<string, { material: { rotation?: number } }>;
  /** Select specific mesh by ID */
  selectMesh(meshId?: string, append?: boolean): void;
}

/**
 * Signal event data structure
 */
interface SignalEventData<T = unknown> {
  /** Event payload data */
  data: T;
}

/**
 * Property bar population event data
 */
interface PropertyBarEventData {
  /** Method to insert collection at index */
  xInsertCollection(index: number, items: unknown[]): void;
}

/**
 * Main handler class for obstacle operations
 * Manages material application, molding, and UI interactions for 3D obstacles
 */
export declare class Handler {
  /** Signal hook for event management */
  private _signalHook: SignalHook;
  
  /** Reference to main application instance */
  private _app: Application;
  
  /** Command manager for undo/redo operations */
  private _cmdManager: CommandManager;
  
  /** Selection manager for tracking selected entities */
  private _selectionManager: SelectionManager;
  
  /** Transaction manager for batching operations */
  private _transManager: TransactionManager;
  
  /** Catalog manager for product data */
  public catalogManager: CatalogManager;
  
  /** Contextual tools plugin reference */
  private _contextToolsPlugin: Plugin;
  
  /** Property bar plugin reference */
  private _propertyBarPlugin: Plugin;
  
  /** Material image processing plugin */
  private _materialImagePlugin: Plugin;
  
  /** Catalog panel plugin */
  private _catalogPlugin: Plugin;
  
  /** Left menu plugin */
  private _menuPlugin: Plugin;
  
  /** Wall molding plugin */
  private _wallMoldingPlugin: Plugin;
  
  /** UI manager instance */
  private _ui: UI;
  
  /** Currently selected obstacle entities */
  private _entities: Obstacle[];
  
  /** Map of active commands by entity ID */
  private _commands: Map<string, unknown>;
  
  /** Original material state cache */
  private _originalMateriapMaps: Map<string, Map<string, MaterialData>>;
  
  /** Current catalog item click handler */
  private _catalogItemClickHandler?: (product: CatalogProduct) => void;
  
  /** Temporary handler reference */
  private _temphandler?: (product: CatalogProduct) => void;
  
  /** Flag indicating if slider should be cleared */
  public isSliderClear: boolean;
  
  /** 3D utility functions */
  private _3dUtil: {
    getMeshName(mesh: unknown): string;
    isMeshNode(node: unknown): boolean;
    getMeshId(mesh: unknown): string;
    traverseNode(node: unknown, callback: (node: unknown) => void): void;
  };

  /**
   * Constructor initializes signal hook
   */
  constructor();

  /**
   * Initialize the handler with application and plugin references
   * @param context - Context containing app reference
   * @param plugins - Registry of available plugins
   */
  init(context: { app: Application }, plugins: PluginRegistry): void;

  /**
   * Cleanup and unlisten all signal hooks
   */
  uninit(): void;

  /**
   * Refresh the status bar UI
   * @param options - Refresh configuration options
   */
  refreshStatusBar(options?: RefreshOptions): void;

  /**
   * Trigger property bar refresh via signal
   */
  refreshPropertyBarV2(): void;

  /**
   * Add molding to selected obstacles
   * @param shouldAdd - Whether to add or remove molding
   * @param moldingType - Type of molding (Cornice or Baseboard)
   */
  onAddMolding(shouldAdd: boolean, moldingType: MoldingTypeEnum): void;

  /**
   * Get the material seek ID from the first selected entity
   * @returns Material seek ID or empty string
   */
  getMaterialSeekId(): string;

  /**
   * Handle obstacle material button click
   * Opens catalog panel for material selection
   */
  onObstacleMaterialClicked(): void;

  /**
   * Get rotation value from first selected entity's material
   * @returns Rotation angle in radians
   */
  getRotateValue(): number;

  /**
   * Select all non-molding meshes in the display entry
   * @param displayEntry - The 3D display list entry
   */
  selectMeshes(displayEntry: DisplayListEntry): void;

  /**
   * Handle catalog item click events
   * @param event - Signal event containing clicked product data
   */
  private _onCatalogItemClick(event: SignalEventData<CatalogProduct>): void;

  /**
   * Apply selected material to obstacles
   * @param product - Selected catalog product (material)
   */
  onObstacleMaterialSelected(product: CatalogProduct): void;

  /**
   * Handle edit obstacle command
   * @param obstacle - The obstacle entity to edit
   */
  private _onEditObstacleHandler(obstacle: Obstacle): void;

  /**
   * Handle selection change events
   * Cleans up commands for deselected entities
   */
  private _onSelectionChanged(): void;

  /**
   * Get mesh names associated with moldings
   * @param displayEntry - The 3D display list entry
   * @returns Array of mesh names belonging to moldings
   */
  getMoldingMeshNames(displayEntry: DisplayListEntry): string[];

  /**
   * Get the ID of the first selected entity
   * @returns First obstacle entity
   */
  getEntityID(): Obstacle;

  /**
   * Get material data as array excluding molding meshes
   * @returns Array of material data objects
   */
  getEntityMaterialDataAsArray(): MaterialData[];

  /**
   * Get material data formatted for property bar display
   * @returns Array of material data objects
   */
  getEntityMaterialDataAsArrayForPropertyBar(): MaterialData[];

  /**
   * Handle catalog panel close event
   */
  private _onIndependentHidden(): void;

  /**
   * Handle status bar retiring event
   */
  private _onRetiringStatusBar(): void;

  /**
   * Populate property bar with obstacle-specific controls
   * @param event - Event containing property bar data
   */
  private _onPopulatePropertyBarV2(event: SignalEventData<PropertyBarEventData>): void;

  /**
   * Handle baseboard type selection button click
   * Opens catalog panel for baseboard type selection
   */
  onBaseboardTypeHandler(): void;

  /**
   * Apply selected baseboard type to obstacles
   * @param product - Selected baseboard product
   */
  onBaseboardTypeSelected(product: CatalogProduct): void;

  /**
   * Handle baseboard texture selection button click
   * Opens catalog panel for baseboard material selection
   */
  onBaseboardTextureHandler(): void;

  /**
   * Apply selected texture to baseboard
   * @param product - Selected material product
   */
  onBaseboardTextureSelected(product: CatalogProduct): void;

  /**
   * Handle molding size change
   * @param sizeData - New size configuration
   * @param moldingType - Type of molding being modified
   */
  onMoldingSizeHandler(sizeData: MoldingData, moldingType: MoldingTypeEnum): void;

  /**
   * Handle cornice type selection button click
   * Opens catalog panel for cornice type selection
   */
  onCorniceTypeHandler(): void;

  /**
   * Apply selected cornice type to obstacles
   * @param product - Selected cornice product
   */
  onCorniceTypeSelected(product: CatalogProduct): void;

  /**
   * Handle cornice texture selection button click
   * Opens catalog panel for cornice material selection
   */
  onCorniceTextureHandler(): void;

  /**
   * Apply selected texture to cornice
   * @param product - Selected material product
   */
  onCorniceTextureSelected(product: CatalogProduct): void;

  /**
   * Handle cornice size modification
   * @deprecated Method stub - not implemented
   */
  onCorniceSizeHandler(): void;

  /**
   * Populate right-click context menu with obstacle-specific items
   * @param event - Event containing menu customization data
   */
  private _onPopulateRightmenuCustomized(event: SignalEventData<{ customizedItems: unknown[] }>): void;
}