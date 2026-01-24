/**
 * VBreadcrumbsItem Component
 * 
 * A breadcrumb navigation item component that supports routing and active states.
 * Extends the routable mixin to provide navigation capabilities.
 * 
 * @module VBreadcrumbsItem
 */

import { VNode, CreateElement } from 'vue';
import { PropType } from 'vue/types/options';

/**
 * Props interface for VBreadcrumbsItem component
 */
export interface VBreadcrumbsItemProps {
  /**
   * CSS class applied when the breadcrumb item is active/disabled
   * @default "v-breadcrumbs__item--disabled"
   */
  activeClass?: string;

  /**
   * Enable ripple effect on click
   * Can be a boolean or ripple configuration object
   * @default false
   */
  ripple?: boolean | RippleOptions;
}

/**
 * Ripple effect configuration options
 */
export interface RippleOptions {
  class?: string;
  center?: boolean;
  circle?: boolean;
}

/**
 * Computed properties interface
 */
export interface VBreadcrumbsItemComputed {
  /**
   * Computed CSS classes for the breadcrumb item
   * Includes base class and active class based on disabled state
   */
  classes: Record<string, boolean>;
}

/**
 * VBreadcrumbsItem component definition
 * 
 * Renders a single breadcrumb item with optional routing capabilities.
 * Supports active states, custom styling, and ripple effects.
 */
declare const VBreadcrumbsItem: {
  name: 'v-breadcrumbs-item';
  
  props: {
    /**
     * CSS class applied when the item is in active/disabled state
     */
    activeClass: {
      type: PropType<string>;
      default: 'v-breadcrumbs__item--disabled';
    };
    
    /**
     * Ripple effect configuration
     * False to disable, true for default ripple, or object for custom config
     */
    ripple: {
      type: PropType<boolean | RippleOptions>;
      default: false;
    };
  };
  
  computed: {
    /**
     * Computes CSS classes based on component state
     * @returns Object mapping class names to boolean inclusion flags
     */
    classes(): Record<string, boolean>;
  };
  
  methods: {
    /**
     * Renders the breadcrumb item element
     * @param createElement - Vue's createElement function
     * @returns VNode representing the rendered breadcrumb item
     */
    render(createElement: CreateElement): VNode;
    
    /**
     * Generates route link data (inherited from routable mixin)
     * @returns Object containing tag name and data attributes for routing
     */
    generateRouteLink(): {
      tag: string;
      data: Record<string, any>;
    };
  };
};

export default VBreadcrumbsItem;