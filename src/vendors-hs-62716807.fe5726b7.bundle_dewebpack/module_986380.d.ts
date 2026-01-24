/**
 * CSS loader module that processes and combines CSS content with source maps and media queries.
 * This module creates a structured array for managing CSS modules in webpack builds.
 */

/**
 * Represents a single CSS module entry.
 * @tuple
 * [0] - Module ID (can be null for inline styles)
 * [1] - CSS content string
 * [2] - Media query string (optional)
 * [3] - Source map object (optional)
 */
type CSSModuleEntry = [
  number | null,
  string,
  string?,
  SourceMapData?
];

/**
 * Source map data structure for CSS modules.
 */
interface SourceMapData {
  /** Root path for source files */
  sourceRoot: string;
  /** Array of source file paths */
  sources: string[];
  /** Source map version */
  version?: number;
  /** Original source file names */
  file?: string;
  /** Mapping data */
  mappings?: string;
  /** Original source content */
  sourcesContent?: string[];
}

/**
 * CSS modules list with utility methods for managing and rendering CSS.
 */
interface CSSModulesList extends Array<CSSModuleEntry> {
  /**
   * Converts the CSS modules list to a complete CSS string.
   * Processes source maps and media queries for each module.
   * @returns Combined CSS string with all modules
   */
  toString(): string;

  /**
   * Imports and adds CSS modules to the current list.
   * Prevents duplicate modules and handles media query merging.
   * @param modules - CSS modules to import (string or array of entries)
   * @param mediaQuery - Optional media query to apply to imported modules
   */
  i(modules: string | CSSModuleEntry[], mediaQuery?: string): void;
}

/**
 * Factory function that creates a CSS modules list with utility methods.
 * @param useSourceMap - Whether to include source map comments in output
 * @returns A new CSS modules list instance
 */
declare function cssLoaderFactory(useSourceMap: boolean): CSSModulesList;

export = cssLoaderFactory;