/**
 * VToolbar component module
 * Provides toolbar components for Vuetify applications
 */

import type { VNode } from 'vue';
import type { FunctionalComponentOptions } from 'vue/types/options';

/**
 * Functional component for toolbar items container
 * Renders a container with the 'v-toolbar__items' class
 */
export const VToolbarItems: FunctionalComponentOptions;

/**
 * Functional component for toolbar title
 * Renders a title element with the 'v-toolbar__title' class
 */
export const VToolbarTitle: FunctionalComponentOptions;

/**
 * Main toolbar component
 * Provides a flexible container for headers, navigation, and actions
 */
export interface VToolbar {
  /**
   * The height of the toolbar
   */
  height?: number | string;
  
  /**
   * Applies a flat style (removes box shadow)
   */
  flat?: boolean;
  
  /**
   * Applies a dense style (reduced height)
   */
  dense?: boolean;
  
  /**
   * Makes the toolbar prominent (increased height)
   */
  prominent?: boolean;
  
  /**
   * Sets the toolbar color
   */
  color?: string;
  
  /**
   * Makes the toolbar dark themed
   */
  dark?: boolean;
  
  /**
   * Makes the toolbar light themed
   */
  light?: boolean;
  
  /**
   * Applies an extended style with custom extension slot
   */
  extended?: boolean;
  
  /**
   * Height of the extension slot content
   */
  extensionHeight?: number | string;
}

export const VToolbar: VToolbar;

/**
 * Default export containing all toolbar subcomponents
 */
export default interface VToolbarModule {
  /**
   * Internal Vuetify subcomponents registry
   */
  $_vuetify_subcomponents: {
    VToolbar: typeof VToolbar;
    VToolbarItems: typeof VToolbarItems;
    VToolbarTitle: typeof VToolbarTitle;
  };
}