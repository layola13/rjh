/**
 * Resource string retrieval module
 * Provides a safe wrapper around ResourceManager's getString functionality
 */

/**
 * Retrieves a localized string from the ResourceManager
 * 
 * @param key - The resource key identifier for the string to retrieve
 * @returns The localized string associated with the key, or an empty string if not found
 * 
 * @remarks
 * This function provides a null-safe wrapper around ResourceManager.getString,
 * ensuring that a string is always returned (never null or undefined)
 * 
 * @example
 *