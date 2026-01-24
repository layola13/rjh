/**
 * VTimePicker Component Module
 * 
 * A comprehensive time picker component library with supporting sub-components
 * for clock display and title rendering.
 * 
 * @module VTimePicker
 */

/**
 * Main time picker component
 * 
 * Provides a complete interface for selecting time values with various
 * configuration options for format, appearance, and behavior.
 */
export declare const VTimePicker: any;

/**
 * Time picker clock face component
 * 
 * Renders the interactive clock face UI allowing users to select
 * hours and minutes through a circular interface.
 */
export declare const VTimePickerClock: any;

/**
 * Time picker title/header component
 * 
 * Displays the currently selected time value in the picker's header area,
 * typically showing formatted hours and minutes.
 */
export declare const VTimePickerTitle: any;

/**
 * Default export containing all VTimePicker sub-components
 * 
 * Provides a structured object with all time picker related components
 * organized under the Vuetify sub-components convention.
 */
declare const _default: {
  /**
   * Collection of all VTimePicker sub-components
   * Following Vuetify's internal component registration pattern
   */
  $_vuetify_subcomponents: {
    /** Main time picker component */
    VTimePicker: any;
    /** Clock face display component */
    VTimePickerClock: any;
    /** Title/header display component */
    VTimePickerTitle: any;
  };
};

export default _default;