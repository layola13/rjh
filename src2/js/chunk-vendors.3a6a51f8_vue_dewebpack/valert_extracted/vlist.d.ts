/**
 * VList Component Module
 * 
 * A collection of list components for displaying structured content.
 * Includes main list container and various item sub-components.
 */

import { VNode } from 'vue';
import { Component } from 'vue/types/options';

/**
 * Simple functional component for list item action text
 * Renders as a span element with class "v-list-item__action-text"
 */
export const VListItemActionText: Component;

/**
 * Simple functional component for list item content wrapper
 * Renders as a div element with class "v-list-item__content"
 */
export const VListItemContent: Component;

/**
 * Simple functional component for list item title
 * Renders as a div element with class "v-list-item__title"
 */
export const VListItemTitle: Component;

/**
 * Simple functional component for list item subtitle
 * Renders as a div element with class "v-list-item__subtitle"
 */
export const VListItemSubtitle: Component;

/**
 * Main VList component
 * Container for displaying lists of items with consistent styling
 */
export const VList: Component;

/**
 * VListGroup component
 * Groups multiple list items with optional expand/collapse functionality
 */
export const VListGroup: Component;

/**
 * VListItem component
 * Individual item within a list, supports various content types
 */
export const VListItem: Component;

/**
 * VListItemGroup component
 * Groups list items with selection/active state management
 */
export const VListItemGroup: Component;

/**
 * VListItemAction component
 * Container for action elements within a list item (buttons, icons, etc.)
 */
export const VListItemAction: Component;

/**
 * VListItemAvatar component
 * Displays avatar/image content within a list item
 */
export const VListItemAvatar: Component;

/**
 * VListItemIcon component
 * Displays icon content within a list item
 */
export const VListItemIcon: Component;

/**
 * Default export containing all VList sub-components
 * Used internally by Vuetify for component registration
 */
export default interface VListModule {
  /** Internal Vuetify sub-components registry */
  $_vuetify_subcomponents: {
    VList: Component;
    VListGroup: Component;
    VListItem: Component;
    VListItemAction: Component;
    VListItemActionText: Component;
    VListItemAvatar: Component;
    VListItemContent: Component;
    VListItemGroup: Component;
    VListItemIcon: Component;
    VListItemSubtitle: Component;
    VListItemTitle: Component;
  };
}