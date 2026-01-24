/**
 * VBreadcrumbs component type definitions
 * Displays a breadcrumb navigation component with customizable items and dividers
 */

import Vue from 'vue';
import { VNode, VNodeChildren, CreateElement, ScopedSlot } from 'vue';

/**
 * Breadcrumb item configuration
 */
export interface BreadcrumbItem {
  /** The text content to display for this breadcrumb item */
  text: string;
  /** Whether this breadcrumb item is disabled */
  disabled?: boolean;
  /** The href attribute for the breadcrumb link */
  href?: string;
  /** Router link location object */
  to?: string | object;
  /** Whether to use exact matching for active link */
  exact?: boolean;
  /** Additional props to pass to VBreadcrumbsItem */
  [key: string]: any;
}

/**
 * Scoped slot scope for item slot
 */
export interface ItemSlotScope {
  /** The current breadcrumb item */
  item: BreadcrumbItem;
}

/**
 * VBreadcrumbs component props
 */
export interface VBreadcrumbsProps {
  /** The divider character or string to display between items */
  divider?: string;
  /** Array of breadcrumb items to display */
  items?: BreadcrumbItem[];
  /** Whether to use large size styling */
  large?: boolean;
  /** Applies the dark theme variant */
  dark?: boolean;
  /** Applies the light theme variant */
  light?: boolean;
}

/**
 * VBreadcrumbs component slots
 */
export interface VBreadcrumbsSlots {
  /** Default slot for custom breadcrumb content */
  default?: VNodeChildren;
  /** Custom divider content */
  divider?: VNodeChildren;
}

/**
 * VBreadcrumbs component scoped slots
 */
export interface VBreadcrumbsScopedSlots {
  /** Custom rendering for each breadcrumb item */
  item?: ScopedSlot<ItemSlotScope>;
}

/**
 * VBreadcrumbs Vue component instance
 */
export interface VBreadcrumbs extends Vue {
  // Props
  divider: string;
  items: BreadcrumbItem[];
  large: boolean;
  
  // Computed
  /** Computed CSS classes including theme and size variants */
  readonly classes: Record<string, boolean>;
  /** Theme classes from themeable mixin */
  readonly themeClasses: Record<string, boolean>;
  
  // Methods
  /**
   * Generates the divider VNode element
   * @returns VNode for the breadcrumb divider
   */
  genDivider(): VNode;
  
  /**
   * Generates array of breadcrumb item VNodes
   * @returns Array of VNodes representing breadcrumb items and dividers
   */
  genItems(): VNode[];
  
  /**
   * Render function for the component
   * @param h - CreateElement function from Vue
   * @returns Root VNode for the breadcrumbs list
   */
  render(h: CreateElement): VNode;
  
  // Slots
  $slots: VBreadcrumbsSlots;
  $scopedSlots: VBreadcrumbsScopedSlots;
}

/**
 * VBreadcrumbs component constructor
 */
declare const VBreadcrumbs: {
  new (): VBreadcrumbs;
};

export default VBreadcrumbs;