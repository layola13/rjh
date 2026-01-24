/**
 * CSS Module Declaration
 * Original Module ID: 364713
 * 
 * This module exports CSS styles for a teaching interface top bar component.
 * Includes styles for search functionality, icons, and theme variants (light/dark).
 */

/**
 * CSS Module Exports Interface
 * Defines the structure of exported CSS class names and their corresponding hashed values
 */
export interface CSSModuleExports {
  /** Main container for the teaching top bar */
  'teaching-top': string;
  
  /** Left section of the top bar containing icons/controls */
  'top-left': string;
  
  /** Title text styling in the top bar */
  'top-title': string;
  
  /** Search container with flexible layout */
  'top-search': string;
  
  /** Operation buttons container within search area */
  'operate': string;
  
  /** Search input field wrapper */
  'search-input': string;
  
  /** Utility class to hide element by setting width to 0 */
  'width-none': string;
  
  /** Rounded icon button with outline style */
  'round-icon-o': string;
  
  /** Close button styling in top bar */
  'top-close': string;
  
  /** Icon styling for search input */
  'input-search-icon': string;
  
  /** Light theme variant for teaching top bar */
  'teaching-light': string;
  
  /** Dark theme variant for teaching top bar */
  'teaching-black': string;
  
  /** Popover component styling for course icons */
  'coruse-icon-popover': string;
}

/**
 * CSS Module Loader Function Type
 * Represents the webpack css-loader module factory function
 * 
 * @param useSourcMap - Whether to include source maps in the output
 * @returns Array containing module metadata and CSS content
 */
export type CSSLoaderFunction = (useSourceMap: boolean) => CSSLoaderResult;

/**
 * CSS Loader Result Interface
 * Represents the output structure from css-loader
 */
export interface CSSLoaderResult {
  /** Adds CSS content to the compilation */
  push(entry: [string, string]): void;
  
  /** String representation of the CSS content */
  toString(): string;
  
  /** Iterator for CSS entries */
  [Symbol.iterator](): Iterator<[string, string]>;
}

/**
 * Module Export Function Type
 * @param moduleId - The unique identifier for this module
 * @param cssContent - The raw CSS string content
 */
export type ModuleExportEntry = [moduleId: string, cssContent: string];

/**
 * Default export representing the CSS content for the teaching top bar component
 * This would typically be processed by webpack's css-loader
 */
declare const cssModule: CSSModuleExports;

export default cssModule;