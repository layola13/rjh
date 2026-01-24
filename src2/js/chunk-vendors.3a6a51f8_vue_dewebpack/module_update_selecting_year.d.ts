/**
 * Module: module_update_selecting_year
 * Original ID: update:selecting-year
 * 
 * Updates the active picker mode based on year selection state.
 * When selecting year mode is enabled, switches to YEAR picker.
 * Otherwise, reverts to the default picker type.
 */

/**
 * Picker type enumeration
 */
type PickerType = 'DATE' | 'TIME' | 'DATETIME' | 'MONTH' | 'YEAR';

/**
 * Picker state interface
 */
interface PickerState {
  /** Currently active picker mode */
  activePicker: PickerType;
  
  /** Default picker type */
  type: Lowercase<PickerType>;
}

/**
 * Updates the selecting year state
 * 
 * @param selectingYear - Whether year selection mode is active
 * @returns The updated active picker type
 * 
 * @example
 *