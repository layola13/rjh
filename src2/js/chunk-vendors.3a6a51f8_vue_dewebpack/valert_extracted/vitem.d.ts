/**
 * VItemGroup module - Provides grouping functionality for selectable items
 * @module VItemGroup
 */

/**
 * Individual selectable item component within a VItemGroup
 * @component VItem
 */
export declare const VItem: any;

/**
 * Container component that manages a group of selectable VItem components
 * Handles selection state, active items, and group behavior
 * @component VItemGroup
 */
export declare const VItemGroup: any;

/**
 * Default export containing Vuetify subcomponents
 * Used for component registration and internal Vuetify integration
 */
declare const _default: {
  /**
   * Internal Vuetify property containing child components
   * @internal
   */
  $_vuetify_subcomponents: {
    /** VItem component reference */
    VItem: any;
    /** VItemGroup component reference */
    VItemGroup: any;
  };
};

export default _default;