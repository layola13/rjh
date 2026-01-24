/**
 * UI module for managing application catalog configurations
 * Original Module ID: 708888
 */

/**
 * Application Catalog Manager interface
 * Manages category configurations and product listings
 */
interface AppCatalogManager {
  /**
   * Register a custom configuration for a specific category
   * @param categoryId - The unique identifier for the category
   * @param config - The configuration object for the category
   */
  registerCategoryConfig(categoryId: string, config: CategoryConfig): void;
}

/**
 * Configuration options for a catalog category
 */
interface CategoryConfig {
  /** React element to render for the product list */
  productListNode: React.ReactElement;
  /** Whether search functionality should be disabled */
  disabledSearch: boolean;
}

/**
 * Global HSApp configuration interface
 */
interface HSAppConfig {
  /** Current tenant identifier */
  TENANT: string;
}

/**
 * Global HSApp namespace
 */
interface HSApp {
  Config: HSAppConfig;
}

declare global {
  const HSApp: HSApp;
}

/**
 * UI class for managing application UI components and catalog configurations
 */
export declare class UI {
  /** Instance of the application catalog manager */
  appCatalogManager?: AppCatalogManager;

  /**
   * Initialize the UI with an application catalog manager
   * Registers category configurations based on tenant settings
   * @param appCatalogManager - The catalog manager instance to use
   */
  init(appCatalogManager: AppCatalogManager): void;
}