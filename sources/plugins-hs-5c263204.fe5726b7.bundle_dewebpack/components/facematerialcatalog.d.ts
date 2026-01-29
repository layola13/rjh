/**
 * Face material catalog management module
 * Provides catalog browsing, filtering and material replacement functionality
 */

import { HSCatalog } from './path/to/HSCatalog';

declare namespace HSApp {
  namespace Catalog {
    namespace DataConfig {
      /**
       * Menu identifier enumeration
       */
      enum MenuIdEnum {
        premiumModelLibrary = 'premiumModelLibrary',
        MaterialReplaceCategoryRoot = 'MaterialReplaceCategoryRoot',
        enterpriseModelLibrary = 'enterpriseModelLibrary',
        myModelLibrary = 'myModelLibrary'
      }

      /**
       * Tree structure identifier enumeration
       */
      enum TreeIdEnum {
        PremiumModelLibraryRoot = 'PremiumModelLibraryRoot',
        MaterialReplaceCategoryRoot = 'MaterialReplaceCategoryRoot',
        MyCategoryRoot = 'MyCategoryRoot'
      }

      /**
       * Scene type enumeration
       */
      enum SceneType {
        Material = 'Material'
      }
    }

    /**
     * Catalog manager interface
     */
    interface Manager {
      /**
       * Register environment context
       * @param environmentId - Active environment identifier
       */
      registerEnv(environmentId: string): void;

      /**
       * Set menu data structure
       * @param menuData - Menu configuration array
       */
      setMenuData(menuData: MenuDataItem[]): void;

      /**
       * Display catalog in specified container
       * @param container - DOM container element
       */
      showCatalog(container: HTMLElement | null): void;
    }
  }

  namespace App {
    interface Application {
      /** Active environment identifier */
      activeEnvironmentId: string;
    }

    /**
     * Get application instance
     */
    function getApp(): Application;
  }
}

declare namespace adskUser {
  /** Whether user belongs to enterprise account */
  const isEnterprise: boolean;
  /** Whether to hide team model library */
  const hideTeamModelLibrary: boolean;
}

declare namespace ResourceManager {
  /**
   * Get localized string by key
   * @param key - Resource key
   */
  function getString(key: string): string;
}

/**
 * Category tree filter configuration
 */
interface CategoryTreeFilter {
  /** Category types to include */
  include?: HSCatalog.CategoryTypeEnum;
  /** Category types to exclude */
  exclude?: HSCatalog.CategoryTypeEnum;
}

/**
 * Model search filter configuration
 */
interface ModelSearchFilter {
  /** Filter type identifier */
  filterType: string;
  /** List of category IDs to exclude */
  excludeCategoryIdList?: string[];
}

/**
 * Merchant search filter configuration
 */
interface MerchantSearchFilter {
  /** Filter type identifier */
  filterType: string;
}

/**
 * Basic filter configuration
 */
interface BasicFilter {
  /** Category types to exclude */
  exclude?: HSCatalog.CategoryTypeEnum;
}

/**
 * User-specific filter configuration
 */
interface MyFilter {
  /** Category tree filtering rules */
  categoryTreeFilter?: CategoryTreeFilter;
  /** Model search filtering rules */
  modelSearchFilter?: ModelSearchFilter;
  /** Merchant search filtering rules */
  merchantSearchFilter?: MerchantSearchFilter;
}

/**
 * Filter configuration result
 */
interface FilterConfig {
  /** Basic filter */
  filter: BasicFilter;
  /** User-specific filter */
  myFilter: MyFilter;
}

/**
 * Menu data item structure
 */
interface MenuDataItem {
  /** Menu icon identifier */
  icon: string;
  /** Menu display text */
  text: string;
  /** Submenu data */
  data: Array<{ id: string; name?: string }>;
  /** Menu unique identifier */
  id: string;
  /** Additional parameters */
  params?: {
    treeId: string;
  };
  /** Filter configuration */
  filters?: BasicFilter | MyFilter;
  /** Whether menu is selected */
  isSelected: boolean;
  /** Whether to disable category panel */
  disableCategoryPanel?: boolean;
  /** Whether menu is disabled */
  disable?: boolean;
}

/**
 * Face Material Catalog Manager
 * Manages material catalog display, filtering and replacement functionality
 */
export declare class FaceMaterialCatalog {
  /** Catalog manager instance */
  appCatalogManager: HSApp.Catalog.Manager;

  /** Menu configuration data */
  menuData: MenuDataItem[];

  /** Root DOM container element */
  rootContainer: HTMLElement | null;

  /** Menu identifier enumeration */
  readonly menuIdEnum: typeof HSApp.Catalog.DataConfig.MenuIdEnum;

  /** Tree identifier enumeration */
  readonly treeIdEnum: typeof HSApp.Catalog.DataConfig.TreeIdEnum;

  constructor();

  /**
   * Initialize catalog
   * Registers environment, builds menu data and displays catalog
   */
  init(): void;

  /**
   * Build menu data structure
   * Creates menu items for premium library, old library, enterprise library and user library
   */
  buildMenuData(): void;

  /**
   * Build filter configuration
   * @returns Filter configuration for basic and user-specific filtering
   */
  buildFilters(): FilterConfig;
}