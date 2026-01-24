/**
 * Whole Product Component - Type Definitions
 * A React component for displaying product items with interactive features
 */

import React from 'react';

/**
 * User information structure for customized rooms
 */
export interface AuthorInfo {
  /** User's nickname */
  nickName?: string;
  /** User's first name */
  firstName?: string;
  /** User's last name */
  lastName?: string;
  /** URL to user's avatar image */
  avatar?: string;
}

/**
 * Customized room data structure
 */
export interface CustomizedRoomData {
  /** Information about the room's author */
  authorInfo?: AuthorInfo;
}

/**
 * Payment and subscription information
 */
export interface PayInfo {
  /** Whether payment is required for this item */
  needPay: boolean;
  /** Whether the user has VIP status */
  isVip: boolean;
  /** Whether the item has been paid for */
  paid: boolean;
}

/**
 * Favorite feature configuration and callbacks
 */
export interface FavoriteConfig {
  /** Whether to show the favorite icon */
  showFavorite: boolean;
  /** Whether this item is currently favorited */
  isFavorite: boolean;
  /** Callback data to be passed when favorite status changes */
  favoriteCallBackData?: unknown;
  /**
   * Callback function triggered when favorite icon is clicked
   * @param params - Object containing new favorite state and callback data
   * @returns Promise resolving to operation result
   */
  onFavoriteClick?: (params: {
    isFavorite: boolean;
    favoriteCallBackData?: unknown;
  }) => Promise<{ isSucceed: boolean }>;
}

/**
 * Product item data structure
 */
export interface ProductData {
  /** Customized room information */
  customizedRoom?: CustomizedRoomData;
  [key: string]: unknown;
}

/**
 * Supported product display types
 */
export type ProductType = 
  | 'my_styler_template'
  | 'enterprise_styler_template_page'
  | 'public_styler_template_page'
  | string;

/**
 * Props for the WholeProduct component
 */
export interface WholeProductProps {
  /** Type of product display mode */
  type: ProductType;
  /** Index of the item in the current page */
  realIndex: number;
  /** Current page number */
  realPage: number;
  /** Product data object */
  data: ProductData;
  /** Primary title text */
  title: string;
  /** Secondary title text (optional) */
  secondtitle?: string;
  /** React node for operation buttons/icons */
  operations?: React.ReactNode;
  /** Whether the item is a panorama view */
  isPano?: boolean;
  /** Whether the item has panorama support */
  hasPano?: boolean;
  /** Source URL for the product image */
  imgSrc: string;
  /** Whether the item supports selection mode */
  supportSelect?: boolean;
  /** Payment and subscription information */
  payInfo?: PayInfo;
  /** Favorite feature configuration */
  favorite?: FavoriteConfig;
  /**
   * Callback when item is clicked
   * @param event - Mouse or keyboard event
   * @param top - Top position of the product element
   */
  clickItem?: (event: React.MouseEvent | React.KeyboardEvent | undefined, top: number | undefined) => void;
}

/**
 * Internal state for the WholeProduct component
 */
export interface WholeProductState {
  /** Whether the mouse is hovering over the item */
  hovering: boolean;
  /** Whether to display the favorite icon */
  showFavorite: boolean;
  /** Whether the item is currently favorited */
  isFavorite: boolean;
}

/**
 * WholeProduct Component
 * 
 * A React component that displays a product item card with:
 * - Product image with lazy loading
 * - Hover interactions
 * - Favorite toggle functionality
 * - Payment/VIP badges
 * - Panorama view indicator
 * - Author information display
 * - Customizable operations
 * 
 * @example
 *