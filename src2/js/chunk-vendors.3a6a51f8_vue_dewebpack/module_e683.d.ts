/**
 * Joins a base path with a relative path, normalizing slashes.
 * 
 * - Removes trailing slashes from the base path
 * - Removes leading slashes from the relative path
 * - Joins them with a single forward slash
 * 
 * @param basePath - The base path to join from
 * @param relativePath - The relative path to append (optional)
 * @returns The joined path, or the original base path if no relative path provided
 * 
 * @example
 *