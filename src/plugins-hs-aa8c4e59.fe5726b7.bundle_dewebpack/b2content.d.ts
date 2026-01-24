import { B2Processor } from './B2Processor';
import { backendCatalogHelper } from './backendCatalogHelper';
import { categoryHandle } from './categoryHandle';
import { 
  turnNumberArrayToSize, 
  isGlobal, 
  dollarTransfer, 
  addEntityContentToElement,
  contentTypeIsTypeOf,
  setObjectParameterValues 
} from './utils';
import { resourceManager } from './resourceManager';

/**
 * Category information for content items
 */
export interface Category {
  /** Unique identifier for the category */
  seekId: string;
  /** Type classification of the category */
  categoryType: string;
  /** Display name shown to users */
  displayName: string;
  /** Brand name */
  brand: string;
  /** Brand identifier */
  brandId: string;
  /** Price value */
  price: number;
  /** URL to texture/image resource */
  textureUrl: string;
  /** Size array [width, height, depth] */
  size: number[];
  /** Unique category ID */
  id?: string;
  /** Category nickname */
  nickName?: string;
  /** Category name */
  name?: string;
}

/**
 * Source information for entities
 */
export interface EntitySource {
  /** Assembly seek identifier */
  assemblySeekId?: string;
}

/**
 * Type information for entities
 */
export interface EntityType {
  /** Content type identifier (e.g., "ceiling", "platform", "feature wall") */
  contentType: string;
}

/**
 * Base entity interface representing content items
 */
export interface Entity {
  /** Category information */
  category: Category;
  /** Source information */
  source?: EntitySource;
  /** Entity type */
  type: EntityType;
  
  /**
   * Get parameter value by key
   * @param key - Parameter key name
   * @returns Parameter value or undefined
   */
  getParameterValue(key: string): unknown;
}

/**
 * Context containing all content collections
 */
export interface B2Context {
  /** Normal content items */
  contents: Entity[];
  /** Opening content items (doors, windows) */
  openings: Entity[];
  /** Customized entities */
  customizedEntities: Entity[];
  /** Customization PM entities */
  customizationPMEntities: Entity[];
}

/**
 * Built content data structure for BOM2
 */
export interface ContentData {
  /** Unique identifier */
  seekId: string;
  /** Category type name */
  categoryType: string;
  /** Category identifier */
  category: string;
  /** Image URL */
  image?: string;
  /** Size string representation */
  size: string;
  /** List of real size strings */
  realSizeList?: string[];
  /** Display name */
  name: string;
  /** Brand name */
  brand: string;
  /** Brand identifier */
  brandId: string;
  /** Price (converted for global market if needed) */
  price: number;
  /** Quantity */
  count: number;
  /** Room identifier */
  roomId: unknown;
  /** Measurement unit */
  unit: string;
  /** Category type identifier */
  categoryTypeId?: string;
  /** Image type for customized items */
  imageType?: 'customizedCeiling' | 'customizedPlatform' | 'customizedWall' | 'swimPool';
  /** Whether belongs to two rooms (for openings) */
  isBelongTwoRooms?: boolean;
}

/**
 * B2Content processor for building BOM2 content data
 * Extends B2Processor to handle various entity types and convert them to standardized content data
 */
export declare class B2Content extends B2Processor {
  /** Context containing all content collections */
  context: B2Context;

  /**
   * Build complete BOM2 data from all content sources
   * Processes normal contents, openings, customized entities, and PM entities
   * @returns Array of content data objects
   */
  buildBom2Data(): ContentData[];

  /**
   * Build content data for normal entities
   * Extracts and transforms entity parameters into standardized content format
   * @param entity - Source entity to process
   * @returns Content data object or undefined if processing fails
   */
  buildNormalContentData(entity: Entity): ContentData | undefined;

  /**
   * Build content data for customized entities
   * Handles special cases like custom ceilings, platforms, and background walls
   * @param entity - Customized entity to process
   * @returns Content data object with customization metadata or undefined
   */
  buildCustomizedContentData(entity: Entity): ContentData | undefined;

  /**
   * Build content data for opening entities (doors, windows)
   * Includes additional room relationship information
   * @param entity - Opening entity to process
   * @returns Content data object with room relationship data or undefined
   */
  buildOpeningContentData(entity: Entity): ContentData | undefined;
}