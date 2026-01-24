/**
 * CSS Module type definitions
 * Represents a CSS module with its exported class names and style injection configuration
 */

/**
 * CSS module locals/exports containing class name mappings
 */
export interface CSSModuleLocals {
  readonly [className: string]: string;
}

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
  /** Transform function to apply style tag transformations */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** Function to insert style elements into the DOM */
  insert: (target: string) => void;
  
  /** DOM API interface for style manipulation */
  domAPI: () => void;
  
  /** Function to insert style element into the document */
  insertStyleElement: () => void;
}

/**
 * CSS module with potential class name exports
 * Returns the locals object if available, otherwise undefined
 */
declare const cssModule: CSSModuleLocals | undefined;

export default cssModule;

/**
 * Re-export all named exports from the underlying CSS module
 */
export * from './styles.module.css';