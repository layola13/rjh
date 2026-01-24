/**
 * Path normalization utility module
 * 
 * This module provides a function to normalize file or resource paths.
 * If the path is not absolute, it will be joined with a base path.
 * 
 * @module PathNormalizer
 */

/**
 * Checks if a path is absolute
 * @param path - The path to check
 * @returns True if the path is absolute, false otherwise
 */
declare function isAbsolute(path: string): boolean;

/**
 * Joins a base path with a relative path
 * @param basePath - The base path to join with
 * @param relativePath - The relative path to append
 * @returns The joined path
 */
declare function joinPath(basePath: string, relativePath: string): string;

/**
 * Normalizes a path by ensuring it's absolute. If the target path is already
 * absolute, returns it as-is. Otherwise, joins it with the provided base path.
 * 
 * @param basePath - The base path to use if targetPath is not absolute
 * @param targetPath - The path to normalize
 * @returns The normalized absolute path
 * 
 * @example
 *