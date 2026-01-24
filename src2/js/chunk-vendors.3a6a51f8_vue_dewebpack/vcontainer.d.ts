/**
 * VGrid Module
 * 
 * A collection of grid layout components for building responsive layouts.
 * Provides container, row, column, spacer, and flex layout components.
 * 
 * @module VGrid
 */

/**
 * Container component for wrapping grid layouts
 * Provides consistent spacing and responsive behavior
 */
export declare const VContainer: any;

/**
 * Column component for grid layouts
 * Supports responsive column sizing and breakpoints
 */
export declare const VCol: any;

/**
 * Row component for horizontal grid layouts
 * Contains columns and manages their spacing
 */
export declare const VRow: any;

/**
 * Spacer component for adding flexible space between elements
 * Automatically fills available space in flex layouts
 */
export declare const VSpacer: any;

/**
 * Layout component for structured page layouts
 * Provides semantic layout structure
 */
export declare const VLayout: any;

/**
 * Flex component for flexible box layouts
 * Enables flexbox-based positioning and sizing
 */
export declare const VFlex: any;

/**
 * Default export containing all grid subcomponents
 * Used for Vuetify's internal component registration system
 */
declare const _default: {
  /**
   * Internal Vuetify property for subcomponent registration
   * Contains all exported grid components
   */
  $_vuetify_subcomponents: {
    VContainer: any;
    VCol: any;
    VRow: any;
    VSpacer: any;
    VLayout: any;
    VFlex: any;
  };
};

export default _default;