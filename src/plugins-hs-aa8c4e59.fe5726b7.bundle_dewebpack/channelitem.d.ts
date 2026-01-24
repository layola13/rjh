/**
 * Channel selection component module
 * Provides UI components for displaying and selecting product channels
 */

import React from 'react';

/**
 * Channel item data structure
 */
export interface Channel {
  /** Unique SKU identifier for the channel */
  skuId: string | number;
  /** Product title */
  title: string;
  /** Main product image URL */
  mainImage: string;
  /** Channel display name (e.g., "Amazon", "eBay") */
  channelName: string;
  /** Channel icon URL */
  channelIcon?: string;
  /** Product price (numeric value) */
  price: number;
}

/**
 * Channel group containing multiple channel options
 */
export interface ChannelGroup {
  /** Array of available channels */
  items: Channel[];
}

/**
 * Props for ChannelItem component
 */
export interface ChannelItemProps {
  /** Channel data to display */
  channel?: Channel;
  /** Click event handler */
  onClick?: () => void;
  /** Currency unit symbol (default: "$") */
  unit?: string;
}

/**
 * Props for SelectChannel component
 */
export interface SelectChannelProps {
  /** Channel group containing selectable items */
  item: ChannelGroup;
  /** Currently selected channel SKU ID */
  selctChanelSkuId?: string | number;
  /** Callback when a channel is selected */
  onSlected?: (skuId: string | number) => void;
  /** Additional CSS class name */
  className?: string;
  /** Function to get popup container element */
  getPopupContainer?: () => HTMLElement;
  /** Currency unit symbol (default: "$") */
  unit?: string;
}

/**
 * Renders a single channel item with image, title, shop info and price
 * 
 * @param props - Component properties
 * @returns React element displaying channel information
 */
export declare function ChannelItem(props: ChannelItemProps): React.ReactElement | null;

/**
 * Dropdown component for selecting from multiple channels
 * Shows current selection and allows switching between available channels
 * 
 * @param props - Component properties
 * @returns React element with dropdown channel selector
 */
export declare function SelectChanel(props: SelectChannelProps): React.ReactElement;