/**
 * CSS Module loader type definitions
 * Handles style injection and CSS modules exports
 */

/** CSS Module class name mappings */
export type CSSModuleClasses = Record<string, string>;

/**
 * Style loader configuration options
 */
interface StyleLoaderOptions {
  /** Transform function for style tags */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** Insert function to inject styles into DOM */
  insert: (target: string) => void;
  
  /** DOM API handler for style manipulation */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module export structure
 */
interface CSSModuleExport {
  /** Local class name mappings for CSS modules */
  locals?: CSSModuleClasses;
  
  /** Additional exported values from the CSS module */
  [key: string]: unknown;
}

/**
 * Re-exported members from the CSS module (excluding 'default')
 */
export * from './374940';

/**
 * Default export: CSS module class mappings or undefined
 * Returns the local class names defined in the CSS module
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;
export default cssModuleLocals;