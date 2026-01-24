/**
 * Time picker localization configuration
 * Provides default placeholder text for time selection components
 */
export interface TimePickerLocale {
  /**
   * Placeholder text for single time picker input
   * @example "Select time"
   */
  placeholder: string;

  /**
   * Placeholder text array for time range picker inputs
   * @example ["Start time", "End time"]
   */
  rangePlaceholder: [string, string];
}

/**
 * Default English locale configuration for time picker component
 */
declare const timePickerLocale: TimePickerLocale;

export default timePickerLocale;