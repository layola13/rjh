/**
 * Style loader module for CSS-in-JS injection
 * Handles dynamic stylesheet insertion and management in the DOM
 */

/**
 * Configuration object for style injection
 */
interface StyleLoaderOptions {
  /** Transform function applied to style tags before insertion */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** DOM insertion strategy bound to target element */
  insert: (target: string) => void;
  
  /** DOM manipulation API implementation */
  domAPI: () => void;
  
  /** Factory function for creating style elements */
  insertStyleElement: () => void;
}

/**
 * CSS module exports with typed local class names
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style loader function type
 */
type StyleLoaderFunction = () => void;

/**
 * Style loader with optional locals (CSS modules)
 */
interface StyleLoaderWithLocals {
  (): void;
  locals?: CSSModuleLocals;
}

/**
 * Re-exported style utilities from the style loader package
 * All named exports except 'default' are forwarded
 */
export * from './style-loader-utils';

/**
 * Default export: CSS module class name mappings
 * Returns the local class names if CSS modules are enabled, undefined otherwise
 */
declare const cssModuleExports: CSSModuleLocals | undefined;

export default cssModuleExports;