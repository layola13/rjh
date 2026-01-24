/**
 * Error logging utility that safely handles console.error calls
 * Provides backward compatibility for single or dual argument logging
 */

/**
 * Logs an error message to the console with optional additional data.
 * Gracefully handles logging failures without throwing errors.
 * 
 * @param message - The primary error message or error object to log
 * @param additionalData - Optional additional context or data to log alongside the message
 * @returns void
 * 
 * @example
 *