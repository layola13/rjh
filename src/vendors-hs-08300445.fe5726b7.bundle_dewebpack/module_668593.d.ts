/**
 * Generates a unique identifier for file uploads.
 * 
 * @remarks
 * This function creates unique IDs by combining a timestamp prefix with an auto-incrementing counter.
 * The timestamp is captured once at module initialization to ensure consistency across all generated IDs.
 * 
 * @returns A unique string identifier in the format "rc-upload-{timestamp}-{counter}"
 * 
 * @example
 *