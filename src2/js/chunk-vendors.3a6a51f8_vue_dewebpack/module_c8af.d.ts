/**
 * Normalizes HTTP header names to a canonical form.
 * Searches for headers with different casing and consolidates them under the target case.
 * 
 * @module HeaderNormalization
 * @description This module provides functionality to normalize HTTP header keys by
 * ensuring consistent casing across header objects. If a header exists with different
 * casing than the target, it copies the value to the target key and removes the old one.
 */

/**
 * Utility function type for iterating over object properties
 * @internal
 */
type ForEachFunction = <T extends Record<string, unknown>>(
  obj: T,
  callback: (value: unknown, key: string) => void
) => void;

/**
 * Normalizes header keys in an HTTP headers object to match a specific casing.
 * 
 * @param headers - The headers object to normalize (modified in place)
 * @param targetKey - The canonical key name to normalize to
 * 
 * @example
 *