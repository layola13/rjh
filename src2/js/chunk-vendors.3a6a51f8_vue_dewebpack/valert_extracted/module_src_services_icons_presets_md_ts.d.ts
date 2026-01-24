/**
 * Material Design icon preset configuration
 * Maps semantic icon names to Material Design icon identifiers
 * @module md
 */

/**
 * Icon preset mapping interface
 * Defines all available icon slots and their corresponding Material Design icon names
 */
export interface MaterialDesignIconPreset {
  /** Icon for completion or confirmation actions */
  complete: string;
  
  /** Icon for cancel actions */
  cancel: string;
  
  /** Icon for close actions (dialogs, modals, etc.) */
  close: string;
  
  /** Icon for delete actions */
  delete: string;
  
  /** Icon for clear/reset actions */
  clear: string;
  
  /** Icon for success states or messages */
  success: string;
  
  /** Icon for informational messages */
  info: string;
  
  /** Icon for warning messages */
  warning: string;
  
  /** Icon for error states or messages */
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
  
  /** Icon for delimiter or separator */
  delimiter: string;
  
  /** Icon for sort actions */
  sort: string;
  
  /** Icon for expand/collapse actions */
  expand: string;
  
  /** Icon for menu button */
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
  
  /** Icon for empty rating star */
  ratingEmpty: string;
  
  /** Icon for filled rating star */
  ratingFull: string;
  
  /** Icon for half-filled rating star */
  ratingHalf: string;
  
  /** Icon for loading states */
  loading: string;
  
  /** Icon for first page navigation */
  first: string;
  
  /** Icon for last page navigation */
  last: string;
  
  /** Icon for unfold/expand all actions */
  unfold: string;
  
  /** Icon for file attachments */
  file: string;
  
  /** Icon for add/plus actions */
  plus: string;
  
  /** Icon for remove/minus actions */
  minus: string;
}

/**
 * Default Material Design icon preset
 * Pre-configured mapping of semantic names to Material Design Icons
 */
declare const materialDesignPreset: MaterialDesignIconPreset;

export default materialDesignPreset;