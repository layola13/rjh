/**
 * Material Design Icons (MDI) preset configuration for icon mappings.
 * 
 * This module provides a complete set of icon name mappings from semantic names
 * to Material Design Icons class names. Used for consistent icon rendering
 * across UI components.
 * 
 * @module mdi
 */

/**
 * Icon preset configuration object mapping semantic icon names to MDI class names.
 * 
 * Each property represents a semantic action or state, mapped to its corresponding
 * Material Design Icon CSS class identifier.
 */
export interface MdiIconPreset {
  /** Icon for completion/confirmation actions */
  complete: string;
  
  /** Icon for cancel actions */
  cancel: string;
  
  /** Icon for close/dismiss actions */
  close: string;
  
  /** Icon for delete actions */
  delete: string;
  
  /** Icon for clear/reset actions */
  clear: string;
  
  /** Icon for success states */
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
  
  /** Icon for empty rating state */
  ratingEmpty: string;
  
  /** Icon for full rating state */
  ratingFull: string;
  
  /** Icon for half rating state */
  ratingHalf: string;
  
  /** Icon for loading state */
  loading: string;
  
  /** Icon for first page navigation */
  first: string;
  
  /** Icon for last page navigation */
  last: string;
  
  /** Icon for unfold/expand all action */
  unfold: string;
  
  /** Icon for file representation */
  file: string;
  
  /** Icon for add/plus action */
  plus: string;
  
  /** Icon for subtract/minus action */
  minus: string;
}

/**
 * Default Material Design Icons preset configuration.
 * 
 * Maps semantic icon names to MDI CSS class identifiers (prefixed with "mdi-").
 * This configuration can be used with icon libraries that support MDI.
 */
declare const mdiPreset: MdiIconPreset;

export default mdiPreset;