/**
 * Catalog API Manager Module
 * Provides methods for searching and retrieving catalog data including topics, categories, activities, and products.
 */

/**
 * Search parameters for topic list queries
 */
export interface SearchTopicListParams {
  /** Search query string */
  query?: string;
  /** Page number for pagination */
  page?: number;
  /** Number of items per page */
  pageSize?: number;
  [key: string]: unknown;
}

/**
 * Parameters for retrieving activity categories
 */
export interface GetActivityCategoriesParams {
  /** Optional filter criteria */
  filter?: string;
  [key: string]: unknown;
}

/**
 * Activity category item structure
 */
export interface ActivityCategory {
  /** Category unique identifier */
  id: string;
  /** Category display name */
  name: string;
  /** Nested subcategories */
  categories: ActivityCategory[];
  [key: string]: unknown;
}

/**
 * Response structure for activity categories
 */
export interface ActivityCategoriesResponse {
  /** Result array containing category items */
  result: ActivityCategory[];
  [key: string]: unknown;
}

/**
 * Parameters for catalog pool retrieval
 */
export interface GetCatalogPoolParams {
  /** Catalog pool identifier */
  poolId?: string;
  [key: string]: unknown;
}

/**
 * Category type definition
 */
export interface CategoryType {
  /** Type identifier */
  id: string;
  /** Type name */
  name: string;
  [key: string]: unknown;
}

/**
 * Category structure with nested hierarchy
 */
export interface Category {
  /** Category unique identifier */
  id: string;
  /** Category name */
  name: string;
  /** Array of category types */
  categoryTypes?: CategoryType[];
  /** Nested subcategories */
  categories?: Category[];
  [key: string]: unknown;
}

/**
 * Catalog pool response structure
 */
export interface CatalogPoolResponse {
  /** Array of top-level categories */
  categories: Category[];
  [key: string]: unknown;
}

/**
 * Search parameters for product queries
 */
export interface SearchProductsParams {
  /** Search keyword */
  keyword?: string;
  /** Category filter */
  categoryId?: string;
  /** Price range filter */
  priceRange?: [number, number];
  /** Sort order */
  sortBy?: string;
  [key: string]: unknown;
}

/**
 * Search parameters for activity queries
 */
export interface SearchActivitiesParams {
  /** Search keyword */
  keyword?: string;
  /** Activity type filter */
  type?: string;
  /** Date range filter */
  dateRange?: [Date, Date];
  [key: string]: unknown;
}

/**
 * Search parameters for model topics
 */
export interface SearchModelTopicsParams {
  /** Model identifier */
  modelId?: string;
  /** Topic filter */
  topicType?: string;
  [key: string]: unknown;
}

/**
 * Parameters for paid package list retrieval
 */
export interface GetPaidPackageListParams {
  /** Package category */
  category?: string;
  /** User identifier */
  userId?: string;
  [key: string]: unknown;
}

/**
 * Data manager interface for handling API requests
 */
export interface DataManager {
  searchTopicList(params: SearchTopicListParams): Promise<unknown>;
  getActivityCategories(params: GetActivityCategoriesParams): Promise<ActivityCategoriesResponse>;
  getCatalogPool(params: GetCatalogPoolParams): Promise<CatalogPoolResponse>;
  searchProducts(params: SearchProductsParams): Promise<unknown>;
  searchActivities(params: SearchActivitiesParams): Promise<unknown>;
  searchModelTopics(params: SearchModelTopicsParams): Promise<unknown>;
  getPaidPackageList(params: GetPaidPackageListParams): Promise<unknown>;
}

/**
 * Catalog API Manager
 * Singleton class for managing catalog-related API operations
 */
export default class CatalogApiManager {
  /** Data manager instance for API operations */
  static dataManager: DataManager;

  /**
   * Search for topics based on provided parameters
   * @param params - Search parameters for topic list query
   * @returns Promise resolving to search results
   */
  static searchTopicList(params: SearchTopicListParams): Promise<unknown>;

  /**
   * Retrieve activity categories with initialized subcategory arrays
   * @param params - Parameters for category retrieval
   * @returns Promise resolving to formatted activity categories
   */
  static getActivityCategories(params: GetActivityCategoriesParams): Promise<ActivityCategory[]>;

  /**
   * Get catalog pool with initialized category hierarchy
   * @param params - Catalog pool parameters
   * @returns Promise resolving to catalog pool with initialized categories
   */
  static getCategories(params: GetCatalogPoolParams): Promise<CatalogPoolResponse>;

  /**
   * Initialize category types recursively for nested categories
   * @param category - Category object to initialize
   */
  static initCategoryTypes(category: Category): void;

  /**
   * Search for products in the catalog
   * @param params - Product search parameters
   * @returns Promise resolving to product search results
   */
  static searchProducts(params: SearchProductsParams): Promise<unknown>;

  /**
   * Search for activities in the catalog
   * @param params - Activity search parameters
   * @returns Promise resolving to activity search results
   */
  static searchActivities(params: SearchActivitiesParams): Promise<unknown>;

  /**
   * Search for model-specific topics
   * @param params - Model topic search parameters
   * @returns Promise resolving to model topic results
   */
  static searchModelTopics(params: SearchModelTopicsParams): Promise<unknown>;

  /**
   * Retrieve list of paid packages
   * @param params - Paid package list parameters
   * @returns Promise resolving to paid package list
   */
  static getPaidPackageList(params: GetPaidPackageListParams): Promise<unknown>;
}