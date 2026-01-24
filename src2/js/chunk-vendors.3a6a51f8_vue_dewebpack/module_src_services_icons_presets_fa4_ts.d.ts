/**
 * Font Awesome 4 icon preset configuration
 * Provides a complete mapping of UI action/state identifiers to FA4 CSS classes
 * @module fa4
 */

/**
 * Icon preset interface defining all available icon mappings
 * Each property represents a semantic UI action or state and maps to corresponding Font Awesome 4 CSS classes
 */
interface IconPreset {
  /** Icon for completion/confirmation actions */
  complete: string;
  /** Icon for cancel actions */
  cancel: string;
  /** Icon for close actions (e.g., dialogs, modals) */
  close: string;
  /** Icon for delete actions */
  delete: string;
  /** Icon for clear actions (e.g., clearing input fields) */
  clear: string;
  /** Icon indicating success state */
  success: string;
  /** Icon for informational messages */
  info: string;
  /** Icon for warning messages */
  warning: string;
  /** Icon for error states */
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
  /** Icon used as delimiter/separator */
  delimiter: string;
  /** Icon for sort functionality */
  sort: string;
  /** Icon for expand actions */
  expand: string;
  /** Icon for menu toggle */
  menu: string;
  /** Icon for subgroup indicators */
  subgroup: string;
  /** Icon for dropdown menus */
  dropdown: string;
  /** Icon for selected radio button state */
  radioOn: string;
  /** Icon for unselected radio button state */
  radioOff: string;
  /** Icon for edit actions */
  edit: string;
  /** Icon for empty rating star */
  ratingEmpty: string;
  /** Icon for filled rating star */
  ratingFull: string;
  /** Icon for half-filled rating star */
  ratingHalf: string;
  /** Icon for loading/spinner state */
  loading: string;
  /** Icon for navigation to first item */
  first: string;
  /** Icon for navigation to last item */
  last: string;
  /** Icon for unfold/expand all actions */
  unfold: string;
  /** Icon for file/attachment representation */
  file: string;
  /** Icon for add/plus actions */
  plus: string;
  /** Icon for remove/minus actions */
  minus: string;
}

/**
 * Default Font Awesome 4 icon preset
 * Maps semantic icon names to Font Awesome 4 CSS class strings
 */
declare const fa4Preset: IconPreset;

export default fa4Preset;