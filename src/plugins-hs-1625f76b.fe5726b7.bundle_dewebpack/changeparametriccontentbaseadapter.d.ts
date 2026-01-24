/**
 * Adapter for changing parametric content base properties
 * Handles profile and material type changes in the catalog system
 */

import { HSCatalog } from './HSCatalog';
import { HSApp } from './HSApp';
import { HSFPConstants } from './HSFPConstants';

/**
 * Property panel content type enumeration
 */
export const EN_PROPERTY_PANEL_WIN_SUB_PART_TYPE: string;
export const EN_PROPERTY_PANEL_CONTENT_TYPE: string;

/**
 * Node representing a property change in the parametric content
 */
export interface PropertyNode {
  /** Type of the property (PROFILE, MATERIIAL, etc.) */
  type: 'PROFILE' | 'MATERIIAL' | string;
  /** Current value/seekId of the property */
  value: string;
}

/**
 * Configuration options for the content adapter
 */
export interface ContentAdapterOptions {
  /** Scene type identifier */
  sceneType: string;
  /** Parent model identifier */
  parentModelId?: string;
  /** Element identifier */
  eId?: string;
  /** Category identifier */
  categoryId?: string;
  /** Function to get front category ID */
  getFrontCategoryId?: () => string;
  /** Custom tab configurations */
  customizedTabs?: unknown[];
}

/**
 * Query parameters for catalog search
 */
export interface CatalogQuery {
  /** Category identifier to search within */
  categoryId?: string;
  /** Seek identifier for specific product */
  seekId: string;
}

/**
 * Model search filter configuration
 */
export interface ModelSearchFilter {
  /** Scene type for filtering models */
  sceneType: string;
}

/**
 * Internal data structure for catalog configuration
 */
export interface CatalogMyData {
  /** Array of category types to include */
  types?: HSCatalog.CategoryTypeEnum[];
  /** Filter configuration for model search */
  modelSearchFilter: ModelSearchFilter;
}

/**
 * Catalog configuration object
 */
export interface CatalogConfig {
  /** Category types to filter */
  types?: HSCatalog.CategoryTypeEnum[];
  /** Scene type for the catalog */
  sceneType: string;
  /** Internal data configuration */
  mydata: CatalogMyData;
  /** Customer-specific categories */
  customerCategories?: string[];
  /** Query parameters for catalog search */
  query: CatalogQuery;
  /** Whether to skip filtering */
  notFilter?: boolean;
  /** Parent model identifier */
  parentModelId?: string;
  /** Element identifier */
  eId?: string;
  /** Function to get front category ID */
  getFrontCategoryId?: () => string;
  /** Custom tab configurations */
  customizedTabs?: unknown[];
}

/**
 * Value change event data
 */
export interface ValueChangeData {
  /** The property node being changed */
  node: PropertyNode;
  /** New value to be applied */
  newValue: string;
}

/**
 * Transaction manager for handling requests
 */
export interface TransactionManager {
  /**
   * Create a new request
   * @param requestType - Type of the request
   * @param params - Request parameters
   */
  createRequest(requestType: string, params: unknown[]): TransactionRequest;
  
  /**
   * Commit a transaction request
   * @param request - Request to commit
   */
  commit(request: TransactionRequest): void;
}

/**
 * Transaction request object
 */
export interface TransactionRequest {
  /**
   * Receive handler for value changes
   * @param eventName - Name of the event
   * @param data - Event data
   */
  receive(eventName: string, data: ValueChangeData): void;
}

/**
 * Product information from catalog
 */
export interface Product {
  /** Seek identifier */
  seekId: string;
  /** Array of category identifiers */
  categories: string[];
}

/**
 * Context for product selection
 */
export interface ProductSelectionContext {
  /** Transaction manager instance */
  transManager: TransactionManager;
}

/**
 * Event handlers for the adapter
 */
export interface AdapterHandlers {
  /**
   * Handler called when a product is selected
   * @param product - Selected product information
   * @param context - Selection context with transaction manager
   */
  productSelectedHandler(product: Product, context: ProductSelectionContext): Promise<void>;
}

/**
 * Return type for the adapter function
 * Tuple of [config, handlers] or [config, handlers, categoryId]
 */
export type AdapterResult = 
  | [CatalogConfig, AdapterHandlers]
  | [CatalogConfig, AdapterHandlers, string];

/**
 * Input parameters for the adapter
 * Tuple of [elementId, propertyNode, options]
 */
export type AdapterInput = [string, PropertyNode, ContentAdapterOptions];

/**
 * Changes parametric content base properties based on input parameters
 * Handles both profile and material type changes with appropriate catalog configurations
 * 
 * @param input - Tuple containing element ID, property node, and adapter options
 * @returns Configuration, handlers, and optionally a category ID for material types
 * 
 * @example
 *