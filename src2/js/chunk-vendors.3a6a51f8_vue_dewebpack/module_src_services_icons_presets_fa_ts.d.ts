/**
 * Font Awesome icon preset configuration for the icon service.
 * Maps semantic icon names to Font Awesome CSS class strings.
 * @module IconPresets
 */

/**
 * Font Awesome icon preset mapping.
 * Provides a consistent set of icon names mapped to Font Awesome 5.x classes.
 */
export interface FontAwesomeIconPreset {
  /** Icon indicating completion or confirmation */
  complete: string;
  /** Icon for cancel actions */
  cancel: string;
  /** Icon for close/dismiss actions */
  close: string;
  /** Icon for delete actions */
  delete: string;
  /** Icon for clear actions */
  clear: string;
  /** Icon indicating successful operation */
  success: string;
  /** Icon for informational messages */
  info: string;
  /** Icon for warning messages */
  warning: string;
  /** Icon for error messages */
  error: string;
  /** Icon for previous/back navigation */
  prev: string;
  /** Icon for next/forward navigation */
  next: string;
  /** Icon for checked checkbox state */
  checkboxOn: string;
  /** Icon for unchecked checkbox state */
  checkboxOff: string;
  /** Icon for indeterminate checkbox state */
  checkboxIndeterminate: string;
  /** Icon used as delimiter or separator */
  delimiter: string;
  /** Icon for sort functionality */
  sort: string;
  /** Icon for expand actions */
  expand: string;
  /** Icon for menu toggle */
  menu: string;
  /** Icon for subgroup indicators */
  subgroup: string;
  /** Icon for dropdown indicators */
  dropdown: string;
  /** Icon for selected radio button state */
  radioOn: string;
  /** Icon for unselected radio button state */
  radioOff: string;
  /** Icon for edit actions */
  edit: string;
  /** Icon for empty rating state */
  ratingEmpty: string;
  /** Icon for full rating state */
  ratingFull: string;
  /** Icon for half rating state */
  ratingHalf: string;
  /** Icon for loading/spinner state */
  loading: string;
  /** Icon for first page navigation */
  first: string;
  /** Icon for last page navigation */
  last: string;
  /** Icon for unfold/expand all actions */
  unfold: string;
  /** Icon for file representation */
  file: string;
  /** Icon for add/plus actions */
  plus: string;
  /** Icon for remove/minus actions */
  minus: string;
}

/**
 * Default Font Awesome icon preset configuration.
 * Uses Font Awesome Solid (fas) and Regular (far) icon sets.
 */
declare const fontAwesomePreset: FontAwesomeIconPreset;

export default fontAwesomePreset;