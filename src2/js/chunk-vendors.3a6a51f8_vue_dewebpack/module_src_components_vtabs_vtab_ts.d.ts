/**
 * VTab component type definitions
 * A tab component that works with VTabs for creating tabbed interfaces
 */

import Vue, { VNode, VNodeData } from 'vue';
import { Route, Location } from 'vue-router';

/**
 * Ripple effect configuration
 */
export interface RippleConfig {
  /** Custom class for ripple effect */
  class?: string;
  /** Center the ripple effect */
  center?: boolean;
  /** Custom color for ripple */
  color?: string;
}

/**
 * VTab component props
 */
export interface VTabProps {
  /**
   * Enable ripple effect on click
   * Can be boolean or configuration object
   * @default true
   */
  ripple?: boolean | RippleConfig;

  /**
   * Router link target location
   */
  to?: string | Location;

  /**
   * HTML anchor href attribute
   */
  href?: string;

  /**
   * Append route to current path
   * @default false
   */
  append?: boolean;

  /**
   * Disable the tab
   * @default false
   */
  disabled?: boolean;

  /**
   * Exact route matching
   * @default false
   */
  exact?: boolean;

  /**
   * Apply active class on exact path match
   * @default false
   */
  exactActiveClass?: string;

  /**
   * Custom active CSS class
   */
  activeClass?: string;

  /**
   * Enable dark theme
   * @default false
   */
  dark?: boolean;

  /**
   * Enable light theme
   * @default false
   */
  light?: boolean;
}

/**
 * VTab component data
 */
export interface VTabData {
  /** CSS class applied when tab is active */
  proxyClass: string;
}

/**
 * VTab computed properties
 */
export interface VTabComputed {
  /** Computed CSS classes for the tab */
  classes: Record<string, boolean>;
  
  /** Normalized value derived from to/href */
  value: string;
  
  /** Whether the tab is currently active */
  isActive: boolean;
  
  /** Group-related CSS classes */
  groupClasses: Record<string, boolean>;
}

/**
 * VTab component methods
 */
export interface VTabMethods {
  /**
   * Handle tab click event
   * @param event - Mouse click event
   */
  click(event: MouseEvent): void;

  /**
   * Toggle tab active state
   */
  toggle(): void;

  /**
   * Generate route link configuration
   * @returns Tag name and VNode data
   */
  generateRouteLink(): {
    tag: string;
    data: VNodeData;
  };

  /**
   * Handle route change
   */
  onRouteChange(): void;
}

/**
 * VTab component events
 */
export interface VTabEvents {
  /**
   * Emitted when tab is clicked
   * @param event - Mouse click event
   */
  click: MouseEvent;

  /**
   * Emitted on keydown
   * @param event - Keyboard event
   */
  keydown: KeyboardEvent;
}

/**
 * VTab Vue component
 * Represents a single tab within a VTabs component
 */
declare const VTab: Vue & {
  /** Component props */
  $props: VTabProps;
  
  /** Component data */
  $data: VTabData;
  
  /** Computed properties */
  readonly $computed: VTabComputed;
  
  /** Component methods */
  $methods: VTabMethods;
  
  /** Current route (from vue-router) */
  $route: Route;
  
  /** Router instance (from vue-router) */
  $router?: import('vue-router').default;
  
  /**
   * Render function
   * @param createElement - Vue's createElement function
   * @returns Virtual DOM node
   */
  render(createElement: typeof Vue.prototype.$createElement): VNode;
};

export default VTab;