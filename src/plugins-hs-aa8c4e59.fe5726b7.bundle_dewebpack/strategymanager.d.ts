/**
 * Strategy Manager for handling various content strategies
 * including soft content, customization, DIY, mixed paint, and ceiling strategies
 */

/**
 * Category enum for single select operations
 */
export enum ENUM_SINGLE_SELECT_CATEGORY {
  Face = 'Face',
  Ceiling = 'Ceiling'
}

/**
 * Template room data structure
 */
export interface Room {
  [key: string]: unknown;
}

/**
 * Template data structure containing room information
 */
export interface TemplateData {
  room: Room[];
  [key: string]: unknown;
}

/**
 * Result of entity ID retrieval with optional metadata
 */
export interface FlatEntityIdsResult {
  flatEntityIds: string[];
  reason?: string;
  category?: ENUM_SINGLE_SELECT_CATEGORY;
}

/**
 * Parameters for getting flat entity IDs by strategies
 */
export interface GetFlatEntityIdsParams {
  instanceId: string;
  strategies: Strategy[];
  room: Room;
}

/**
 * Parameters for strategy-based entity ID retrieval
 */
export interface GetFlatEntityIdsAndCategoryByStrategiesParams {
  templateData: TemplateData;
  strategies: Strategy[];
  instanceId: string;
}

/**
 * Cached data structure for entity IDs
 */
export interface TempCacheItem {
  flatEntityIds: string[];
  reason?: string;
  category?: ENUM_SINGLE_SELECT_CATEGORY;
}

/**
 * Version-specific data storage
 */
export interface VersionData {
  templateDataUrl: string;
  templateData: TemplateData;
  [key: string]: unknown;
}

/**
 * Base strategy interface that all concrete strategies must implement
 */
export interface Strategy {
  /**
   * Retrieves flat entity IDs and category based on strategy logic
   */
  getFlatEntityIdsAndCategory(params: GetFlatEntityIdsParams): FlatEntityIdsResult;
}

/**
 * Result object for getFlatEntityIds method
 */
export interface GetFlatEntityIdsResult {
  ids: string[];
  reason?: string;
}

/**
 * Parameters for adding data to the manager
 */
export interface AddDataParams {
  type: string;
  importData: unknown;
  version: string;
}

/**
 * StrategyManager manages multiple content strategies and handles
 * entity ID retrieval, caching, and version-specific data management
 */
export declare class StrategyManager {
  /**
   * Array of registered strategies
   * @private
   */
  private _arr: Strategy[];

  /**
   * Storage for version-specific template data
   * @private
   */
  private _dataByVersion: Record<string, VersionData>;

  /**
   * Temporary cache for entity IDs by instance
   * @private
   */
  private _tempCache: Record<string, TempCacheItem>;

  /**
   * Initializes the StrategyManager with default strategies
   */
  constructor();

  /**
   * Initializes all default strategies (Soft Content, Customize, DIY, Mix Paint, Ceiling)
   * @private
   */
  private _init(): void;

  /**
   * Loads and caches template data for a specific version
   * @param templateDataUrl - URL of the template data
   * @param version - Version identifier
   * @returns Promise that resolves when data is loaded
   */
  initData(templateDataUrl: string, version: string): Promise<void>;

  /**
   * Clears all cached version data and temporary cache
   */
  deleteData(): void;

  /**
   * Retrieves cached data for a specific version
   * @param version - Version identifier
   * @returns Version data or undefined if not found
   */
  getData(version: string): VersionData | undefined;

  /**
   * Adds or updates data for a specific version
   * @param params - Data parameters including type, importData, and version
   */
  addData(params: AddDataParams): void;

  /**
   * Retrieves all flat entity IDs for a given instance
   * @param instanceId - Instance identifier
   * @param version - Version identifier
   * @returns Object containing entity IDs and optional reason
   */
  getFlatEntityIds(instanceId: string, version: string): GetFlatEntityIdsResult;

  /**
   * Checks if the given entity IDs are restricted to single selection
   * @param entityIds - Array of entity IDs to check
   * @returns True if only one entity can be selected
   */
  isOnlyCanSelectOne(entityIds: string[]): boolean;

  /**
   * Retrieves flat entity IDs and category using all registered strategies
   * @param params - Parameters including template data, strategies, and instance ID
   * @returns Result with flat entity IDs, optional reason and category
   * @private
   */
  private _getFlatEntityIdsAndCategoryByStrategies(
    params: GetFlatEntityIdsAndCategoryByStrategiesParams
  ): FlatEntityIdsResult;

  /**
   * Retrieves entity IDs from cache for a given instance
   * @param params - Parameters containing temp cache and instance ID
   * @returns Array of cached entity IDs
   * @private
   */
  private _getIdsFromCache(params: {
    tempCache: Record<string, TempCacheItem>;
    instanceId: string;
  }): string[];
}