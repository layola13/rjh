/**
 * Global namespace utilities for managing exports and imports across modules.
 * Provides aliasing and scoped access to global variables.
 */

/**
 * Builds a namespaced alias string to prevent global collisions.
 * 
 * @param namespace - The namespace identifier to wrap
 * @returns The aliased namespace string in format "$__{namespace}__"
 * 
 * @example
 * buildNameSpaceAlias('myModule') // Returns: "$__myModule__"
 */
export function buildNameSpaceAlias(namespace: string): string;

/**
 * Exports a value to a namespaced global object.
 * Creates the namespace on the global object if it doesn't exist.
 * Logs a warning if attempting to overwrite an existing export.
 * 
 * @param namespace - The namespace identifier for the export
 * @param key - The property key within the namespace
 * @param value - The value to export
 * 
 * @example
 * exportToGlobal('myModule', 'myFunction', () => {})
 * // Creates: globalThis.$__myModule__.myFunction
 */
export function exportToGlobal(
  namespace: string,
  key: string,
  value: unknown
): void;

/**
 * Imports a value from a namespaced global object.
 * 
 * @param namespace - The namespace identifier to import from
 * @param key - The property key within the namespace
 * @returns The imported value if found, otherwise undefined
 * 
 * @example
 * const fn = importFromGlobal('myModule', 'myFunction')
 * // Retrieves: globalThis.$__myModule__.myFunction
 */
export function importFromGlobal<T = unknown>(
  namespace: string,
  key: string
): T | undefined;