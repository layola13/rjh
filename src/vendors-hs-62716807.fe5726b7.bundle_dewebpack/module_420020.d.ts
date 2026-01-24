/**
 * Ant Design warning utility module
 * Provides a standardized warning system with message formatting
 */

/**
 * Reset the warning state tracker
 * Used to clear previously shown warnings, typically in testing environments
 */
export function resetWarned(): void;

/**
 * Display a formatted warning message with Ant Design prefix
 * 
 * @param condition - If true, the warning will be displayed
 * @param component - The name of the Ant Design component issuing the warning
 * @param message - The warning message content
 * 
 * @example
 *