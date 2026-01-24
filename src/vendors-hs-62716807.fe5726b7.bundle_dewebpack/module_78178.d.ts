/**
 * Error enhancement utility module
 * 
 * Creates an Error object and enhances it with additional metadata properties.
 * This module wraps the error enhancement functionality from module 404814.
 * 
 * @module ErrorFactory
 */

/**
 * Creates and enhances an Error object with additional metadata
 * 
 * @param message - The error message
 * @param config - Configuration object or URL
 * @param code - Error code (e.g., 'ECONNABORTED', 'ERR_NETWORK')
 * @param request - The request object that caused the error
 * @param response - The response object if available
 * @returns An enhanced Error object with additional properties
 * 
 * @example
 *