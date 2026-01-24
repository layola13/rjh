/**
 * Category management module for handling product categories and back-categories.
 * Provides functionality for matching entities to categories and managing category hierarchies.
 * @module CategoryHandle
 */

/**
 * Configuration for a single category item
 */
export interface CategoryConfig {
  /** Unique identifier for the category */
  id: string;
  /** Child categories */
  categories: CategoryItem[];
}

/**
 * Category item with back-category mappings
 */
export interface CategoryItem {
  /** Unique identifier for the category item */
  id: string;
  /** Nested child categories */
  categories: CategoryItem[];
  /** Back-categories associated with this category */
  backCategories: BackCategoryItem[];
}

/**
 * Back-category item
 */
export interface BackCategoryItem {
  /** Unique identifier for the back-category */
  id: string;
}

/**
 * Entity with category information
 */
export interface CategoryEntity {
  /** Category metadata */
  category?: {
    /** Type identifier for the category */
    categoryType?: string | string[];
  };
}

/**
 * Mapping result for back-category to category
 */
export interface BackCategoryMapping {
  /** The mapped category */
  category: CategoryItem;
}

/**
 * Mapping result for category with parent information
 */
export interface CategoryMapping {
  /** Parent category configuration */
  parent: CategoryConfig;
  /** The category item */
  category: CategoryItem;
  /** Index position within parent's categories array */
  index: number;
}

/**
 * Category name mapping results
 */
export interface CategoryNameMaps {
  /** Map from back-category ID to category mapping */
  backCategoryMap: Map<string, BackCategoryMapping>;
  /** Map from category ID to full category mapping with parent info */
  categoryMap: Map<string, CategoryMapping>;
}

/**
 * Catalog tree structure from API
 */
export interface CatalogTree {
  /** Root level category items */
  items?: CategoryItem[];
  /** Legacy: direct array of categories (when items is not present) */
  categories?: CategoryItem[];
}

/**
 * Pattern matching configuration for code-based category detection
 */
export interface MatchPattern {
  /** Unique identifier for the match pattern */
  id: string;
  /** Test if the entity matches this pattern */
  match(entity: CategoryEntity): boolean;
}

/**
 * Code-based category matcher using pattern matching
 * @internal
 */
export declare class CodeMatchCategory {
  /** List of registered match patterns */
  matchList: MatchPattern[];

  constructor();

  /**
   * Find matching category ID for an entity
   * @param entity - Entity to match against patterns
   * @returns Matched category ID or undefined
   */
  match(entity: CategoryEntity): string | undefined;
}

/**
 * Main category handler for managing product categories and their relationships
 */
export declare class CategoryHandle {
  /** Map of back-catalog tree paths (category ID -> ancestor path) */
  private backCatalogTreeMap: Map<string, string[]>;
  
  /** Map of back-category IDs to category mappings */
  private backCategoryMap: Map<string, BackCategoryMapping>;
  
  /** Map of category IDs to full category mappings */
  private categoryMap: Map<string, CategoryMapping>;
  
  /** Complete category configuration loaded from server */
  private categoryConfig: CategoryConfig[] | undefined;
  
  /** Code-based category matcher instance */
  private codeMatchCategory: CodeMatchCategory;

  constructor();

  /**
   * Initialize the category handle with catalog and configuration data
   * @param catalogTree - Category tree structure
   * @param configUrl - Base URL for fetching category configuration
   * @param language - Language code for localized configuration
   * @returns Promise that resolves when initialization is complete
   */
  init(catalogTree: CatalogTree, configUrl: string, language: string): Promise<void>;

  /**
   * Get the URL for category JSON configuration based on language
   * @param language - Language code (e.g., 'en', 'zh')
   * @returns Formatted URL string or undefined
   */
  getCategoryJonsUrl(language: string): string | undefined;

  /**
   * Initialize internal category tree maps
   * @param catalogTree - Category tree structure
   * @param configUrl - Base URL for configuration
   * @param language - Language code
   * @returns Promise that resolves when maps are initialized
   */
  private initCategoryTreeMap(
    catalogTree: CatalogTree,
    configUrl: string,
    language: string
  ): Promise<void>;

  /**
   * Fetch category configuration from remote server
   * @param configUrl - Base URL for configuration
   * @param language - Language code
   * @returns Promise resolving to category configuration array
   */
  private fetchCategoryConfig(configUrl: string, language: string): Promise<CategoryConfig[]>;

  /**
   * Build maps from category configuration
   * @param config - Category configuration array
   * @returns Object containing back-category and category maps
   */
  private categoryToNameMap(config: CategoryConfig[]): CategoryNameMaps;

  /**
   * Get the complete category configuration
   * @returns Category configuration array or undefined
   */
  getCategoryConfig(): CategoryConfig[] | undefined;

  /**
   * Get the category mapping
   * @returns Map of category IDs to category mappings
   */
  getCategoryMap(): Map<string, CategoryMapping>;

  /**
   * Validate and find the first valid back-category ID
   * @param categoryId - Single category ID or array of IDs
   * @returns First valid back-category ID or undefined
   */
  getValidBackCategoryId(categoryId: string | string[]): string | undefined;

  /**
   * Get BOM category from back-category ID by traversing hierarchy
   * @param backCategoryId - Back-category identifier
   * @returns Matched category item or undefined
   */
  getBackCategoryBomCategory(backCategoryId: string): CategoryItem | undefined;

  /**
   * Get category from entity using category type or code matching
   * @param entity - Entity with category information
   * @returns Matched category item or undefined
   */
  getCategoryByEntity(entity: CategoryEntity): CategoryItem | undefined;

  /**
   * Get category by back-category ID
   * @param categoryId - Back-category ID (string or array)
   * @returns Matched category item or undefined
   */
  getCategory(categoryId: string | string[]): CategoryItem | undefined;

  /**
   * Get parent category group configuration
   * @param categoryId - Back-category ID (string or array)
   * @returns Parent category configuration or undefined
   */
  getCategoryGroup(categoryId: string | string[]): CategoryConfig | undefined;

  /**
   * Get parent category group by direct category ID
   * @param categoryId - Direct category ID
   * @returns Parent category configuration or undefined
   */
  getCategoryGroupByCategoryId(categoryId: string): CategoryConfig | undefined;
}

/**
 * Singleton instance of CategoryHandle for global use
 */
export declare const categoryHandle: CategoryHandle;