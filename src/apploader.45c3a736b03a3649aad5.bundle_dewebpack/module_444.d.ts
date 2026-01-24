/**
 * CSS Modules Type Definitions
 * Module: module_444
 * Original ID: 444
 * 
 * This module handles CSS style injection and management using style-loader.
 */

/**
 * Style loader configuration options
 */
interface StyleLoaderOptions {
  /** Function to transform and inject style tags into the DOM */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** Function to insert style elements into a specific DOM location */
  insert: (target: string) => void;
  
  /** DOM manipulation API for style injection */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module export structure
 */
interface CSSModuleExport {
  /** CSS class name mappings (if CSS Modules are enabled) */
  locals?: Record<string, string>;
  
  /** Additional CSS module metadata */
  [key: string]: unknown;
}

/**
 * CSS Module with type 'A' property containing export data
 */
interface CSSModule {
  A: CSSModuleExport;
}

/**
 * Default export: CSS class name mappings
 * Returns the local class names if available, otherwise undefined
 */
declare const cssModuleLocals: Record<string, string> | undefined;

export default cssModuleLocals;