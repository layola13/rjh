/**
 * CSS Module type definitions
 * This module represents a dynamically loaded CSS module with associated styles
 */

/**
 * CSS Module class names mapping
 * Contains the locally scoped class names exported by the CSS module
 */
interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader configuration options
 * Defines how styles should be injected and managed in the DOM
 */
interface StyleLoaderOptions {
  /** Transform function applied to style tags before insertion */
  styleTagTransform: () => void;
  
  /** Function to set custom attributes on style elements */
  setAttributes: () => void;
  
  /** DOM insertion strategy for style elements */
  insert: (target: string) => void;
  
  /** DOM API interface for style manipulation */
  domAPI: () => void;
  
  /** Factory function to create style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module with style loader integration
 * Represents a processed CSS module ready for runtime injection
 */
declare const cssModule: CSSModuleClasses | undefined;

export default cssModule;

/**
 * Re-exported members from the original CSS module
 * All named exports except 'default' are preserved
 */
export * from './original-css-module';