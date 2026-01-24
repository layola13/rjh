/**
 * Font Awesome 4 icon preset configuration
 * Provides mapping of semantic icon names to Font Awesome 4 CSS classes
 * @module fa4
 */

/**
 * Icon preset interface defining all available icon mappings
 */
export interface IconPreset {
  /** Icon indicating completion or confirmation action */
  complete: string;
  
  /** Icon for cancel action */
  cancel: string;
  
  /** Icon for close/dismiss action */
  close: string;
  
  /** Icon for delete action */
  delete: string;
  
  /** Icon for clear action */
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
  
  /** Icon for sortable columns */
  sort: string;
  
  /** Icon for expand action */
  expand: string;
  
  /** Icon for menu/hamburger button */
  menu: string;
  
  /** Icon for subgroup indicator */
  subgroup: string;
  
  /** Icon for dropdown menus */
  dropdown: string;
  
  /** Icon for selected radio button state */
  radioOn: string;
  
  /** Icon for unselected radio button state */
  radioOff: string;
  
  /** Icon for edit action */
  edit: string;
  
  /** Icon for empty rating star */
  ratingEmpty: string;
  
  /** Icon for filled rating star */
  ratingFull: string;
  
  /** Icon for half-filled rating star */
  ratingHalf: string;
  
  /** Icon for loading/spinner state */
  loading: string;
  
  /** Icon for first page navigation */
  first: string;
  
  /** Icon for last page navigation */
  last: string;
  
  /** Icon for unfold/expand all action */
  unfold: string;
  
  /** Icon representing file attachment */
  file: string;
  
  /** Icon for add/plus action */
  plus: string;
  
  /** Icon for subtract/minus action */
  minus: string;
}

/**
 * Font Awesome 4 icon preset
 * Maps semantic icon names to Font Awesome 4 CSS class names
 */
declare const fa4Preset: IconPreset;

export default fa4Preset;