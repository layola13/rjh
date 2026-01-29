/**
 * CSS Module loader type definitions
 * Handles stylesheet imports and provides typed access to CSS class names
 */

/**
 * CSS Modules class name mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader options for injecting CSS into the DOM
 */
export interface StyleLoaderOptions {
  /** Function to transform and inject style tags into the document */
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
 * CSS Module exports
 * Provides access to scoped class names from the imported stylesheet
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Re-exported members from the underlying CSS module
 * Allows named imports of specific class names or CSS variables
 */
export * from './styles.module.css';