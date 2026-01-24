/**
 * Sends a custom message if it meets length requirements.
 * 
 * @param message - The message content to be sent. Must not exceed 180 characters.
 * @param options - Additional options or callback for the custom message handler.
 * @returns The result from the custom message handler if message is valid, otherwise undefined.
 * 
 * @remarks
 * This function validates that:
 * - The message parameter is truthy (not null, undefined, or empty string)
 * - The message length does not exceed 180 characters
 * 
 * If validation passes, it delegates to the `custom` method with a structured payload.
 * 
 * @example
 *