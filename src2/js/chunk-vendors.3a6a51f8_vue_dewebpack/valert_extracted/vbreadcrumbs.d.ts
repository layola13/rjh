/**
 * VBreadcrumbs Component Module
 * 
 * Provides breadcrumb navigation components for Vuetify applications.
 * Includes the main container, individual items, and divider components.
 */

import { Component } from 'vue';

/**
 * Main breadcrumbs container component
 * 
 * Displays a horizontal list of navigation links showing the user's location
 * within the application hierarchy.
 */
export declare const VBreadcrumbs: Component;

/**
 * Individual breadcrumb item component
 * 
 * Represents a single clickable or non-clickable item in the breadcrumb trail.
 * Typically used to display page names or navigation links.
 */
export declare const VBreadcrumbsItem: Component;

/**
 * Breadcrumb divider component
 * 
 * Visual separator between breadcrumb items (e.g., "/", ">", or custom content).
 */
export declare const VBreadcrumbsDivider: Component;

/**
 * Default export containing all VBreadcrumbs subcomponents
 * 
 * Provides a grouped export of all breadcrumb-related components
 * for convenient registration in Vuetify.
 */
declare const _default: {
  /**
   * Internal Vuetify metadata containing all breadcrumb subcomponents
   */
  $_vuetify_subcomponents: {
    VBreadcrumbs: Component;
    VBreadcrumbsItem: Component;
    VBreadcrumbsDivider: Component;
  };
};

export default _default;