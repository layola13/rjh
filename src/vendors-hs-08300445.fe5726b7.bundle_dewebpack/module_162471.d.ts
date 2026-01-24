/**
 * Warning and notification utility module
 * Provides functions for displaying warnings and notes with deduplication support
 */

/**
 * Pre-message handler function type
 */
type PreMessageHandler = (message: string) => void;

/**
 * Warning function signature
 */
type WarningFunction = (valid: boolean, message: string) => void;

/**
 * Record of warned messages to prevent duplicates
 */
declare const warned: Record<string, boolean>;

/**
 * Array of pre-message handlers
 */
declare const preMessageHandlers: PreMessageHandler[];

/**
 * Adds a pre-message handler to the handler queue
 * @param handler - Function to handle pre-messages
 */
export declare function preMessage(handler: PreMessageHandler): void;

/**
 * Displays a warning message (no-op in production)
 * @param valid - Whether the condition is valid
 * @param message - Warning message to display
 */
export declare function warning(valid: boolean, message: string): void;

/**
 * Displays a note message (no-op in production)
 * @param valid - Whether the condition is valid
 * @param message - Note message to display
 */
export declare function note(valid: boolean, message: string): void;

/**
 * Resets the warned messages cache
 */
export declare function resetWarned(): void;

/**
 * Core call function that executes a function once per unique message
 * @param fn - Function to execute (warning or note)
 * @param valid - Whether the condition is valid
 * @param message - Message to check for duplication
 */
export declare function call(
  fn: WarningFunction,
  valid: boolean,
  message: string
): void;

/**
 * Displays a warning message once per unique message
 * @param valid - Whether the condition is valid
 * @param message - Warning message to display
 */
export declare function warningOnce(valid: boolean, message: string): void;

/**
 * Displays a note message once per unique message
 * @param valid - Whether the condition is valid
 * @param message - Note message to display
 */
export declare function noteOnce(valid: boolean, message: string): void;

/**
 * Extended warning function with utility methods
 */
export interface WarningOnceFunction {
  (valid: boolean, message: string): void;
  preMessage: typeof preMessage;
  resetWarned: typeof resetWarned;
  noteOnce: typeof noteOnce;
}

/**
 * Default export: warningOnce function with attached utility methods
 */
declare const warningOnceWithUtils: WarningOnceFunction;

export default warningOnceWithUtils;