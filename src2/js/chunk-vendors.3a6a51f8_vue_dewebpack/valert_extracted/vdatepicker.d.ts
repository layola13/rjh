/**
 * VDatePicker component module
 * 
 * This module exports the main VDatePicker component along with its sub-components
 * for building a complete date picker interface.
 * 
 * @module VDatePicker
 */

/**
 * Main date picker component
 * Provides a complete date selection interface with calendar view
 */
export declare const VDatePicker: any;

/**
 * Date picker title component
 * Displays the selected date in the title area of the date picker
 */
export declare const VDatePickerTitle: any;

/**
 * Date picker header component
 * Contains navigation controls for switching between months/years
 */
export declare const VDatePickerHeader: any;

/**
 * Date picker date table component
 * Renders the calendar grid showing days of the month
 */
export declare const VDatePickerDateTable: any;

/**
 * Date picker month table component
 * Displays a grid of months for month selection
 */
export declare const VDatePickerMonthTable: any;

/**
 * Date picker years component
 * Provides a scrollable list of years for year selection
 */
export declare const VDatePickerYears: any;

/**
 * Default export containing all sub-components
 * Used internally by Vuetify for component registration
 */
declare const _default: {
  /**
   * Internal Vuetify property for registering sub-components
   */
  $_vuetify_subcomponents: {
    VDatePicker: any;
    VDatePickerTitle: any;
    VDatePickerHeader: any;
    VDatePickerDateTable: any;
    VDatePickerMonthTable: any;
    VDatePickerYears: any;
  };
};

export default _default;