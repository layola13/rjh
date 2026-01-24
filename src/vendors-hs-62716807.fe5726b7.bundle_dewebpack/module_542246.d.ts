/**
 * Time picker locale configuration
 * Provides localized strings for time picker component placeholders
 */
interface TimePickerLocale {
  /**
   * Placeholder text displayed when no time is selected
   * @example "Select time"
   */
  placeholder: string;

  /**
   * Placeholder texts for time range picker
   * First element is for start time, second for end time
   * @example ["Start time", "End time"]
   */
  rangePlaceholder: [string, string];
}

/**
 * Default English locale configuration for time picker
 */
declare const timePickerLocale: TimePickerLocale;

export default timePickerLocale;