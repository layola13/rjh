/**
 * VNavigationDrawer Component Module
 * 
 * A navigation drawer component that provides a sliding panel interface,
 * typically used for application navigation menus.
 * 
 * @module VNavigationDrawer
 */

/**
 * Props configuration for the VNavigationDrawer component
 * 
 * @interface VNavigationDrawerProps
 */
export interface VNavigationDrawerProps {
  /**
   * Controls the visibility state of the drawer
   * @default false
   */
  modelValue?: boolean;

  /**
   * Placement position of the drawer
   * @default 'left'
   */
  position?: 'left' | 'right' | 'top' | 'bottom';

  /**
   * Width of the drawer (for left/right positions)
   * @default '256px'
   */
  width?: string | number;

  /**
   * Height of the drawer (for top/bottom positions)
   * @default '256px'
   */
  height?: string | number;

  /**
   * Whether the drawer is in permanent/persistent mode
   * @default false
   */
  permanent?: boolean;

  /**
   * Whether the drawer is temporarily visible
   * @default false
   */
  temporary?: boolean;

  /**
   * Disable overlay/backdrop
   * @default false
   */
  disableOverlay?: boolean;

  /**
   * Custom CSS classes
   */
  class?: string | string[] | Record<string, boolean>;

  /**
   * Inline styles
   */
  style?: string | Record<string, string | number>;
}

/**
 * Emits from VNavigationDrawer component
 * 
 * @interface VNavigationDrawerEmits
 */
export interface VNavigationDrawerEmits {
  /**
   * Emitted when the drawer visibility state changes
   * @param value - New visibility state
   */
  'update:modelValue': (value: boolean) => void;

  /**
   * Emitted when the drawer starts opening
   */
  'open': () => void;

  /**
   * Emitted when the drawer starts closing
   */
  'close': () => void;

  /**
   * Emitted when the overlay is clicked
   */
  'overlay-click': () => void;
}

/**
 * VNavigationDrawer Component
 * 
 * A versatile navigation drawer component supporting multiple positions,
 * temporary/permanent modes, and customizable dimensions.
 * 
 * @example
 *