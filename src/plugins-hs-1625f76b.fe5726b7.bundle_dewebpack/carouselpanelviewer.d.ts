/**
 * Carousel panel viewer component for displaying and interacting with room template images
 * Supports both panoramic and normal image views with entity selection capabilities
 */

import { RefObject, CSSProperties } from 'react';

/**
 * Payment information for template room content
 */
export interface PayInfo {
  /** Whether the content requires payment */
  needPay: boolean;
  /** Whether the user has paid for this content */
  paid: boolean;
  /** Whether the user has VIP status */
  isVip: boolean;
}

/**
 * Template room image data
 */
export interface TemplateRoomImage {
  /** Unique identifier for the template room */
  id: string;
  /** URL of the template room image */
  imageUrl: string;
  /** Whether this is a panoramic image */
  isPano: boolean;
  /** Version identifier for the template data */
  version: string;
}

/**
 * Cursor state types for different interaction modes
 */
export type CursorState = 
  | 'default'
  | 'can_selected_single'
  | 'can_selected_multi'
  | 'cannot_selected'
  | 'cannot_selected_vip';

/**
 * Tooltip configuration for cursor hover states
 */
export interface TooltipConfig {
  /** Current cursor state key */
  key: CursorState;
  /** Left position offset in pixels */
  left?: number;
  /** Top position offset in pixels */
  top?: number;
  /** Localization key for tooltip message */
  reason?: string;
}

/**
 * Entity selection result from strategy manager
 */
export interface EntitySelectionResult {
  /** Array of entity IDs that can be selected */
  ids: number[];
  /** Reason key if selection is not allowed */
  reason?: string;
}

/**
 * Props for the CarouselPanelViewer component
 */
export interface CarouselPanelViewerProps {
  /** Template room image data to display */
  img: TemplateRoomImage;
  /** Base URL for fetching house data */
  baseHouseDataUrl: string;
  /** Payment information for content access control */
  payInfo?: PayInfo;
  /**
   * Handler called when user attempts to interact with locked content
   * @param source - The interaction source identifier ('canvasModel' or 'pickAllmodel')
   */
  handleUnlock?: (source: 'canvasModel' | 'pickAllmodel') => void;
}

/**
 * CarouselPanelViewer component
 * 
 * Renders an interactive viewer for template room images with the following features:
 * - Support for both panoramic and normal images
 * - Entity selection with hover tooltips
 * - Loading states and error handling
 * - VIP content marking
 * - Batch entity selection ("pick all" functionality)
 * - User interaction tracking
 * 
 * @example
 *