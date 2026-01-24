/**
 * Routable Mixin
 * Provides routing and link functionality for Vue components
 * @module routable
 */

import Vue, { VNode, VNodeData, DirectiveOptions } from 'vue';
import { Route } from 'vue-router';

/**
 * Route location descriptor
 */
export interface RouteLocation {
  path?: string;
  name?: string;
  params?: Record<string, string | number>;
  query?: Record<string, string | number | (string | number)[]>;
  hash?: string;
}

/**
 * Ripple directive configuration
 */
export interface RippleOptions {
  class?: string;
  center?: boolean;
  circle?: boolean;
}

/**
 * Generated route link configuration
 */
export interface GeneratedRouteLink {
  /** Tag name to render */
  tag: string;
  /** VNode data for the rendered element */
  data: VNodeData;
}

/**
 * Component data structure
 */
export interface RoutableData {
  /** Whether the route is currently active */
  isActive: boolean;
  /** Additional CSS class to apply when active */
  proxyClass: string;
}

/**
 * Computed properties interface
 */
export interface RoutableComputed {
  /** Computed CSS classes for the component */
  classes: Record<string, boolean>;
  /** Computed ripple effect configuration */
  computedRipple: boolean | RippleOptions;
  /** Whether the component can be clicked */
  isClickable: boolean;
  /** Whether the component represents a link */
  isLink: boolean;
  /** Computed inline styles */
  styles: Record<string, string | number>;
}

/**
 * Component methods interface
 */
export interface RoutableMethods {
  /**
   * Handle click events
   * @param event - Native click event
   */
  click(event: MouseEvent): void;
  
  /**
   * Generate route link configuration
   * @returns Configuration object for rendering the link
   */
  generateRouteLink(): GeneratedRouteLink;
  
  /**
   * Handle route change events
   */
  onRouteChange(): void;
  
  /**
   * Toggle the active state
   */
  toggle(): void;
}

/**
 * Component props interface
 */
export interface RoutableProps {
  /** CSS class to apply when route is active */
  activeClass?: string;
  /** Whether to append the path to the current path */
  append?: boolean;
  /** Whether the component is disabled */
  disabled?: boolean;
  /** Whether to use exact matching for active state */
  exact?: boolean;
  /** CSS class to apply when route exactly matches */
  exactActiveClass?: string;
  /** Force component to render as a link */
  link?: boolean;
  /** URL for standard anchor tag */
  href?: string | RouteLocation;
  /** Route location for vue-router */
  to?: string | RouteLocation;
  /** Use Nuxt.js link component */
  nuxt?: boolean;
  /** Replace current history entry instead of pushing new one */
  replace?: boolean;
  /** Ripple effect configuration */
  ripple?: boolean | RippleOptions | null;
  /** HTML tag to render */
  tag?: string;
  /** Link target attribute (e.g., '_blank') */
  target?: string;
}

/**
 * Routable mixin instance type
 */
export type RoutableInstance = Vue & 
  RoutableProps & 
  RoutableData & 
  RoutableComputed & 
  RoutableMethods & {
    /** Vue Router current route */
    $route?: Route;
    /** Component references */
    $refs: {
      link?: Vue | Element | Vue[] | Element[];
    };
  };

/**
 * Routable Mixin
 * Provides routing functionality including link generation, 
 * active state management, and ripple effects
 */
declare const Routable: {
  /** Mixin name */
  name: 'routable';
  
  /** Directive definitions */
  directives: {
    Ripple: DirectiveOptions;
  };
  
  /** Component props */
  props: {
    activeClass: { type: typeof String };
    append: { type: typeof Boolean };
    disabled: { type: typeof Boolean };
    exact: { type: typeof Boolean; default: undefined };
    exactActiveClass: { type: typeof String };
    link: { type: typeof Boolean };
    href: { type: [typeof String, typeof Object] };
    to: { type: [typeof String, typeof Object] };
    nuxt: { type: typeof Boolean };
    replace: { type: typeof Boolean };
    ripple: { type: [typeof Boolean, typeof Object]; default: null };
    tag: { type: typeof String };
    target: { type: typeof String };
  };
  
  /** Component data factory */
  data(): RoutableData;
  
  /** Computed properties */
  computed: {
    classes(this: RoutableInstance): Record<string, boolean>;
    computedRipple(this: RoutableInstance): boolean | RippleOptions;
    isClickable(this: RoutableInstance): boolean;
    isLink(this: RoutableInstance): boolean;
    styles(this: RoutableInstance): Record<string, string | number>;
  };
  
  /** Watchers */
  watch: {
    $route: 'onRouteChange';
  };
  
  /** Component methods */
  methods: RoutableMethods;
};

export default Routable;