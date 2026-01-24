import Vue, { VNode, VueConstructor } from 'vue';
import { PropValidator } from 'vue/types/options';

/**
 * Props interface for VListItem component
 */
export interface VListItemProps {
  /** Custom active CSS class - defaults to listItemGroup's activeClass if available */
  activeClass?: string;
  /** Reduces the list item height for compact layouts */
  dense?: boolean;
  /** Removes interactive styling and behavior */
  inactive?: boolean;
  /** Explicitly marks the item as a link (auto-detected if routable props are present) */
  link?: boolean;
  /** Enables selectable state styling */
  selectable?: boolean;
  /** HTML tag to render as root element */
  tag?: string;
  /** Increases height to accommodate three lines of text */
  threeLine?: boolean;
  /** Increases height to accommodate two lines of text */
  twoLine?: boolean;
  /** Value used when component is part of a group (for v-model binding) */
  value?: any;
  /** Disables the list item */
  disabled?: boolean;
  /** Text color (from colorable mixin) */
  color?: string;
  /** Router link destination (from routable mixin) */
  to?: string | object;
  /** Router link href (from routable mixin) */
  href?: string;
  /** Opens link in new window (from routable mixin) */
  target?: string;
  /** Whether to use exact route matching (from routable mixin) */
  exact?: boolean;
  /** Whether to append to current path (from routable mixin) */
  append?: boolean;
  /** Whether to replace history entry (from routable mixin) */
  replace?: boolean;
  /** Applies dark theme variant */
  dark?: boolean;
  /** Applies light theme variant */
  light?: boolean;
}

/**
 * Computed properties interface
 */
export interface VListItemComputed {
  /** Combined CSS classes for the component */
  classes: Record<string, boolean>;
  /** Whether the item can be clicked/interacted with */
  isClickable: boolean;
  /** Whether the item is currently active (from groupable) */
  isActive: boolean;
  /** Theme CSS classes (from themeable) */
  themeClasses: Record<string, boolean>;
}

/**
 * Methods interface
 */
export interface VListItemMethods {
  /**
   * Handles click events on the list item
   * @param event - Native click event
   */
  click(event: MouseEvent): void;
  
  /**
   * Generates HTML attributes for the root element
   * @returns Attribute object with aria-* and role properties
   */
  genAttrs(): Record<string, string | number | boolean | undefined>;
  
  /**
   * Toggles the active state (from toggleable mixin)
   */
  toggle(): void;
  
  /**
   * Generates route link data (from routable mixin)
   */
  generateRouteLink(): {
    tag: string;
    data: Record<string, any>;
  };
  
  /**
   * Sets text color on data object (from colorable mixin)
   */
  setTextColor(color: string | undefined, data: Record<string, any>): Record<string, any>;
}

/**
 * Injected properties from parent components
 */
export interface VListItemInjected {
  /** Whether the item is inside a v-list-item-group */
  isInGroup: boolean;
  /** Whether the item is inside a v-list */
  isInList: boolean;
  /** Whether the item is inside a v-menu */
  isInMenu: boolean;
  /** Whether the item is inside a v-navigation-drawer */
  isInNav: boolean;
  /** Reference to parent list item group (if any) */
  listItemGroup?: {
    activeClass: string;
    register(item: any): void;
    unregister(item: any): void;
  };
}

/**
 * Scoped slot interface
 */
export interface VListItemScopedSlots {
  default?: {
    /** Whether the list item is currently active */
    active: boolean;
    /** Function to toggle the active state */
    toggle: () => void;
  };
}

/**
 * VListItem component - Interactive list item with routing, grouping, and theming support
 * 
 * @remarks
 * This component combines multiple mixins:
 * - colorable: Provides color theming
 * - routable: Enables router-link functionality
 * - themeable: Dark/light theme support
 * - groupable: Integration with v-list-item-group
 * - toggleable: Active state management
 * 
 * @example
 *