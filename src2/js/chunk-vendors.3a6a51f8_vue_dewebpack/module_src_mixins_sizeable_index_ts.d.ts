import Vue from 'vue';

/**
 * Sizeable Mixin
 * 
 * Provides size variant props and computed classes for component sizing.
 * Supports five size variants: x-small, small, medium (default), large, and x-large.
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

export interface SizeableComputed {
  /** Returns true if no explicit size is set (default/medium size) */
  readonly medium: boolean;
  
  /** Returns CSS class object for size-based styling */
  readonly sizeableClasses: {
    'v-size--x-small': boolean;
    'v-size--small': boolean;
    'v-size--default': boolean;
    'v-size--large': boolean;
    'v-size--x-large': boolean;
  };
}

/**
 * Sizeable mixin component instance
 * 
 * Combines size props with computed properties for easy size management.
 */
export type Sizeable = Vue & SizeableProps & SizeableComputed;

/**
 * Vue mixin that adds size variation support to components.
 * 
 * @example
 *