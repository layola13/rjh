/**
 * Font Awesome icon preset configuration for UI components.
 * Maps semantic icon names to Font Awesome CSS classes.
 * 
 * @module IconPresets
 */

/**
 * Icon preset mapping for Font Awesome icons.
 * Each property represents a semantic action or state, mapped to its corresponding Font Awesome class.
 */
interface FontAwesomeIconPreset {
  /** Icon for completed/finished state */
  complete: string;
  
  /** Icon for cancel action */
  cancel: string;
  
  /** Icon for close action */
  close: string;
  
  /** Icon for delete action */
  delete: string;
  
  /** Icon for clear action */
  clear: string;
  
  /** Icon for success state */
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
  
  /** Icon for delimiter/separator */
  delimiter: string;
  
  /** Icon for sort action */
  sort: string;
  
  /** Icon for expand action */
  expand: string;
  
  /** Icon for menu */
  menu: string;
  
  /** Icon for subgroup indicator */
  subgroup: string;
  
  /** Icon for dropdown indicator */
  dropdown: string;
  
  /** Icon for selected radio button */
  radioOn: string;
  
  /** Icon for unselected radio button */
  radioOff: string;
  
  /** Icon for edit action */
  edit: string;
  
  /** Icon for empty rating star */
  ratingEmpty: string;
  
  /** Icon for full rating star */
  ratingFull: string;
  
  /** Icon for half rating star */
  ratingHalf: string;
  
  /** Icon for loading/syncing state */
  loading: string;
  
  /** Icon for first page navigation */
  first: string;
  
  /** Icon for last page navigation */
  last: string;
  
  /** Icon for unfold/expand vertically action */
  unfold: string;
  
  /** Icon for file attachment */
  file: string;
  
  /** Icon for add/plus action */
  plus: string;
  
  /** Icon for subtract/minus action */
  minus: string;
}

/**
 * Default Font Awesome icon preset configuration.
 * Provides a complete mapping of semantic icon names to Font Awesome 5 classes.
 */
declare const fontAwesomePreset: FontAwesomeIconPreset;

export default fontAwesomePreset;