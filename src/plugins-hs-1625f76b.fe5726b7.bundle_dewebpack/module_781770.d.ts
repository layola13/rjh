/**
 * CSS Module Type Definitions
 * This module exports CSS class names as typed properties
 */

/**
 * CSS Module Locals - Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style injection configuration options
 */
export interface StyleInjectionOptions {
  /** Function to transform style tags before insertion */
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
 * Default export - CSS module class names
 * Returns an object mapping original class names to their scoped versions,
 * or undefined if no locals are defined
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;

/**
 * Re-exported members from the underlying CSS module (933275)
 * All named exports except 'default' are forwarded
 */
export * from './styles.module.css';