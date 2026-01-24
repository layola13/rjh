/**
 * Material Design icon preset configuration
 * Maps semantic action names to Material Design icon identifiers
 * @module IconPresets
 */

/**
 * Icon preset type definition
 * Defines mappings between UI action semantics and their corresponding icon identifiers
 */
export interface MaterialDesignIconPreset {
  /** Icon for completed/confirmed actions */
  complete: string;
  
  /** Icon for cancel operations */
  cancel: string;
  
  /** Icon for close/dismiss actions */
  close: string;
  
  /** Icon for delete operations */
  delete: string;
  
  /** Icon for clear/reset actions */
  clear: string;
  
  /** Icon indicating successful operations */
  success: string;
  
  /** Icon for informational messages */
  info: string;
  
  /** Icon for warning states */
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
  
  /** Icon for expand/collapse actions */
  expand: string;
  
  /** Icon for menu trigger */
  menu: string;
  
  /** Icon for subgroup indicators */
  subgroup: string;
  
  /** Icon for dropdown menus */
  dropdown: string;
  
  /** Icon for selected radio button */
  radioOn: string;
  
  /** Icon for unselected radio button */
  radioOff: string;
  
  /** Icon for edit actions */
  edit: string;
  
  /** Icon for empty rating state */
  ratingEmpty: string;
  
  /** Icon for full rating state */
  ratingFull: string;
  
  /** Icon for half rating state */
  ratingHalf: string;
  
  /** Icon for loading/processing state */
  loading: string;
  
  /** Icon for first page navigation */
  first: string;
  
  /** Icon for last page navigation */
  last: string;
  
  /** Icon for unfold/expand all actions */
  unfold: string;
  
  /** Icon for file attachments */
  file: string;
  
  /** Icon for add/create actions */
  plus: string;
  
  /** Icon for remove/subtract actions */
  minus: string;
}

/**
 * Default Material Design icon preset
 * Provides standard Material Icons identifiers for common UI actions
 */
declare const materialDesignIconPreset: MaterialDesignIconPreset;

export default materialDesignIconPreset;