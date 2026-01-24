/**
 * CSS Module with style injection utilities
 * Provides type-safe CSS class name exports and style management
 */

/**
 * CSS class names exported from the module
 * Maps logical class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style injection configuration options
 */
export interface StyleInjectionOptions {
  /** Transform function to process style tags before insertion */
  styleTagTransform: () => void;
  
  /** Function to set custom attributes on style elements */
  setAttributes: () => void;
  
  /** DOM insertion strategy - typically inserts into <head> */
  insert: (target: string) => void;
  
  /** DOM manipulation API adapter */
  domAPI: () => void;
  
  /** Factory function to create style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module metadata
 */
export interface CSSModuleMetadata {
  /** Local scoped class names mapping */
  locals?: CSSModuleClasses;
  
  /** Module identifier */
  id?: string;
  
  /** CSS content as string */
  toString(): string;
}

/**
 * Re-exported utilities from the underlying CSS module
 * Includes all named exports except 'default'
 */
export * from './745705';

/**
 * Default export - CSS Module class names or undefined
 * Contains the locally scoped class name mappings if available
 */
declare const cssModule: CSSModuleClasses | undefined;

export default cssModule;