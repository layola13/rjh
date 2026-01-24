/**
 * CSS Module exports type definition
 * This module handles CSS-in-JS style injection and exports CSS class name mappings
 */

/**
 * CSS class name mappings exported by the CSS module.
 * Maps CSS class identifiers to their generated/hashed class names.
 */
interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Configuration options for style injection
 */
interface StyleInjectionOptions {
  /** Transform function to process style tags before insertion */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** Function to insert style elements into the DOM */
  insert: (target: string) => void;
  
  /** DOM API implementation for style manipulation */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module styles object containing local class mappings
 */
interface CSSModuleExport {
  /** Local CSS class name mappings */
  locals?: CSSModuleClasses;
}

/**
 * Default export: CSS class name mappings if available, otherwise undefined
 */
declare const cssModuleClasses: CSSModuleClasses | undefined;

export default cssModuleClasses;

/**
 * Re-exported named bindings from the CSS module (excluding 'default')
 */
export * from './styles.module.css';