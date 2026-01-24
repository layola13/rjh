/**
 * VTabs Module
 * 
 * Provides a complete tabs component system including:
 * - VTabs: Main tabs container component
 * - VTab: Individual tab component
 * - VTabsItems: Container for tab content panels
 * - VTabItem: Individual tab content panel
 * - VTabsSlider: Visual slider indicator for active tab
 * 
 * @module VTabs
 */

/**
 * Main tabs container component that manages tab navigation
 */
export declare const VTabs: any;

/**
 * Individual tab component representing a clickable tab header
 */
export declare const VTab: any;

/**
 * Container component for managing tab content panels
 */
export declare const VTabsItems: any;

/**
 * Individual tab content panel component
 */
export declare const VTabItem: any;

/**
 * Visual slider indicator that shows the currently active tab
 */
export declare const VTabsSlider: any;

/**
 * Vuetify subcomponents registry for the VTabs module
 */
interface VTabsModule {
  /**
   * Internal Vuetify subcomponents registry
   */
  $_vuetify_subcomponents: {
    VTabs: any;
    VTab: any;
    VTabsItems: any;
    VTabItem: any;
    VTabsSlider: any;
  };
}

/**
 * Default export containing all VTabs subcomponents
 */
declare const _default: VTabsModule;
export default _default;