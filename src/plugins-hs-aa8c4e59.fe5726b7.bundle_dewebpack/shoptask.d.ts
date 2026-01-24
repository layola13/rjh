/**
 * Module: ShopTask
 * Shop task management module for handling product selection and submission
 */

import React from 'react';

/**
 * Channel information for a product
 */
export interface ChannelInfo {
  /** Job/Shop ID */
  jid: string;
  /** Channel code identifier */
  channelCode?: string;
  /** SKU identifier */
  skuId?: string;
}

/**
 * Product item with pricing and channel information
 */
export interface ProductItem {
  /** SKU identifier */
  skuId: string;
  /** Channel code */
  channelCode: string;
  /** Product price */
  price: number;
}

/**
 * Shop product information
 */
export interface ShopProduct {
  /** Job/Shop ID */
  jid: string;
  /** List of available product items */
  items: ProductItem[];
}

/**
 * Metadata for shop/product
 */
export interface ShopMeta {
  /** Seek ID for product lookup */
  seekId?: string;
  /** Thumbnail image URL */
  thumbnail: string;
}

/**
 * Shop task item combining shop, product and metadata
 */
export interface ShopTaskItem {
  /** Unique shop ID */
  id: string;
  /** Shop product information */
  shop: ShopProduct;
  /** Associated metadata */
  meta: ShopMeta;
}

/**
 * Map of shop IDs to selected SKU IDs
 */
export type ChannelMap = Record<string, string>;

/**
 * Props for ShopTask component
 */
export interface ShopTaskProps {
  /** List of shop tasks to display */
  shops: ShopTaskItem[];
  /** Default selected channel map (shop ID -> SKU ID) */
  defaultSelectChanelMap: ChannelMap;
  /** Callback fired when selection changes */
  onChange?: (channels: ChannelInfo[]) => void;
  /** Currency unit symbol */
  unit?: string;
}

/**
 * Result of getShopInfo operation
 */
export interface ShopInfo {
  /** Available shop tasks */
  shops: ShopTaskItem[];
  /** Default channel selection map */
  selectChanelMap: ChannelMap;
}

/**
 * ShopTask component for displaying and managing shop product selections
 * 
 * @param props - Component properties
 * @returns React component displaying shop tasks with product selection
 */
export declare function ShopTask(props: ShopTaskProps): React.ReactElement;

/**
 * Retrieves shop information from BOM service and catalog
 * Fetches product data, resolves seek IDs, and builds shop task list
 * 
 * @returns Promise resolving to shop information with default selections
 */
export declare function getShopInfo(): Promise<ShopInfo>;

/**
 * Submits selected shop product tasks
 * 
 * @param channels - Array of selected channel information to submit
 * @returns Promise resolving when submission is complete
 */
export declare function submitShopTask(channels: ChannelInfo[]): Promise<void>;