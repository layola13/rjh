/**
 * VBottomNavigation Component Type Definitions
 * A navigation component that displays actions at the bottom of the screen
 */

import Vue, { VNode } from 'vue';
import { CombinedVueInstance } from 'vue/types/vue';

/**
 * Props interface for VBottomNavigation component
 */
export interface VBottomNavigationProps {
  /**
   * CSS class applied to active navigation items
   * @default 'v-btn--active'
   */
  activeClass?: string;

  /**
   * Background color for the navigation bar
   * Accepts color name or hex value
   */
  backgroundColor?: string;

  /**
   * Forces buttons to take up all available space
   * @default false
   */
  grow?: boolean;

  /**
   * Height of the navigation bar in pixels
   * @default 56
   */
  height?: number | string;

  /**
   * Hides the navigation when scrolling down
   * @default false
   */
  hideOnScroll?: boolean;

  /**
   * Uses alternate horizontal styling for buttons
   * @default false
   */
  horizontal?: boolean;

  /**
   * Controls visibility of the navigation bar
   * @default true
   */
  inputValue?: boolean;

  /**
   * Forces at least one button to always be selected
   * @default false
   */
  mandatory?: boolean;

  /**
   * Hides text of buttons when not active
   * @default false
   */
  shift?: boolean;

  /**
   * Current selected value
   */
  value?: any;

  /**
   * Text color for the navigation
   */
  color?: string;

  /**
   * Positions the element absolutely
   * @default false
   */
  absolute?: boolean;

  /**
   * Applies position: fixed to the component
   * @default false
   */
  fixed?: boolean;

  /**
   * Designates the component as part of the application layout
   * @default false
   */
  app?: boolean;

  /**
   * Target element for scroll events
   */
  scrollTarget?: string | HTMLElement;
}

/**
 * Data interface for VBottomNavigation component
 */
export interface VBottomNavigationData {
  /**
   * Internal active state
   */
  isActive: boolean;
}

/**
 * Computed properties interface
 */
export interface VBottomNavigationComputed {
  /**
   * Determines if the component can respond to scroll events
   */
  canScroll: boolean;

  /**
   * CSS classes applied to the component
   */
  classes: Record<string, boolean>;

  /**
   * Inline styles applied to the component
   */
  styles: Record<string, any>;

  /**
   * Styles related to measurable dimensions
   */
  measurableStyles: Record<string, any>;

  /**
   * Internal value synced with v-model
   */
  internalValue: any;

  /**
   * Indicates if currently scrolling up
   */
  isScrollingUp: boolean;
}

/**
 * Methods interface for VBottomNavigation component
 */
export interface VBottomNavigationMethods {
  /**
   * Called when scroll threshold is met
   * Updates visibility based on scroll direction
   */
  thresholdMet(): void;

  /**
   * Updates application layout dimensions
   * @returns The height of the navigation element
   */
  updateApplication(): number;

  /**
   * Emits change event when value updates
   * @param value - New selected value
   */
  updateValue(value: any): void;

  /**
   * Scroll event handler
   */
  onScroll(): void;

  /**
   * Sets background color utility
   */
  setBackgroundColor(color: string | undefined, data: any): any;

  /**
   * Sets text color utility
   */
  setTextColor(color: string | undefined, data: any): any;
}

/**
 * Events emitted by VBottomNavigation
 */
export interface VBottomNavigationEvents {
  /**
   * Emitted when the selected value changes
   * @param value - New selected value
   */
  change: any;

  /**
   * Emitted when inputValue changes (for .sync modifier)
   * @param value - New visibility state
   */
  'update:input-value': boolean;
}

/**
 * VBottomNavigation Component Instance Type
 */
export type VBottomNavigationInstance = CombinedVueInstance<
  Vue,
  VBottomNavigationData,
  VBottomNavigationMethods,
  VBottomNavigationComputed,
  VBottomNavigationProps
>;

/**
 * VBottomNavigation Component
 * 
 * A bottom navigation bar that displays 3-5 actions at the bottom of the screen.
 * Provides quick navigation between top-level views of an app.
 * 
 * @example
 *