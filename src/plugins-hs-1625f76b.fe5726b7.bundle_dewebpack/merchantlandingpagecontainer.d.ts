/**
 * Merchant Landing Page Container Module
 * Provides a container component for displaying merchant landing page with shop rankings and categories
 */

import { ReactNode } from 'react';

/**
 * Shop information data structure
 */
export interface ShopInfo {
  /** Unique identifier for the shop owner */
  ownerId: string;
  /** Display name of the shop */
  shopName: string;
  /** URL of the shop's picture/logo */
  picUrl: string;
  /** Shop title */
  title: string;
}

/**
 * Merchant ranking data response structure
 */
export interface MerchantRankDataResponse {
  /** List of shop information for ranking display */
  shopInfoList: ShopInfo[];
  /** Timestamp when the ranking was created */
  createRankTime: string;
}

/**
 * Request parameters for fetching merchant ranking data
 */
export interface MerchantRankDataRequest {
  /** Pagination offset */
  offset: number;
  /** Maximum number of results to return */
  limit: number;
}

/**
 * Category level children structure
 */
export interface CategoryLevelChildren {
  /** Child category ID */
  id: string;
  /** Child category name */
  name: string;
  [key: string]: unknown;
}

/**
 * Merchant category data structure
 */
export interface MerchantCategory {
  /** Category unique identifier */
  id: string;
  /** Category display name */
  name: string;
  /** List of shops belonging to this category */
  shopList: ShopInfo[];
  /** Nested child categories */
  levelChildren?: CategoryLevelChildren[];
}

/**
 * Merchant landing page data response structure
 */
export interface MerchantLandingDataResponse {
  /** Array of merchant categories */
  result: MerchantCategory[];
}

/**
 * Props for MerchantLandingPageContainer component
 */
export interface MerchantLandingPageContainerProps {
  /**
   * Callback fired when "See More" button is clicked on a category
   * @param categoryId - The ID of the category
   * @param categoryName - The name of the category
   * @param levelChildren - Child categories if any
   */
  onClickMore: (
    categoryId: string,
    categoryName: string,
    levelChildren?: CategoryLevelChildren[]
  ) => void;

  /**
   * Callback fired when a shop is clicked
   * @param ownerId - The owner ID of the shop
   * @param shopName - The name of the shop
   * @param isFromLanding - Whether the click originated from landing page
   */
  onShopClick: (
    ownerId: string,
    shopName: string,
    isFromLanding: boolean
  ) => void;

  /**
   * Callback fired when search is performed
   * @param categoryId - The category ID to search within (empty string for all)
   * @param searchQuery - The search query text
   */
  handleSearchShop: (categoryId: string, searchQuery: string) => void;

  /**
   * Callback fired when back button in header is clicked
   */
  onHeaderBack: () => void;
}

/**
 * Main container component for merchant landing page
 * Displays shop rankings, merchant categories, and search functionality
 * 
 * Features:
 * - Top ranked shops display (configurable limit)
 * - Category-based shop browsing
 * - Search functionality
 * - Loading states
 * - Tenant-specific rendering (FP vs others)
 * 
 * @param props - Component props
 * @returns React component
 */
export declare function MerchantLandingPageContainer(
  props: MerchantLandingPageContainerProps
): ReactNode;

/**
 * Component state interface for internal use
 * @internal
 */
interface ComponentState {
  /** Rendered shop rank elements */
  rankElements: ReactNode[];
  /** Rendered category card elements */
  categoryElements: ReactNode[];
  /** Loading state indicator */
  isLoading: boolean;
  /** Formatted rank creation time string */
  rankTimeDisplay: string;
}

/**
 * Formats timestamp into localized date string
 * @internal
 * @param timestamp - Unix timestamp in milliseconds as string
 * @returns Formatted date string with month and day
 */
declare function formatRankTime(timestamp: string): string;

/**
 * Event tracking parameters for merchant ranking clicks
 * @internal
 */
interface MerchantRankingEventParams {
  /** Position of the merchant in the ranking (1-indexed) */
  merchant_no: number;
}