import Vue, { VueConstructor } from 'vue';
import { DirectiveOptions } from 'vue/types/options';
import { Route } from 'vue-router';
import { RippleOptions } from '../../directives/ripple';

/**
 * Routable mixin props interface
 * Provides routing and navigation functionality for components
 */
export interface RoutableProps {
  /** Custom class to apply when the route is active */
  activeClass?: string;
  /** Append the path to the current path */
  append?: boolean;
  /** Disable the routing functionality */
  disabled?: boolean;
  /** Exactly match the route (default behavior differs based on route) */
  exact?: boolean;
  /** Custom class to apply when the route is exactly active */
  exactActiveClass?: string;
  /** Treat component as a link even without to/href */
  link?: boolean;
  /** String href or route object for anchor tags */
  href?: string | object;
  /** Vue Router target route */
  to?: string | object;
  /** Use Nuxt.js router link component */
  nuxt?: boolean;
  /** Replace current history entry instead of pushing */
  replace?: boolean;
  /** Enable ripple effect or provide ripple configuration */
  ripple?: boolean | RippleOptions | null;
  /** Custom HTML tag to render */
  tag?: string;
  /** Target attribute for links (_blank, _self, etc.) */
  target?: string;
}

/**
 * Routable mixin data interface
 */
export interface RoutableData {
  /** Whether the route is currently active */
  isActive: boolean;
  /** Proxy class for additional styling */
  proxyClass: string;
}

/**
 * Routable mixin computed properties interface
 */
export interface RoutableComputed {
  /** Computed CSS classes based on active state */
  classes: Record<string, boolean>;
  /** Computed ripple configuration */
  computedRipple: boolean | RippleOptions;
  /** Whether the component is clickable */
  isClickable: boolean;
  /** Whether the component behaves as a link */
  isLink: boolean;
  /** Computed inline styles */
  styles: Record<string, any>;
}

/**
 * Route link generation result
 */
export interface RouteLink {
  /** HTML tag or component name to render */
  tag: string;
  /** Vue component data object with props, attrs, directives, etc. */
  data: {
    attrs: {
      tabindex?: string | number;
      href?: string;
      target?: string;
    };
    class: Record<string, boolean>;
    style: Record<string, any>;
    props: Record<string, any>;
    directives: Array<{
      name: string;
      value: boolean | RippleOptions;
    }>;
    on?: Record<string, Function>;
    nativeOn?: Record<string, Function>;
    ref: string;
  };
}

/**
 * Routable mixin methods interface
 */
export interface RoutableMethods {
  /**
   * Handle click events
   * @param event - The click event object
   */
  click(event: MouseEvent): void;

  /**
   * Generate the appropriate route link configuration
   * @returns Route link configuration object
   */
  generateRouteLink(): RouteLink;

  /**
   * Handle route change events
   * Updates active state when the route changes
   */
  onRouteChange(): void;

  /**
   * Toggle the active state
   */
  toggle(): void;
}

/**
 * Routable Vue Mixin
 * 
 * Provides routing and navigation capabilities to components.
 * Supports Vue Router, Nuxt.js routing, and standard anchor links.
 * Includes ripple effect support and active state management.
 */
declare const Routable: VueConstructor<
  Vue & RoutableProps & RoutableData & RoutableComputed & RoutableMethods
>;

export default Routable;