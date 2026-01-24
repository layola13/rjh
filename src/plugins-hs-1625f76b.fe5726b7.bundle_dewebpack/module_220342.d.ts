/**
 * Carousel Panel Component Type Definitions
 * A React component for displaying product images in a carousel with navigation and unlock functionality
 */

import { ReactElement } from 'react';
import { HSCatalog } from '635589';

/**
 * Image data structure for carousel items
 */
export interface CarouselImageItem {
  /** Image version identifier */
  version: string;
  /** Full-size image URL */
  imageUrl: string;
  /** Thumbnail/mini image URL for navigation */
  miniImageUrl: string;
  /** Display label for the image */
  label?: string;
  /** Whether this is a panoramic image */
  isPano: boolean;
  /** Copyright information for the image */
  copyright?: string;
}

/**
 * Payment and access control information
 */
export interface PaymentInfo {
  /** Whether payment is required to access content */
  needPay: boolean;
  /** Whether the user has already paid */
  paid: boolean;
  /** Whether the user has VIP/premium access */
  isVip: boolean;
}

/**
 * Action button configuration
 */
export interface CarouselButton {
  /** Button display text */
  label: string;
  /** Unique identifier for tracking */
  key?: string;
  /** Event tracking key */
  eventKey?: string;
  /** Click handler */
  click: (event: React.MouseEvent) => void;
}

/**
 * Color information for design palette
 */
export interface ColorInfo {
  /** Hex color code (e.g., "#FF5733") */
  color: string;
}

/**
 * Catalog data structure
 */
export interface CatalogData {
  /** Product/design name */
  name: string;
  /** Content type information */
  contentType?: HSCatalog.ContentType;
  /** Payment and access information */
  payInfo?: PaymentInfo;
}

/**
 * A/B test variant identifier
 */
export type ABTestVariant = 'A' | 'B' | '';

/**
 * Source type for the carousel panel
 */
export type CarouselPanelType = 'public_styler_template_page' | string;

/**
 * Props for the CarouselPanel component
 */
export interface CarouselPanelProps {
  /** Array of images to display in the carousel */
  imgList: CarouselImageItem[];
  
  /** Catalog data containing product information */
  data: CatalogData;
  
  /** Top position offset in pixels */
  top: number;
  
  /** Callback when the panel is closed */
  onClose: () => void;
  
  /** Action buttons to display in the footer */
  buttons: CarouselButton[];
  
  /** Callback to navigate to the model detail page */
  jumpToModelPage: () => void;
  
  /** List of colors used in the design */
  colorList: ColorInfo[];
  
  /** A/B test variant identifier for autostyler feature */
  abRAutostyler: ABTestVariant;
  
  /** Source type identifier */
  type: CarouselPanelType;
  
  /** Base URL for house data resources */
  baseHouseDataUrl?: string;
}

/**
 * CarouselPanel Component
 * 
 * Displays a floating panel with product images in a carousel format.
 * Features include:
 * - Image carousel with thumbnail navigation
 * - Panoramic image support
 * - Payment/unlock functionality for premium content
 * - Color palette display for designs
 * - A/B test variants for different layouts
 * - Responsive positioning
 * - Click-outside-to-close behavior
 * 
 * @param props - Component props
 * @returns Carousel panel component
 * 
 * @example
 *