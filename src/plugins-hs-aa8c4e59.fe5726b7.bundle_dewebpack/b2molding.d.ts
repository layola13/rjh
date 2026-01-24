import { B2Processor } from './B2Processor';
import { backendCatalogHelper } from './backendCatalogHelper';
import { PocketPredicate } from './PocketPredicate';
import { resourceManager } from './resourceManager';
import { 
  turnNumberArrayToSize, 
  isGlobal, 
  dollarTransfer, 
  addEntityContentToElement 
} from './utils';

/**
 * Filter options for BOM data building
 */
export interface FilterOptions {
  /** Whether to perform a hard load of all molding data */
  hardload?: boolean;
}

/**
 * Options for building BOM2 data
 */
export interface BuildBom2Options {
  /** Optional filter options to control data loading behavior */
  filterOptions?: FilterOptions;
}

/**
 * Category information for a molding element
 */
export interface MoldingCategory {
  /** Unique identifier in the catalog */
  seekId: string;
  /** Type classification of the category */
  categoryType: string;
  /** URL to the texture image */
  textureUrl: string;
  /** Human-readable display name */
  displayName: string;
  /** Dimensions as a number array */
  size: number[];
  /** Brand name */
  brand: string;
  /** Unique brand identifier */
  brandId: string;
  /** Price in the original currency */
  price: number;
}

/**
 * Molding element with category and parameter access
 */
export interface MoldingElement {
  /** Category metadata for this molding */
  category: MoldingCategory;
  /**
   * Get a parameter value by key
   * @param key - Parameter identifier
   * @returns The parameter value or undefined if not found
   */
  getParameterValue(key: string): unknown;
  /**
   * Get the parent element in the hierarchy
   * @returns Parent element or undefined if root
   */
  getParent(): MoldingElement | undefined;
}

/**
 * Opening element containing child elements
 */
export interface OpeningElement {
  /** Collection of child elements */
  children: unknown[];
}

/**
 * Database API for querying elements
 */
export interface DbApi {
  /**
   * Find all elements matching a predicate
   * @param elements - Collection to search
   * @param predicate - Filter condition
   * @returns Matching elements
   */
  findAll(elements: unknown[], predicate: PocketPredicate): MoldingElement[];
}

/**
 * Context providing access to moldings and openings data
 */
export interface B2MoldingContext {
  /** Collection of all molding elements */
  moldings: MoldingElement[];
  /** Collection of all opening elements */
  openings: OpeningElement[];
  /** Database API for querying elements */
  dbApi: DbApi;
}

/**
 * Structured molding data for BOM output
 */
export interface MoldingData {
  /** Catalog seek identifier */
  seekId: string;
  /** Human-readable category type name */
  categoryType: string;
  /** Validated category type code */
  category: string;
  /** Texture image URL */
  image: string;
  /** Display name */
  name: string;
  /** Formatted size string */
  size: string;
  /** Associated room identifier */
  roomId?: unknown;
  /** Brand name */
  brand: string;
  /** Brand identifier */
  brandId: string;
  /** Price (converted to dollars if global context) */
  price: number;
  /** Length measurement */
  count: unknown;
  /** Unit of measurement label */
  unit: string;
  /** Type of unit (e.g., "length") */
  unitTypeStr: string;
}

/**
 * B2Molding processor for building Bill of Materials (BOM) data
 * 
 * Processes molding elements from the context and generates structured
 * BOM data including pricing, measurements, and categorization.
 */
export declare class B2Molding extends B2Processor {
  /** Context containing moldings and openings data */
  protected context: B2MoldingContext;

  /**
   * Build BOM2 data from moldings and pocket openings
   * 
   * @param options - Configuration options for data building
   * @returns Array of molding data entries, or empty array if hardload is disabled
   * 
   * @remarks
   * Only processes data when `options.filterOptions.hardload` is true.
   * Collects data from:
   * - All moldings in context.moldings
   * - Pocket elements within all openings
   */
  buildBom2Data(options?: BuildBom2Options): MoldingData[];

  /**
   * Build structured data for a single molding element
   * 
   * @param element - The molding element to process
   * @returns Structured molding data with pricing, dimensions, and metadata
   * 
   * @remarks
   * - Extracts roomId from element or parent if not directly available
   * - Converts price to dollars if in global context
   * - Validates and normalizes category type
   * - Adds entity content metadata to the element
   */
  buildMoldingData(element: MoldingElement): MoldingData;
}