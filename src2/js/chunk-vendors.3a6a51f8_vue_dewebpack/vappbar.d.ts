/**
 * VAppBar Module
 * 
 * Provides the VAppBar component and VAppBarNavIcon component for application toolbars.
 * This module serves as the main entry point for app bar related components.
 */

import { Component } from 'vue';

/**
 * Main application bar component
 * 
 * A container component typically used at the top of an application to display
 * navigation controls, branding, and actions.
 */
export declare const VAppBar: Component;

/**
 * Navigation icon button component for the app bar
 * 
 * A specialized button component commonly used to toggle navigation drawers
 * or display the "hamburger" menu icon.
 */
export declare const VAppBarNavIcon: Component;

/**
 * Default export containing all app bar subcomponents
 * 
 * Used internally by Vuetify for component registration and management.
 */
declare const _default: {
  /**
   * Internal Vuetify property containing subcomponent references
   * @internal
   */
  $_vuetify_subcomponents: {
    /** Main app bar component reference */
    VAppBar: Component;
    /** Nav icon button component reference */
    VAppBarNavIcon: Component;
  };
};

export default _default;