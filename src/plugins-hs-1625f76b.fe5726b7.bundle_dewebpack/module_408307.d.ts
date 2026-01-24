/**
 * Style loader module type definitions
 * Handles CSS module loading and injection into the DOM
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
 * CSS module exports with typed class names
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style module with optional CSS module locals
 */
interface StyleModule {
  /** CSS module class name mappings (if CSS modules are enabled) */
  locals?: CSSModuleLocals;
}

/**
 * Re-exported members from the style module (excluding 'default')
 * These are typically CSS class names when using CSS modules
 */
export * from 'styles';

/**
 * Default export: CSS module class name mappings
 * Returns undefined if CSS modules are not enabled
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;
export default cssModuleLocals;