/**
 * Module: module_update_selecting_year
 * Original ID: update:selecting-year
 * 
 * Updates the active picker type based on whether year selection is enabled.
 * When year selection is active, sets picker to "YEAR", otherwise uses the 
 * default picker type from the configuration.
 */

/**
 * Picker type enumeration
 */
type PickerType = 'YEAR' | 'MONTH' | 'DATE' | 'TIME' | 'DATETIME';

/**
 * Configuration object containing picker state
 */
interface PickerState {
  /** Currently active picker type */
  activePicker: string;
  
  /** Default picker type configuration */
  type: Lowercase<PickerType>;
}

/**
 * Updates the active picker based on year selection state
 * 
 * @param isSelectingYear - Whether year selection mode is active
 * @param state - The picker state object to update
 * @returns The updated active picker type ('YEAR' or the configured default type in uppercase)
 */
declare function updateSelectingYear(
  isSelectingYear: boolean,
  state: PickerState
): string;