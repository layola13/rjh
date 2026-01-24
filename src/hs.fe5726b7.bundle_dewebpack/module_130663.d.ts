/**
 * CSS Module Declaration
 * 
 * This module represents a dynamically loaded CSS module with style injection capabilities.
 * It uses style-loader and css-loader to inject styles into the DOM at runtime.
 */

/**
 * Style injection configuration options
 */
interface StyleLoaderOptions {
  /** Transform function to modify style tags before insertion */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** DOM insertion strategy function */
  insert: (target: string) => void;
  
  /** DOM manipulation API */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module locals (class names mapping)
 * 
 * Contains the transformed CSS class names that can be used in components.
 * The actual shape depends on the CSS file content.
 */
type CSSModuleLocals = Record<string, string> | undefined;

/**
 * Re-exported members from the underlying CSS module
 * 
 * All named exports from the CSS module (excluding 'default') are re-exported.
 */
export * from './original-css-module';

/**
 * Default export containing the CSS module class names mapping
 * 
 * @example
 *