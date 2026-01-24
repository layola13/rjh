/**
 * CSS Module Loader
 * Handles dynamic stylesheet injection and exports CSS class names
 */

/**
 * Configuration object for style injection
 */
export interface StyleLoaderConfig {
  /** Transform function to apply to style tags before insertion */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** Function to insert style elements into the DOM */
  insert: (target: string) => void;
  
  /** DOM manipulation API */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style module with optional locals (CSS class mappings)
 */
export interface StyleModule {
  /** CSS class name mappings for CSS modules */
  locals?: CSSModuleLocals;
  
  [key: string]: unknown;
}

/**
 * Default export - CSS module class name mappings
 * Returns undefined if no CSS modules are used
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the style module
 * All named exports except 'default' are forwarded
 */
export * from './style-module';