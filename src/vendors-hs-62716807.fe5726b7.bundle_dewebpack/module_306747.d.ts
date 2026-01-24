/**
 * Ant Design warning utility module
 * Provides warning messages with consistent formatting for development mode
 */

/**
 * Resets the internal warning state
 * Used to clear previously shown warnings, typically for testing purposes
 */
export function resetWarned(): void;

/**
 * Displays a formatted warning message in the console during development
 * 
 * @param condition - When true, the warning will be displayed
 * @param component - The name of the Ant Design component issuing the warning
 * @param message - The warning message to display
 * 
 * @example
 *