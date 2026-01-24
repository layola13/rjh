/**
 * CSS Module type definitions for room name input styling
 * Module: module_606663
 * Original ID: 606663
 */

/**
 * CSS class names exported by this module
 */
export interface IRoomNameInputStyles {
  /** Main container class for the right property bar */
  rightpropertybar: string;
  
  /** Input field class for room name editing */
  roomNameInput: string;
  
  /** Readonly state modifier for room name input */
  readonly: string;
  
  /** Dropdown list container class */
  dropdownlist: string;
  
  /** Error state modifier for input validation */
  error: string;
}

/**
 * CSS module exports
 * Contains class name mappings for room name input components
 */
declare const styles: IRoomNameInputStyles;

export default styles;

/**
 * CSS Module Loader Function Type
 * @param useSourceMap - Whether to include source maps in the CSS output
 * @returns Array containing module metadata and CSS content
 */
export type CSSModuleLoader = (useSourceMap: boolean) => Array<[string, string]>;

/**
 * Module export function signature
 * @param exports - Module exports object
 * @param require - Module require function for dependencies
 * @param moduleLoader - CSS module loader function (ID: 986380)
 */
export type ModuleFactory = (
  exports: Record<string, unknown>,
  require: (id: number) => CSSModuleLoader,
  moduleLoader: CSSModuleLoader
) => void;