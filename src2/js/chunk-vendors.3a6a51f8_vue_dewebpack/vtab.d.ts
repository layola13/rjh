/**
 * VTabs Component Module
 * 
 * Provides a complete tab system with navigation tabs, content panels, and slider indicator.
 * Part of Vuetify component library.
 * 
 * @module VTabs
 * @see {@link https://vuetifyjs.com/components/tabs}
 */

/**
 * Main tabs container component that manages tab navigation
 * 
 * @component VTabs
 * @description Container for tab headers with integrated slider and navigation controls
 */
export declare const VTabs: any;

/**
 * Individual tab component representing a single tab header
 * 
 * @component VTab
 * @description Clickable tab header item that triggers content switching
 */
export declare const VTab: any;

/**
 * Container component for tab content panels
 * 
 * @component VTabsItems
 * @description Manages the display and transitions of tab content panels
 */
export declare const VTabsItems: any;

/**
 * Individual tab content panel component
 * 
 * @component VTabItem
 * @description Contains the content displayed when its corresponding tab is active
 */
export declare const VTabItem: any;

/**
 * Visual indicator component that slides under the active tab
 * 
 * @component VTabsSlider
 * @description Animated underline or bar that highlights the currently selected tab
 */
export declare const VTabsSlider: any;

/**
 * Default export containing all VTabs subcomponents
 * 
 * @description Aggregated export for registering all tab-related components at once
 */
declare const _default: {
  /**
   * Internal Vuetify property mapping component names to implementations
   * @internal
   */
  $_vuetify_subcomponents: {
    /** Main tabs container component */
    VTabs: any;
    /** Individual tab header component */
    VTab: any;
    /** Tab content panels container */
    VTabsItems: any;
    /** Individual tab content panel */
    VTabItem: any;
    /** Active tab indicator slider */
    VTabsSlider: any;
  };
};

export default _default;