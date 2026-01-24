/**
 * RegExp.prototype.exec polyfill module
 * 
 * This module patches the RegExp.prototype.exec method if the current
 * implementation differs from the standard exec behavior.
 */

/**
 * Standard regular expression exec function
 * Executes a search for a match in a string and returns an array of information or null
 * 
 * @param regexp - The regular expression to execute
 * @param str - The string to search
 * @returns Array containing match results with index and input properties, or null if no match
 */
declare function standardExec(
  this: RegExp,
  str: string
): RegExpExecArray | null;

/**
 * RegExp execution result array
 */
interface RegExpExecArray extends Array<string> {
  /** The 0-based index of the match in the string */
  index: number;
  /** The original input string */
  input: string;
  /** Named capture groups (if any) */
  groups?: Record<string, string>;
}

/**
 * Export configuration for the RegExp.exec polyfill
 */
interface ExportConfig {
  /** The target object/prototype to patch */
  target: string;
  /** Whether to patch the prototype */
  proto: boolean;
  /** Whether to force the patch even if native implementation exists */
  forced: boolean;
}

/**
 * Polyfill registration object
 */
interface PolyfillExports {
  /** The exec method implementation */
  exec: typeof standardExec;
}

/**
 * Export the RegExp.exec polyfill to the global environment
 * 
 * @param config - Configuration specifying target, proto mode, and forced flag
 * @param exports - Object containing the exec implementation
 */
declare function exportPolyfill(
  config: ExportConfig,
  exports: PolyfillExports
): void;

export { standardExec, exportPolyfill, ExportConfig, PolyfillExports, RegExpExecArray };