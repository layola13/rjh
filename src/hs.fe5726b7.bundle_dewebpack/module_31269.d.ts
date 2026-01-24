/**
 * CSS Module loader configuration and exports
 * Handles dynamic style injection and CSS module locals
 */

/**
 * CSS Module locals type - maps class names to their hashed equivalents
 */
export type CSSModuleLocals = Record<string, string> | undefined;

/**
 * Style loader options configuration
 */
interface StyleLoaderOptions {
  /**
   * Transform function to manipulate style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * DOM insertion strategy - inserts into specified element
   * @param target - DOM element selector (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM manipulation API interface
   */
  domAPI: () => void;
  
  /**
   * Factory function to create style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS module content interface
 */
interface CSSModuleExport {
  /**
   * Mapping of original class names to hashed class names
   */
  locals?: CSSModuleLocals;
  
  /**
   * Additional exports from the CSS module
   */
  [key: string]: unknown;
}

/**
 * Default export - CSS module locals (hashed class names)
 * Returns the mapping of class names or undefined if no locals exist
 */
declare const cssModuleLocals: CSSModuleLocals;
export default cssModuleLocals;

/**
 * Re-exported named exports from the CSS module
 * Excludes the 'default' export
 */
export * from './styles.module.css';