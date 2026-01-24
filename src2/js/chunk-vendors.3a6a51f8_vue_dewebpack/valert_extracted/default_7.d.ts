/**
 * Scroll-to utility service for smooth scrolling to elements or positions
 * Supports custom easing functions and automatic offset calculations
 */

import type { VuetifyFramework } from 'vuetify';
import type { EasingFunction } from './easing-patterns';

/**
 * Target element or scroll position
 */
export type ScrollTarget = number | string | Element;

/**
 * Container element that will be scrolled
 */
export type ScrollContainer = string | Element;

/**
 * Configuration options for scroll behavior
 */
export interface GoToOptions {
  /**
   * The container element to scroll within
   * @default document.scrollingElement || document.body || document.documentElement
   */
  container?: ScrollContainer;

  /**
   * Duration of the scroll animation in milliseconds
   * @default 500
   */
  duration?: number;

  /**
   * Additional offset to apply to the target position (in pixels)
   * @default 0
   */
  offset?: number;

  /**
   * Easing function name or custom easing function
   * @default "easeInOutCubic"
   */
  easing?: string | EasingFunction;

  /**
   * Whether to automatically account for Vuetify application layout offsets
   * (app bar, navigation drawer, etc.)
   * @default true
   */
  appOffset?: boolean;
}

/**
 * Vuetify framework integration interface
 */
export interface GoToFramework {
  application?: {
    bar: number;
    top: number;
  };
}

/**
 * Main scroll-to function
 * Smoothly scrolls to a target element or position with configurable easing
 * 
 * @param target - Element, selector, or numeric scroll position to scroll to
 * @param options - Configuration options for scroll behavior
 * @returns Promise that resolves with final scroll position when animation completes
 * 
 * @example
 *