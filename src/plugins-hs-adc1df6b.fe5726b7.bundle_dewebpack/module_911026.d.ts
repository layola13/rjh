/**
 * Adapter for changing parametric stair materials
 * Handles material selection and replacement for stair components
 */

import { HSCatalog } from './catalog';
import { replaceMaterial } from './material-utils';

/**
 * Interface representing stair material data
 */
interface MaterialData {
  /** Unique identifier for seeking/locating the material */
  seekId: string;
}

/**
 * Parameters for parametric stair configuration
 */
interface StairParameters {
  /** Material data associated with the stair */
  materialData?: MaterialData;
}

/**
 * Represents a parametric stair model
 */
interface ParametricStair {
  /** Configuration parameters for the stair */
  parameters?: StairParameters;
  
  /**
   * Gets face IDs filtered by part type
   * @param partType - The type of stair part (e.g., tread, riser)
   * @returns Array of face identifiers
   */
  getFaceIdsByPartType(partType: string): string[];
}

/**
 * Represents a stair part selection
 */
interface StairPart {
  /** Type of the stair part being modified */
  part?: string;
}

/**
 * Application context with signal dispatch capability
 */
interface AppContext {
  /** Signal to refresh the property bar UI */
  signalPropertyBarRefresh: {
    dispatch(): void;
  };
}

/**
 * Catalog query parameters
 */
interface CatalogQuery {
  /** Category identifier for material lookup */
  categoryId: string;
  /** Seek identifier for specific material */
  seekId: string;
}

/**
 * Model search filter configuration
 */
interface ModelSearchFilter {
  /** Type of scene to search within */
  sceneType: number;
}

/**
 * Custom data for catalog search
 */
interface CatalogCustomData {
  /** Filter criteria for model searching */
  modelSearchFilter: ModelSearchFilter;
}

/**
 * Filter definition for catalog options
 */
interface CatalogOptionFilter {
  /** Type of category filter */
  categoryType: HSCatalog.CategoryTypeEnum;
  /** Key-value pairs for filter criteria */
  filters: Record<string, string>;
}

/**
 * Configuration for catalog material selection
 */
interface CatalogConfig {
  /** Whether to disable default filtering */
  notFilter: boolean;
  /** Array of customer category identifiers */
  customerCategories: string[];
  /** Type of scene (material, model, etc.) */
  sceneType: number;
  /** Custom search and filter data */
  mydata: CatalogCustomData;
  /** Optional query parameters for specific material lookup */
  query?: CatalogQuery;
  /** Optional advanced filtering options */
  optionFilters?: CatalogOptionFilter[];
}

/**
 * Handler for product selection events
 */
interface ProductSelectionHandler {
  /**
   * Callback when a product is selected from catalog
   * @param product - The selected product/material
   * @param context - Application context
   */
  productSelectedHandler(product: unknown, context: AppContext): void;
}

/**
 * Input parameter for the adapter function
 * Tuple containing the stair model and optional part selection
 */
type AdapterInput = [ParametricStair, StairPart?] | ParametricStair[];

/**
 * Return type of the adapter function
 * Tuple containing catalog config, selection handler, and category UUID
 */
type AdapterOutput = [CatalogConfig, ProductSelectionHandler, string];

/**
 * Adapter function for changing parametric stair materials
 * 
 * Creates a catalog configuration for material selection and handles
 * the replacement of materials on specific stair parts.
 * 
 * @param input - Stair model(s) and optional part selection
 * @returns Tuple of [catalog config, selection handler, category ID]
 * 
 * @example
 *