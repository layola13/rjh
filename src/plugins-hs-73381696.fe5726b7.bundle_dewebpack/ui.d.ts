/**
 * Module: UI
 * Original ID: 894204
 * Exports: UI
 */

/**
 * Image type identifiers for molding components
 */
interface ImageTypes {
  /** Baseboard style/type thumbnail */
  baseboardType: string;
  /** Baseboard material texture */
  baseboardTexture: string;
  /** Cornice style/type thumbnail */
  corniceType: string;
  /** Material color */
  color: string;
}

/**
 * Molding parameters returned by getMoldingParam
 */
interface MoldingParameters {
  /** Whether molding is disabled */
  disabled: boolean;
  /** Baseboard type thumbnail URL */
  baseboardType: string | Promise<{ imgSrc: string }>;
  /** Baseboard texture thumbnail URL or async result */
  baseboardTexture: string | Promise<{ imgSrc: string }>;
  /** Baseboard material color */
  baseboardColor: string;
  /** Baseboard thickness in units */
  baseboardThickness: number;
  /** Baseboard height in units */
  baseboardHeight: number;
  /** Cornice/gypsum type thumbnail URL */
  gypsum: string | Promise<{ imgSrc: string }>;
  /** Cornice texture thumbnail URL or async result */
  corniceTexture: string | Promise<{ imgSrc: string }>;
  /** Cornice material color */
  corniceColor: string;
  /** Cornice thickness in units */
  corniceThickness: number;
  /** Cornice height in units */
  corniceHeight: number;
}

/**
 * Property bar item configuration
 */
interface PropertyBarItem {
  /** Unique identifier */
  id: string;
  /** Parent item ID for hierarchical structure */
  parentId?: string;
  /** Display label */
  label: string;
  /** Item type from HSFPConstants.PropertyBarType */
  type: string;
  /** Display order */
  order: number;
  /** Child items */
  items?: PropertyBarItem[];
  /** Enable/disable status for toggleable items */
  status?: boolean;
  /** Status change callback */
  onStatusChange?: (enabled: boolean) => void;
  /** CSS class name */
  className?: string;
  /** Item-specific data configuration */
  data?: unknown;
  /** Current value */
  value?: number;
  /** Value change callback */
  onValueChange?: (event: { detail: { value: number } }) => void;
  /** Async parameter promise */
  asyncParam?: Promise<{ imgSrc: string }>;
  /** Color value */
  color?: string;
}

/**
 * Right-click context menu item
 */
interface RightMenuItem {
  /** Unique identifier */
  id: string;
  /** Control type */
  type: PropertyBarControlTypeEnum;
  /** Display order */
  order: number;
  /** Icon source */
  src: string;
  /** Display label */
  label: string;
  /** Click handler */
  onClick: () => void;
}

/**
 * Size modification parameters
 */
interface MoldingSizeParams {
  /** Height in units */
  height?: number;
  /** Thickness in units */
  thickness?: number;
}

/**
 * Handler interface for molding operations
 */
interface MoldingHandler {
  /** Add or remove molding */
  onAddMolding(enabled: boolean, moldingType: HSCore.Model.MoldingTypeEnum): void;
  /** Handle baseboard type selection */
  onBaseboardTypeHandler(): void;
  /** Handle baseboard texture selection */
  onBaseboardTextureHandler(): void;
  /** Handle cornice type selection */
  onCorniceTypeHandler(): void;
  /** Handle cornice texture selection */
  onCorniceTextureHandler(): void;
  /** Handle molding size changes */
  onMoldingSizeHandler(params: MoldingSizeParams, moldingType: HSCore.Model.MoldingTypeEnum): void;
}

/**
 * Catalog manager interface
 */
interface CatalogManager {
  /** Get product by seek ID */
  getProductBySeekId(seekId: string): Promise<{ thumbnail: string }>;
}

/**
 * UI controller for column molding (baseboard and cornice) property bar
 */
export declare class UI {
  /** Handler for molding operations */
  private readonly _handler: MoldingHandler;
  
  /** Supported molding types */
  private readonly _moldingTypes: HSCore.Model.MoldingTypeEnum[];
  
  /** Image type identifiers */
  private readonly _imgTypes: ImageTypes;
  
  /** Catalog plugin instance */
  private readonly _catalogPlugin: unknown;
  
  /** Catalog manager instance */
  private readonly _catalogManager: CatalogManager;
  
  /** Contextual tool plugin instance */
  private readonly _contextualToolPlugin: unknown;
  
  /** Whether baseboard is currently enabled */
  baseboardEnabled: boolean;
  
  /** Whether cornice is currently enabled */
  corniceEnabled: boolean;
  
  /** Whether molding functionality is disabled */
  disableMolding: boolean;
  
  /** Slider horizontal offset */
  sliderOffsetX: number;
  
  /** Slider vertical offset */
  sliderOffsetY: number;
  
  /** Slider horizontal range */
  sliderRangeX: number;
  
  /** Slider vertical range */
  sliderRangeY: number;

  /**
   * Create a new UI controller
   * @param handler - Handler for molding operations
   * @param catalogManager - Catalog manager instance
   * @param catalogPlugin - Catalog plugin instance
   * @param contextualToolPlugin - Contextual tool plugin instance
   */
  constructor(
    handler: MoldingHandler,
    catalogManager: CatalogManager,
    catalogPlugin: unknown,
    contextualToolPlugin: unknown
  );

  /**
   * Get all molding parameters for a model
   * @param model - The model to extract molding parameters from
   * @returns Complete molding parameter set
   */
  getMoldingParam(model: HSCore.Model.Obstacle): MoldingParameters;

  /**
   * Update internal baseboard/cornice enabled status from model
   * @param model - The model to check for molding state
   */
  updateMoldingEnableStatus(model?: HSCore.Model.Obstacle): void;

  /**
   * Initialize property bar items for the given model (V2 structure)
   * @param model - The model to generate property bar for
   * @returns Array of property bar item configurations
   */
  initPropertyBarItemsV2(model: HSCore.Model.Obstacle): PropertyBarItem[];

  /**
   * Initialize right-click context menu items
   * @param model - The selected model
   * @returns Array of context menu item configurations
   */
  initRightMenuItems(model: HSCore.Model.Obstacle): RightMenuItem[];
}