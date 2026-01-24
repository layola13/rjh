/**
 * VBreadcrumbs Component Module
 * 
 * Provides breadcrumb navigation components for building hierarchical navigation trails.
 * 
 * @module VBreadcrumbs
 */

import { Component } from 'vue';

/**
 * Main breadcrumbs container component.
 * Renders a horizontal list of breadcrumb items with dividers.
 */
export declare const VBreadcrumbs: Component;

/**
 * Individual breadcrumb item component.
 * Represents a single link or text node in the breadcrumb trail.
 */
export declare const VBreadcrumbsItem: Component;

/**
 * Breadcrumb divider component.
 * Renders the separator between breadcrumb items (e.g., "/", ">", "›").
 */
export declare const VBreadcrumbsDivider: Component;

/**
 * Default export containing all breadcrumb subcomponents.
 * Used for internal Vuetify component registration.
 */
declare const _default: {
  /**
   * Registry of breadcrumb subcomponents for Vuetify's internal component system.
   */
  $_vuetify_subcomponents: {
    VBreadcrumbs: Component;
    VBreadcrumbsItem: Component;
    VBreadcrumbsDivider: Component;
  };
};

export default _default;