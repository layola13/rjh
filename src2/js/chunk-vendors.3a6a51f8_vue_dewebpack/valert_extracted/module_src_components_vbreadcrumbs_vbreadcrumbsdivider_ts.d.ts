/**
 * VBreadcrumbsDivider Component
 * 
 * A simple functional component that renders a breadcrumb divider element.
 * Used to visually separate breadcrumb items in the VBreadcrumbs component.
 * 
 * @module VBreadcrumbsDivider
 */

import { VNode } from 'vue';
import { FunctionalComponentOptions } from 'vue/types/options';

/**
 * Props for the VBreadcrumbsDivider component
 */
export interface VBreadcrumbsDividerProps {
  /**
   * Custom tag to render (defaults to 'li')
   */
  tag?: string;
}

/**
 * VBreadcrumbsDivider functional component
 * 
 * A lightweight component that renders a list item with the class 'v-breadcrumbs__divider'.
 * Typically used to display separator icons or text between breadcrumb items.
 * 
 * @example
 * <v-breadcrumbs-divider>/</v-breadcrumbs-divider>
 */
declare const VBreadcrumbsDivider: FunctionalComponentOptions<VBreadcrumbsDividerProps>;

export default VBreadcrumbsDivider;