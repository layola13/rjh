/**
 * Hook for managing sticky header behavior in table components
 * @module useStickyOffsets
 */

import type { ReactElement } from 'react';
import { useMemo } from 'react';

/**
 * Configuration options for sticky header behavior
 */
interface StickyConfig {
  /**
   * Offset from the top of the viewport for the sticky header (in pixels)
   * @default 0
   */
  offsetHeader?: number;

  /**
   * Offset for scroll calculations (in pixels)
   * @default 0
   */
  offsetScroll?: number;

  /**
   * Function that returns the container element for sticky positioning
   * @default () => window
   */
  getContainer?: () => HTMLElement | Window | null;
}

/**
 * Return type for the sticky header hook
 */
interface StickyHeaderResult {
  /**
   * Whether sticky positioning is enabled
   */
  isSticky: boolean;

  /**
   * CSS class name to apply when sticky is active
   */
  stickyClassName: string;

  /**
   * Header offset value in pixels
   */
  offsetHeader: number;

  /**
   * Scroll offset value in pixels
   */
  offsetScroll: number;

  /**
   * Container element for sticky positioning
   */
  container: HTMLElement | Window | null;
}

/**
 * Custom hook for calculating sticky header configuration
 * 
 * @param config - Sticky header configuration object or boolean to enable/disable
 * @param prefixCls - CSS class prefix for generating sticky class names
 * @returns Memoized sticky header configuration
 * 
 * @example
 *