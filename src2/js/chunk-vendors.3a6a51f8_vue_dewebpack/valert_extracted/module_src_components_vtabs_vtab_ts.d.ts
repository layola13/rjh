/**
 * VTab component type definitions
 * A tab component that works with VTabs and integrates routing, theming, and groupable functionality
 */

import Vue, { VNode, VNodeData } from 'vue';
import { Route } from 'vue-router';

/**
 * Ripple effect configuration
 */
export interface RippleConfig {
  /** Custom ripple class */
  class?: string;
  /** Center the ripple effect */
  center?: boolean;
  /** Circle ripple shape */
  circle?: boolean;
}

/**
 * Route link data interface
 */
interface RouteLink {
  /** HTML tag or component to render */
  tag: string;
  /** VNode data including attrs, on, class, etc. */
  data: VNodeData;
}

/**
 * VTab component props
 */
export interface VTabProps {
  /** Enable or configure ripple effect */
  ripple?: boolean | RippleConfig;
  
  /** Disable the tab */
  disabled?: boolean;
  
  /** Router link target */
  to?: string | Location;
  
  /** Anchor href */
  href?: string;
  
  /** Append route to current path */
  append?: boolean;
  
  /** Apply theme dark variant */
  dark?: boolean;
  
  /** Apply theme light variant */
  light?: boolean;
}

/**
 * VTab component data
 */
interface VTabData {
  /** CSS class applied when tab is active */
  proxyClass: string;
}

/**
 * VTab component computed properties
 */
interface VTabComputed {
  /** Combined CSS classes for the tab */
  classes: Record<string, boolean>;
  
  /** Computed tab value from route or href */
  value: string;
  
  /** Whether the tab is currently active */
  isActive: boolean;
  
  /** Group-related CSS classes */
  groupClasses: Record<string, boolean>;
}

/**
 * VTab component methods
 */
interface VTabMethods {
  /**
   * Handle tab click event
   * @param event - Mouse event
   */
  click(event: MouseEvent): void;
  
  /**
   * Toggle tab active state
   */
  toggle(): void;
  
  /**
   * Generate route link configuration
   * @returns Route link data with tag and VNode data
   */
  generateRouteLink(): RouteLink;
  
  /**
   * Handle route change
   */
  onRouteChange(): void;
}

/**
 * VTab component instance
 */
export interface VTab extends Vue {
  // Props
  ripple: boolean | RippleConfig;
  disabled: boolean;
  to?: string | Location;
  href?: string;
  append: boolean;
  dark: boolean;
  light: boolean;
  
  // Data
  proxyClass: string;
  
  // Computed
  readonly classes: Record<string, boolean>;
  readonly value: string;
  readonly isActive: boolean;
  readonly groupClasses: Record<string, boolean>;
  
  // Methods
  click(event: MouseEvent): void;
  toggle(): void;
  generateRouteLink(): RouteLink;
  onRouteChange(): void;
  
  // Vue Router
  $router?: {
    resolve(
      to: string | Location,
      current?: Route,
      append?: boolean
    ): { href: string };
  };
  $route?: Route;
  
  // Events
  $emit(event: 'click', value: MouseEvent): this;
  $emit(event: 'keydown', value: KeyboardEvent): this;
}

/**
 * VTab component definition
 */
declare const VTab: {
  new (): VTab;
};

export default VTab;