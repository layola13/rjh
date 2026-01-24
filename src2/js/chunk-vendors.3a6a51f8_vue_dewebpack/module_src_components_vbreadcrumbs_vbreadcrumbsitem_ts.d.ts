/**
 * VBreadcrumbsItem Component Type Definitions
 * A breadcrumb item component that supports routing and active states
 */

import Vue, { VNode, VNodeData } from 'vue';
import { RippleOptions } from '../../directives/ripple';

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
   * Enables or configures ripple effect on the breadcrumb item
   * @default false
   */
  ripple?: boolean | RippleOptions;

  /**
   * Router link destination (inherited from routable mixin)
   */
  to?: string | object;

  /**
   * Exact route matching (inherited from routable mixin)
   */
  exact?: boolean;

  /**
   * Renders as anchor tag with href (inherited from routable mixin)
   */
  href?: string;

  /**
   * Target attribute for links (inherited from routable mixin)
   */
  target?: string;

  /**
   * Append route to current path (inherited from routable mixin)
   */
  append?: boolean;

  /**
   * Replace current history entry instead of pushing (inherited from routable mixin)
   */
  replace?: boolean;

  /**
   * Disables the breadcrumb item
   */
  disabled?: boolean;
}

/**
 * Computed properties for VBreadcrumbsItem component
 */
export interface VBreadcrumbsItemComputed {
  /**
   * Computed CSS classes for the breadcrumb item
   * Includes base class and active class when disabled
   */
  classes: Record<string, boolean>;

  /**
   * Whether the route is currently active (inherited from routable mixin)
   */
  isActive: boolean;

  /**
   * Whether the item is rendered as a link (inherited from routable mixin)
   */
  isLink: boolean;
}

/**
 * Methods for VBreadcrumbsItem component
 */
export interface VBreadcrumbsItemMethods {
  /**
   * Generates route link data for rendering
   * @returns Object containing tag name and VNode data
   */
  generateRouteLink(): {
    tag: string;
    data: VNodeData;
  };
}

/**
 * VBreadcrumbsItem component instance type
 */
export interface VBreadcrumbsItem extends Vue {
  // Props
  activeClass: string;
  ripple: boolean | RippleOptions;
  disabled: boolean;

  // Computed
  readonly classes: Record<string, boolean>;
  readonly isActive: boolean;
  readonly isLink: boolean;

  // Methods
  generateRouteLink(): {
    tag: string;
    data: VNodeData;
  };

  // Render function
  render(createElement: typeof Vue.prototype.$createElement): VNode;
}

/**
 * VBreadcrumbsItem component declaration
 */
declare const VBreadcrumbsItem: {
  new (): VBreadcrumbsItem;
};

export default VBreadcrumbsItem;