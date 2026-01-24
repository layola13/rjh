/**
 * VList Component Module
 * 
 * Provides a collection of list components for displaying structured content.
 * Includes list containers, items, groups, and various item sub-components.
 */

import type { VNode } from 'vue';
import type { Component, FunctionalComponentOptions } from 'vue';

/**
 * Simple functional component type for list item elements
 */
export type SimpleFunctionalComponent = FunctionalComponentOptions<Record<string, any>>;

/**
 * VListItemActionText - Functional component for action text within list items
 * Renders as a <span> with class "v-list-item__action-text"
 */
export const VListItemActionText: SimpleFunctionalComponent;

/**
 * VListItemContent - Functional component for list item content wrapper
 * Renders as a <div> with class "v-list-item__content"
 */
export const VListItemContent: SimpleFunctionalComponent;

/**
 * VListItemTitle - Functional component for list item title
 * Renders as a <div> with class "v-list-item__title"
 */
export const VListItemTitle: SimpleFunctionalComponent;

/**
 * VListItemSubtitle - Functional component for list item subtitle
 * Renders as a <div> with class "v-list-item__subtitle"
 */
export const VListItemSubtitle: SimpleFunctionalComponent;

/**
 * VList - Main list container component
 * Used to display a collection of list items
 */
export const VList: Component;

/**
 * VListGroup - Component for grouping related list items with expand/collapse functionality
 */
export const VListGroup: Component;

/**
 * VListItem - Individual list item component
 * Represents a single item within a VList
 */
export const VListItem: Component;

/**
 * VListItemGroup - Component for grouping selectable list items
 */
export const VListItemGroup: Component;

/**
 * VListItemAction - Component for action elements within list items
 * Typically used for buttons, checkboxes, or icons
 */
export const VListItemAction: Component;

/**
 * VListItemAvatar - Component for displaying avatar images in list items
 */
export const VListItemAvatar: Component;

/**
 * VListItemIcon - Component for displaying icons in list items
 */
export const VListItemIcon: Component;

/**
 * Default export containing all VList subcomponents
 * Used for Vuetify's internal component registration
 */
export interface VListSubcomponents {
  VList: Component;
  VListGroup: Component;
  VListItem: Component;
  VListItemAction: Component;
  VListItemActionText: SimpleFunctionalComponent;
  VListItemAvatar: Component;
  VListItemContent: SimpleFunctionalComponent;
  VListItemGroup: Component;
  VListItemIcon: Component;
  VListItemSubtitle: SimpleFunctionalComponent;
  VListItemTitle: SimpleFunctionalComponent;
}

declare const _default: {
  $_vuetify_subcomponents: VListSubcomponents;
};

export default _default;