/**
 * CSS Module type definitions
 * Represents a webpack CSS module with style injection functionality
 */

/**
 * CSS Module locals interface
 * Contains CSS class name mappings from source to generated names
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style injection options
 * Configuration for how styles are injected into the DOM
 */
export interface StyleInjectionOptions {
  /** Transform function applied to style tags before insertion */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** DOM insertion function, bound to insert into document head */
  insert: (target: string) => void;
  
  /** DOM manipulation API */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports
 * Default export contains the class name mappings, if available
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;

/**
 * Re-exported utilities from the underlying CSS loader module
 * All named exports except 'default' from the original module
 */
export * from './css-loader-module';