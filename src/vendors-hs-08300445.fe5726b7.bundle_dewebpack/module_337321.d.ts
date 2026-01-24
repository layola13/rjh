/**
 * Checks if a file matches the specified accept types.
 * Validates file extensions, MIME types, and wildcard MIME types.
 * 
 * @param file - The file object to validate
 * @param acceptedTypes - Comma-separated string or array of accepted file types (e.g., ".jpg, .png" or "image/*")
 * @returns True if the file matches any of the accepted types, or if no file/types are provided
 * 
 * @example
 *