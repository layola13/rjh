/**
 * Warning and notification utility module
 * Provides functions for displaying warnings and notes with deduplication support
 */

/**
 * Record of warned messages to prevent duplicate warnings
 */
type WarnedRecord = Record<string, boolean>;

/**
 * Pre-message hook function type
 */
type PreMessageHook = (message: string) => void;

/**
 * Warning function signature
 */
type WarningFunction = (isValid: boolean, message: string) => void;

/**
 * Note function signature
 */
type NoteFunction = (isValid: boolean, message: string) => void;

/**
 * Array of pre-message hooks
 */
export declare const preMessage: PreMessageHook[];

/**
 * Display a warning message
 * @param isValid - Whether the condition is valid
 * @param message - Warning message to display
 */
export declare function warning(isValid: boolean, message: string): void;

/**
 * Display a note message
 * @param isValid - Whether the condition is valid
 * @param message - Note message to display
 */
export declare function note(isValid: boolean, message: string): void;

/**
 * Reset all warned message records
 * Clears the internal cache of displayed warnings
 */
export declare function resetWarned(): void;

/**
 * Generic call function that executes a function once per unique message
 * @param fn - Function to call (warning or note)
 * @param isValid - Whether the condition is valid
 * @param message - Message to pass to the function
 */
export declare function call(
  fn: WarningFunction | NoteFunction,
  isValid: boolean,
  message: string
): void;

/**
 * Display a warning message only once per unique message
 * Subsequent calls with the same message will be ignored
 * @param isValid - Whether the condition is valid
 * @param message - Warning message to display
 */
export declare function warningOnce(isValid: boolean, message: string): void;

/**
 * Display a note message only once per unique message
 * Subsequent calls with the same message will be ignored
 * @param isValid - Whether the condition is valid
 * @param message - Note message to display
 */
export declare function noteOnce(isValid: boolean, message: string): void;

/**
 * Extended warningOnce function with additional utility methods
 */
export interface WarningOnceWithUtils {
  (isValid: boolean, message: string): void;
  preMessage: PreMessageHook[];
  resetWarned: typeof resetWarned;
  noteOnce: typeof noteOnce;
}

/**
 * Default export: warningOnce function with attached utility methods
 */
declare const warningOnceWithUtils: WarningOnceWithUtils;

export default warningOnceWithUtils;