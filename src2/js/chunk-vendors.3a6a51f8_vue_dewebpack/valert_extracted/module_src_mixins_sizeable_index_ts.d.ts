import Vue from 'vue';

/**
 * Sizeable mixin interface
 * Provides size variant props and computed classes for components
 */
export interface SizeableProps {
  /** Apply large size variant */
  large?: boolean;
  /** Apply small size variant */
  small?: boolean;
  /** Apply extra large size variant */
  xLarge?: boolean;
  /** Apply extra small size variant */
  xSmall?: boolean;
}

/**
 * Computed properties for Sizeable mixin
 */
export interface SizeableComputed {
  /** True when no size prop is specified (default/medium size) */
  readonly medium: boolean;
  /** CSS classes object for size variants */
  readonly sizeableClasses: {
    'v-size--x-small': boolean;
    'v-size--small': boolean;
    'v-size--default': boolean;
    'v-size--large': boolean;
    'v-size--x-large': boolean;
  };
}

/**
 * Sizeable Mixin
 * 
 * Provides standardized size variant functionality for Vue components.
 * Supports five size options: x-small, small, medium (default), large, and x-large.
 * 
 * @example
 *