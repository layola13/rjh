/**
 * VDatePicker component module
 * 
 * This module exports the main VDatePicker component along with its sub-components
 * for building a complete date picker UI.
 */

/**
 * Main date picker component
 * Provides a full-featured date selection interface
 */
export declare const VDatePicker: any;

/**
 * Date picker title component
 * Displays the selected date in the header area
 */
export declare const VDatePickerTitle: any;

/**
 * Date picker header component
 * Contains navigation controls for month/year selection
 */
export declare const VDatePickerHeader: any;

/**
 * Date picker date table component
 * Renders the calendar grid for selecting individual days
 */
export declare const VDatePickerDateTable: any;

/**
 * Date picker month table component
 * Displays a grid for selecting months
 */
export declare const VDatePickerMonthTable: any;

/**
 * Date picker years component
 * Provides a scrollable list for year selection
 */
export declare const VDatePickerYears: any;

/**
 * Default export containing all sub-components
 * Used internally by Vuetify's component registration system
 */
export default interface VDatePickerModule {
  /**
   * Internal registry of all date picker sub-components
   * @internal
   */
  $_vuetify_subcomponents: {
    VDatePicker: typeof VDatePicker;
    VDatePickerTitle: typeof VDatePickerTitle;
    VDatePickerHeader: typeof VDatePickerHeader;
    VDatePickerDateTable: typeof VDatePickerDateTable;
    VDatePickerMonthTable: typeof VDatePickerMonthTable;
    VDatePickerYears: typeof VDatePickerYears;
  };
}