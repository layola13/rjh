/**
 * Module: module_916482
 * Original ID: 916482
 * 
 * Catalog API Manager - Manages catalog-related data operations including
 * topics, activities, categories, products, and paid packages.
 */

/**
 * Search parameters for topic list queries
 */
export interface SearchTopicListParams {
  /** Search keyword or query string */
  keyword?: string;
  /** Page number for pagination */
  page?: number;
  /** Number of items per page */
  pageSize?: number;
  [key: string]: unknown;
}

/**
 * Parameters for fetching activity categories
 */
export interface GetActivityCategoriesParams {
  /** Activity type identifier */
  activityType?: string;
  /** Additional filter criteria */
  filters?: Record<string, unknown>;
  [key: string]: unknown;
}

/**
 * Category data structure with nested categories
 */
export interface Category {
  /** Unique category identifier */
  id: string;
  /** Category display name */
  name: string;
  /** Nested subcategories */
  categories: Category[];
  /** Category types metadata */
  categoryTypes?: CategoryType[];
  [key: string]: unknown;
}

/**
 * Category type metadata
 */
export interface CategoryType {
  /** Type identifier */
  id: string;
  /** Type name */
  name: string;
  [key: string]: unknown;
}

/**
 * Activity categories response structure
 */
export interface ActivityCategoriesResult {
  /** Result data containing categories */
  result: Category[];
}

/**
 * Parameters for retrieving catalog pool
 */
export interface GetCatalogPoolParams {
  /** Catalog pool identifier */
  poolId?: string;
  [key: string]: unknown;
}

/**
 * Catalog pool response structure
 */
export interface CatalogPoolResult {
  /** List of categories in the catalog */
  categories: Category[];
  [key: string]: unknown;
}

/**
 * Product search parameters
 */
export interface SearchProductsParams {
  /** Product search keyword */
  keyword?: string;
  /** Category filter */
  categoryId?: string;
  /** Price range filters */
  priceRange?: { min?: number; max?: number };
  [key: string]: unknown;
}

/**
 * Activity search parameters
 */
export interface SearchActivitiesParams {
  /** Activity search keyword */
  keyword?: string;
  /** Activity status filter */
  status?: string;
  /** Date range filters */
  dateRange?: { start?: string; end?: string };
  [key: string]: unknown;
}

/**
 * Model topics search parameters
 */
export interface SearchModelTopicsParams {
  /** Model identifier */
  modelId?: string;
  /** Topic category */
  category?: string;
  [key: string]: unknown;
}

/**
 * Paid package list parameters
 */
export interface GetPaidPackageListParams {
  /** Package type filter */
  packageType?: string;
  /** Pricing tier */
  tier?: string;
  [key: string]: unknown;
}

/**
 * Data Manager interface defining all data operations
 */
export interface IDataManager {
  searchTopicList(params: SearchTopicListParams): Promise<unknown>;
  getActivityCategories(params: GetActivityCategoriesParams): Promise<ActivityCategoriesResult>;
  getCatalogPool(params: GetCatalogPoolParams): Promise<CatalogPoolResult>;
  searchProducts(params: SearchProductsParams): Promise<unknown>;
  searchActivities(params: SearchActivitiesParams): Promise<unknown>;
  searchModelTopics(params: SearchModelTopicsParams): Promise<unknown>;
  getPaidPackageList(params: GetPaidPackageListParams): Promise<unknown>;
}

/**
 * Catalog API Manager class
 * Provides methods for managing catalog data including topics, categories,
 * products, activities, and paid packages.
 */
export default class CatalogApiManager {
  /**
   * Data manager instance handling all data operations
   */
  static dataManager: IDataManager;

  /**
   * Search for topics based on provided parameters
   * @param params - Search parameters for topic list
   * @returns Promise resolving to topic search results
   */
  static searchTopicList(params: SearchTopicListParams): Promise<unknown> {
    return this.dataManager.searchTopicList(params);
  }

  /**
   * Retrieve activity categories and initialize their structure
   * @param params - Parameters for fetching activity categories
   * @returns Promise resolving to activity categories with initialized empty categories array
   */
  static getActivityCategories(params: GetActivityCategoriesParams): Promise<Category[]> {
    return this.dataManager.getActivityCategories(params).then((response) => {
      return response.result.map((category) => {
        category.categories = [];
        return category;
      });
    });
  }

  /**
   * Get catalog pool and initialize category types recursively
   * @param params - Catalog pool query parameters
   * @returns Promise resolving to catalog pool with initialized category types
   */
  static getCategories(params: GetCatalogPoolParams): Promise<CatalogPoolResult> {
    return this.dataManager.getCatalogPool(params).then((catalogPool) => {
      catalogPool.categories.forEach((category) => {
        if (category.categories?.length > 0) {
          category.categories.forEach((subCategory) => {
            this.initCategoryTypes(subCategory);
          });
        }
      });
      return catalogPool;
    });
  }

  /**
   * Recursively initialize category types for a category and its subcategories
   * @param category - Category to initialize
   */
  static initCategoryTypes(category: Category): void {
    category.categoryTypes = [];
    const subCategories = category.categories;
    
    subCategories?.forEach((subCategory) => {
      this.initCategoryTypes(subCategory);
    });
  }

  /**
   * Search for products using the base API manager
   * @param params - Product search parameters
   * @returns Promise resolving to product search results
   */
  static searchProducts(params: SearchProductsParams): Promise<unknown> {
    return HSApp.Catalog.BaseApiManager.getInstance().dataManager.searchProducts(params);
  }

  /**
   * Search for activities using the base API manager
   * @param params - Activity search parameters
   * @returns Promise resolving to activity search results
   */
  static searchActivities(params: SearchActivitiesParams): Promise<unknown> {
    return HSApp.Catalog.BaseApiManager.getInstance().dataManager.searchActivities(params);
  }

  /**
   * Search for model topics
   * @param params - Model topics search parameters
   * @returns Promise resolving to model topics search results
   */
  static searchModelTopics(params: SearchModelTopicsParams): Promise<unknown> {
    return this.dataManager.searchModelTopics(params);
  }

  /**
   * Retrieve list of paid packages
   * @param params - Paid package list query parameters
   * @returns Promise resolving to paid package list
   */
  static getPaidPackageList(params: GetPaidPackageListParams): Promise<unknown> {
    return this.dataManager.getPaidPackageList(params);
  }
}

/**
 * Global HSApp namespace extension
 */
declare global {
  namespace HSApp {
    namespace Catalog {
      interface BaseApiManager {
        dataManager: IDataManager;
      }
      
      const BaseApiManager: {
        getInstance(): BaseApiManager;
      };
    }
  }
}