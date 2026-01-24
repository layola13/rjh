/**
 * Merchant page controller module
 * Manages merchant landing page, shop list, and product catalog navigation
 * @module MerchantPageController
 */

import type React from 'react';

/**
 * Page type constants for merchant-related pages
 */
export declare enum MerchantPageType {
  /** Landing page showing merchant groups */
  MERCHANT_LANDING_PAGE = 'MERCHANT_LANDING_PAGE',
  /** Shop list page */
  SHOP_LIST_PAGE = 'SHOP_LIST_PAGE',
  /** Product catalog page */
  PRODUCT_PAGE = 'PRODUCT_PAGE'
}

/**
 * Configuration for catalog search and display
 */
export interface CatalogConfig {
  /** Comma-separated list of category IDs */
  categoriesIds: string;
  /** Shop/merchant ID */
  shopId: string;
  /** Pagination offset */
  offset: number;
  /** Number of items per page */
  limit: number;
}

/**
 * Category item in catalog structure
 */
export interface CatalogCategory {
  /** Unique category identifier */
  id: string;
  /** Category name */
  name?: string;
  /** Nested subcategories */
  children?: CatalogCategory[];
}

/**
 * Catalog data structure containing categories
 */
export interface CatalogData {
  /** Array of top-level categories */
  items: CatalogCategory[];
}

/**
 * Data for favorite shop functionality
 */
export interface FavShopData {
  /** Whether the shop is currently favorited */
  isShopCollected: boolean;
  /** Shop owner's identifier */
  ownerId: string;
}

/**
 * Header back button configuration
 */
export interface HeaderBackData {
  /** Callback when back button is clicked */
  onHeaderBack: () => void;
  /** Text to display for back navigation */
  backTitle: string;
}

/**
 * Product search parameters
 */
export interface ProductSearchParams {
  /** Search query text */
  query?: string;
  /** Shop/merchant ID to search within */
  shopId?: string;
  /** Category filters */
  categoryIds?: string[];
}

/**
 * Product search result item
 */
export interface ProductSearchResult {
  /** Product identifier */
  id: string;
  /** Product name */
  name: string;
  /** Product thumbnail URL */
  thumbnail?: string;
}

/**
 * Configuration for merchant catalog request
 */
export interface MerchantCatalogRequest {
  /** Request payload data */
  data: {
    /** Array of shop IDs */
    shopIds: string;
    /** Filter type (e.g., exclude 2D or 3D models) */
    type?: string;
  };
}

/**
 * Shop level information for hierarchical navigation
 */
export interface ShopLevelChild {
  /** Shop group identifier */
  id: string;
  /** Shop group name */
  name: string;
  /** Nested shop groups */
  children?: ShopLevelChild[];
}

/**
 * Props for MerchantPageController component
 */
export interface MerchantPageControllerProps {
  /** Callback when header back button is clicked */
  onHeaderBack?: () => void;
  /** Whether to exclude 2D or 3D content */
  exclude2DOr3D?: string;
}

/**
 * State interface for MerchantPageController
 */
export interface MerchantPageControllerState {
  /** Currently selected shop group ID */
  shopGroupId: string;
  /** Currently selected shop group name */
  shopGroupName: string;
  /** Current shop name for filtering */
  shopName: string;
  /** Hierarchical children of current shop group */
  levelChildren: ShopLevelChild[];
  /** Default search keyword */
  defaultSearchKey: string;
}

/**
 * API manager for catalog operations
 */
export interface CatalogApiManager {
  /** Data manager instance for API calls */
  dataManager: {
    /**
     * Search products by query
     * @param params - Search parameters
     * @returns Promise resolving to search results
     */
    searchProducts(params: ProductSearchParams): Promise<ProductSearchResult[]>;
    
    /**
     * Get merchant catalog categories
     * @param request - Catalog request configuration
     * @returns Promise resolving to catalog data
     */
    getMerchantCatalog(request: MerchantCatalogRequest): Promise<CatalogData>;
  };
}

/**
 * Favorite plugin interface for managing favorited merchants
 */
export interface FavoritePlugin {
  /**
   * Initialize merchant favorite IDs from storage
   * @returns Promise that resolves when initialization is complete
   */
  initMerchantFavIds(): Promise<void>;
  
  /**
   * Get all favorited merchant IDs
   * @returns Array of merchant IDs marked as favorite
   */
  getAllMerchantFavIds(): string[];
}

/**
 * Merchant landing page component props
 */
export interface MerchantLandingPageContainerProps {
  /** Callback when "More" button is clicked on a shop group */
  onClickMore: (shopGroupId: string, shopGroupName: string, levelChildren: ShopLevelChild[]) => void;
  /** Callback when a shop card is clicked */
  onShopClick: (shopId: string, shopName: string) => Promise<void>;
  /** Callback when search is triggered */
  handleSearchShop: (shopName: string, searchKey: string) => void;
  /** Optional callback for header back navigation */
  onHeaderBack?: () => void;
}

/**
 * Merchant list page component props
 */
export interface MerchantListPageContainerProps {
  /** Shop group ID to display */
  shopGroupId: string;
  /** Shop group name for display */
  shopGroupName: string;
  /** Shop name filter */
  shopName: string;
  /** Hierarchical children of shop group */
  levelChildren: ShopLevelChild[];
  /** Callback when back button is clicked */
  onBack: () => void;
  /** Callback when shop card is clicked */
  onShopCardClick: (shopId: string, shopName: string) => Promise<void>;
  /** Callback when search back is triggered */
  handleSearchBack: () => void;
  /** Callback when search is submitted */
  handleSearchShop: (shopName: string, searchKey: string) => void;
  /** Array of all favorited merchant IDs */
  allFavIds: string[];
  /** Page type identifier */
  type: string;
  /** Default search keyword */
  defaultSearchKey: string;
}

/**
 * MerchantPageController - Main controller for merchant browsing flow
 * 
 * Manages navigation between:
 * - Landing page with shop groups
 * - Shop list page with filtering
 * - Product catalog page
 * 
 * @extends PageController
 */
export default class MerchantPageController extends React.Component<
  MerchantPageControllerProps,
  MerchantPageControllerState
> {
  /** Shop group identifier for current list view */
  shopGroupId: string;
  
  /** Shop group name for current list view */
  shopGroupName: string;
  
  /** Shop name filter for search */
  shopName: string;
  
  /** Hierarchical children of current shop group */
  levelChildren: ShopLevelChild[];
  
  /** Catalog API manager instance */
  appCatalogApiManager: CatalogApiManager;
  
  /** Favorite plugin for managing shop favorites */
  favoritePlugin: FavoritePlugin;
  
  /** Callback for header back navigation */
  onHeaderBack?: () => void;
  
  /** Default search keyword */
  defaultSearchKey: string;

  constructor(props: MerchantPageControllerProps);

  /**
   * Initialize merchant favorite IDs on component mount
   */
  componentDidMount(): void;

  /**
   * Get the first page content (landing page)
   * @returns React element for landing page
   */
  getFirstPageContent(): React.ReactElement;

  /**
   * Handle click on "More" button in shop group
   * @param shopGroupId - ID of the shop group
   * @param shopGroupName - Name of the shop group
   * @param levelChildren - Hierarchical children of the group
   */
  handleClickMore(
    shopGroupId: string,
    shopGroupName: string,
    levelChildren: ShopLevelChild[]
  ): void;

  /**
   * Handle shop search submission
   * @param shopName - Name of shop to search
   * @param searchKey - Search keyword
   */
  handleSearchShop(shopName: string, searchKey: string): void;

  /**
   * Reset all list page parameters to default values
   */
  resetListPageParams(): void;

  /**
   * Search products by query
   * @param params - Search parameters
   * @returns Promise resolving to search results
   */
  searchProducts(params: ProductSearchParams): Promise<ProductSearchResult[]>;

  /**
   * Handle back navigation from search page
   * Resets state and signals to show submenu selection
   */
  handleSearchBack(): void;

  /**
   * Get product page for a specific shop
   * @param shopId - Shop identifier
   * @param shopName - Shop name for display
   * @returns Promise resolving when page is loaded
   */
  getProductPage(shopId: string, shopName: string): Promise<void>;

  /**
   * Get merchant list page component
   * @param pageType - Type of merchant page
   * @returns React element for merchant list page
   */
  getMerchantListPage(pageType: string): React.ReactElement;

  /**
   * Get landing page component
   * @returns React element for landing page
   */
  getLandingPage(): React.ReactElement;

  /**
   * Navigate to a new page in the flow
   * @param pageId - Unique identifier for the page
   * @param pageContent - React element to display
   */
  gotoPage(pageId: string, pageContent: React.ReactElement): void;

  /**
   * Navigate back to previous page
   */
  backtoPage(): void;
}

/**
 * Named exports
 */
export { MerchantPageController };