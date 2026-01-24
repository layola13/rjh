/**
 * Material Pick Up Page Component
 * 
 * A modal component for selecting and applying materials from design templates.
 * Supports filtering by room types and displays product items with tracking capabilities.
 */

import type React from 'react';

/**
 * Product item structure from catalog
 */
export interface ProductItem {
  /** Unique identifier for the product */
  uuid: string;
  /** Product ID */
  id: string;
  /** Additional product properties */
  [key: string]: any;
}

/**
 * Product query parameters
 */
export interface ProductQueryParams {
  /** List of model IDs to query */
  modelIdList: string[];
  /** Maximum number of results */
  limit?: number;
}

/**
 * Product query result
 */
export interface ProductQueryResult {
  /** Array of product items */
  items: ProductItem[];
}

/**
 * Room type data tuple: [display name, model ID list]
 */
export type RoomTypeData = [string, string[]];

/**
 * Draggable modal configuration
 */
export interface DraggableConfig {
  /** Callback when dragging starts */
  onStart?: () => void;
  /** Callback when dragging stops */
  onStop?: (event: any, data: any) => void;
}

/**
 * Modal title configuration
 */
export interface TitleSetting {
  /** Modal title text */
  title: string;
  /** Whether to show close button */
  enableCloseBtn: boolean;
  /** Custom title content HTML */
  customizedTitleContent: string;
}

/**
 * Modal configuration properties
 */
export interface ModalConfig {
  /** Initial width in pixels */
  initialWidth: number;
  /** Initial height in pixels */
  initialHeight: number;
  /** CSS class name */
  className: string;
  /** Draggable behavior configuration */
  draggable: DraggableConfig;
  /** Title bar settings */
  titleSetting: TitleSetting;
  /** Enable horizontal scrolling */
  enableXScroll: boolean;
  /** Enable vertical scrolling */
  enableYScroll: boolean;
  /** Callback to set z-index when modal is clicked */
  setClickModalZIndex?: (shouldActivate: boolean) => void;
}

/**
 * Component properties for MaterialPickUpPage
 */
export interface MaterialPickUpPageProps {
  /** Design template name */
  name: string;
  /** Design area information */
  area: string;
  /** Copyright/designer information */
  copyright: string;
  /** Cover image URL */
  coverImage?: string;
  /** Modal title (defaults to localized string) */
  title?: string;
  /** Whether this is a whole house design */
  isWholeHouse: boolean;
  /** Whether to hide design information section */
  hideDesignInfo?: boolean;
  /** Room type data: array of [room name, model IDs] tuples */
  data: RoomTypeData[];
  /** Function to build product from raw data */
  buildProduct: (data: any) => ProductItem;
  /** Function to process filters */
  processFilters: (filters: any) => any;
}

/**
 * Material Pick Up Page Component
 * 
 * Displays a modal interface for selecting materials from design templates.
 * Features include:
 * - Room type filtering
 * - Product grid display
 * - Draggable modal interface
 * - Event tracking integration
 * 
 * @param props - Component properties
 * @returns React functional component
 * 
 * @example
 *