/**
 * VBottomNavigation Component Type Definitions
 * A bottom navigation bar component that provides app-level navigation
 */

import Vue, { VNode } from 'vue';
import { CombinedVueInstance } from 'vue/types/vue';

/**
 * Component props interface
 */
export interface VBottomNavigationProps {
  /**
   * CSS class applied to active navigation items
   * @default 'v-btn--active'
   */
  activeClass?: string;

  /**
   * Background color of the navigation bar
   * Supports color names, hex, rgb, etc.
   */
  backgroundColor?: string;

  /**
   * Forces navigation items to take up all available space
   * @default false
   */
  grow?: boolean;

  /**
   * Height of the navigation bar in pixels
   * @default 56
   */
  height?: number | string;

  /**
   * Hides the navigation bar when scrolling down
   * @default false
   */
  hideOnScroll?: boolean;

  /**
   * Uses horizontal layout with text beside icons
   * @default false
   */
  horizontal?: boolean;

  /**
   * Controls visibility state (use with .sync or v-model)
   * @default true
   */
  inputValue?: boolean;

  /**
   * Forces at least one item to always be selected
   * @default false
   */
  mandatory?: boolean;

  /**
   * Hides text labels until item is active
   * @default false
   */
  shift?: boolean;

  /**
   * Currently selected item value
   */
  value?: any;

  /**
   * Text color for the navigation bar
   */
  color?: string;

  /**
   * Applies position: absolute to the component
   * @default false
   */
  absolute?: boolean;

  /**
   * Designates the component as part of application layout
   * @default false
   */
  app?: boolean;

  /**
   * Applies position: fixed to the component
   * @default false
   */
  fixed?: boolean;

  /**
   * Scroll target selector for scroll behavior
   */
  scrollTarget?: string;
}

/**
 * Component data interface
 */
export interface VBottomNavigationData {
  /**
   * Internal visibility state
   */
  isActive: boolean;
}

/**
 * Component computed properties interface
 */
export interface VBottomNavigationComputed {
  /**
   * Determines if scroll behavior should be enabled
   */
  canScroll: boolean;

  /**
   * CSS classes object for the component
   */
  classes: Record<string, boolean>;

  /**
   * Inline styles object for the component
   */
  styles: Record<string, string>;

  /**
   * Internal value state from proxyable mixin
   */
  internalValue: any;

  /**
   * Measurable styles from measurable mixin
   */
  measurableStyles: Record<string, string>;

  /**
   * Indicates if currently scrolling up
   */
  isScrollingUp: boolean;
}

/**
 * Component methods interface
 */
export interface VBottomNavigationMethods {
  /**
   * Callback when scroll threshold is met
   * Updates visibility based on scroll direction
   */
  thresholdMet(): void;

  /**
   * Updates application layout spacing
   * @returns The height of the component in pixels
   */
  updateApplication(): number;

  /**
   * Handles value change events
   * @param value - The new selected value
   */
  updateValue(value: any): void;

  /**
   * Scroll event handler from scrollable mixin
   */
  onScroll(): void;

  /**
   * Sets background color utility from colorable mixin
   */
  setBackgroundColor(color: string | undefined, data: any): any;

  /**
   * Sets text color utility from colorable mixin
   */
  setTextColor(color: string | undefined, data: any): any;
}

/**
 * Component events interface
 */
export interface VBottomNavigationEvents {
  /**
   * Emitted when the selected value changes
   * @param value - The new selected value
   */
  change: (value: any) => void;

  /**
   * Emitted when visibility state changes (for .sync modifier)
   * @param value - The new visibility state
   */
  'update:input-value': (value: boolean) => void;
}

/**
 * VBottomNavigation component instance type
 */
export type VBottomNavigationInstance = CombinedVueInstance<
  Vue,
  VBottomNavigationData,
  VBottomNavigationMethods,
  VBottomNavigationComputed,
  VBottomNavigationProps
>;

/**
 * VBottomNavigation component declaration
 */
declare const VBottomNavigation: {
  new (): VBottomNavigationInstance;
};

export default VBottomNavigation;