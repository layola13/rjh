/**
 * Change Pocket Material Request
 * Handles the transaction for changing material properties of a pocket element
 */

/**
 * Material data structure for pocket customization
 */
export interface MaterialData {
  /** Unique identifier for seeking/matching materials */
  seekId?: string;
  /** Material category type */
  categoryType?: HSCatalog.CategoryTypeEnum;
  /** Additional material properties */
  [key: string]: unknown;
}

/**
 * Pocket interface representing a customizable element
 */
export interface Pocket {
  /** Get the current material applied to the pocket */
  getMaterial(): HSCore.Material.Material | null;
  /** Set a new material to the pocket */
  setMaterial(material: HSCore.Material.Material): void;
  /** Get the host object containing this pocket */
  getHost(): { dirtyMaterial(): void } | null;
}

/**
 * Catalog query options for material selection
 */
export interface CatalogQueryOptions {
  /** Search query parameters */
  query?: Record<string, string>;
  /** Category filters */
  optionFilters?: Array<{
    categoryType: HSCatalog.CategoryTypeEnum;
    filters: Record<string, unknown>;
    sceneType: HSApp.Catalog.DataConfig.SceneType;
  }>;
  /** Custom data payload */
  mydata?: {
    types?: HSCatalog.CategoryTypeEnum;
    [key: string]: unknown;
  };
  /** Skip additional filtering */
  notFilter?: boolean;
}

/**
 * Panel event handlers for material selection UI
 */
export interface PanelHandlers {
  /** Called when the material selection panel is shown */
  panelShownHandler(): void;
  /** Called when a material product is selected */
  productSelectedHandler(material: HSCore.Material.Material, context: { transManager: HSCore.Transaction.TransactionManager }): void;
  /** Called when the material selection panel is hidden */
  panelHiddenHandler(): void;
}

/**
 * Request class for changing pocket material in a transaction
 * Extends the base state request to support undo/redo operations
 */
export declare class ChangePocketMaterialRequest extends HSCore.Transaction.Common.StateRequest {
  /** The pocket element being modified */
  private _pocket: Pocket;
  
  /** The new material data to apply */
  private _materialData: MaterialData;
  
  /** The original material before changes (for undo) */
  private _savedMaterial?: HSCore.Material.Material;

  /**
   * Creates a new change pocket material request
   * @param pocket - The pocket element to modify
   * @param materialData - The material data to apply
   */
  constructor(pocket: Pocket, materialData: MaterialData);

  /**
   * Commits the material change transaction
   * Creates a new material instance and applies it to the pocket
   */
  onCommit(): void;

  /**
   * Internal method to apply material changes
   * @param material - The material instance to apply
   */
  private _changeMaterial(material: HSCore.Material.Material): void;

  /**
   * Determines if this request can participate in field-level transactions
   * @returns Always returns true for material changes
   */
  canTransactField(): boolean;
}

/**
 * Factory function to create material selection workflow
 * @param selectedElements - Array of selected elements containing the pocket
 * @param statusBarController - Controller for updating UI status bar
 * @param context - Application context (unused but preserved for signature compatibility)
 * @returns Tuple of [query options, panel handlers, workflow ID]
 */
export default function createChangePocketMaterialWorkflow(
  selectedElements: Array<{ getPocket(): Pocket }>,
  statusBarController: {
    getStatusBarControlById(id: string): {
      update(options: { isActive: boolean }): void;
    } | null;
  },
  context?: unknown
): [CatalogQueryOptions, PanelHandlers, string];