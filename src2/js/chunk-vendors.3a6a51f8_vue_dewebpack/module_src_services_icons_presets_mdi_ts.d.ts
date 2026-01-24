/**
 * Material Design Icons (MDI) preset configuration for icon mappings.
 * This module provides a comprehensive mapping of common UI actions and states
 * to their corresponding Material Design Icon identifiers.
 * 
 * @module MDIIconPreset
 */

/**
 * Icon preset interface defining all available icon mappings.
 * Each property represents a semantic action or state and maps to a specific MDI icon class.
 */
export interface MDIIconPreset {
  /** Icon displayed when an action or task is completed */
  complete: string;
  
  /** Icon for canceling an ongoing operation */
  cancel: string;
  
  /** Icon for closing dialogs, modals, or dismissing content */
  close: string;
  
  /** Icon for delete actions */
  delete: string;
  
  /** Icon for clearing input fields or resetting values */
  clear: string;
  
  /** Icon indicating successful operation completion */
  success: string;
  
  /** Icon for informational messages or tooltips */
  info: string;
  
  /** Icon for warning messages or alerts */
  warning: string;
  
  /** Icon for error states or messages */
  error: string;
  
  /** Icon for navigating to the previous item or page */
  prev: string;
  
  /** Icon for navigating to the next item or page */
  next: string;
  
  /** Icon representing a checked/selected checkbox state */
  checkboxOn: string;
  
  /** Icon representing an unchecked/unselected checkbox state */
  checkboxOff: string;
  
  /** Icon representing an indeterminate checkbox state */
  checkboxIndeterminate: string;
  
  /** Icon used as a delimiter or separator in lists */
  delimiter: string;
  
  /** Icon for sort operations, typically indicating ascending order */
  sort: string;
  
  /** Icon for expanding collapsed content or accordions */
  expand: string;
  
  /** Icon for menu buttons or navigation menus */
  menu: string;
  
  /** Icon for subgroup or nested menu indicators */
  subgroup: string;
  
  /** Icon for dropdown menu triggers */
  dropdown: string;
  
  /** Icon representing a selected radio button state */
  radioOn: string;
  
  /** Icon representing an unselected radio button state */
  radioOff: string;
  
  /** Icon for edit actions or entering edit mode */
  edit: string;
  
  /** Icon for an empty/unselected rating star */
  ratingEmpty: string;
  
  /** Icon for a filled/selected rating star */
  ratingFull: string;
  
  /** Icon for a half-filled rating star */
  ratingHalf: string;
  
  /** Icon indicating a loading or processing state */
  loading: string;
  
  /** Icon for navigating to the first item or page */
  first: string;
  
  /** Icon for navigating to the last item or page */
  last: string;
  
  /** Icon for unfolding or expanding all collapsed sections */
  unfold: string;
  
  /** Icon representing file attachments or documents */
  file: string;
  
  /** Icon for add or increment actions */
  plus: string;
  
  /** Icon for remove or decrement actions */
  minus: string;
}

/**
 * Default Material Design Icons preset configuration.
 * Maps semantic icon names to MDI CSS class identifiers.
 * 
 * @example
 *