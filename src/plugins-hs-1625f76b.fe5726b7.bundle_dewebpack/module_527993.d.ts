/**
 * CSS Module Loader Type Definitions
 * Represents a webpack CSS module with style injection functionality
 */

/**
 * CSS module locals type
 * Maps CSS class names to their hashed/scoped equivalents
 */
type CSSModuleLocals = Record<string, string>;

/**
 * Style loader options configuration
 */
interface StyleLoaderOptions {
  /** Transform function to inject style tags into the DOM */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** Function to insert style elements into a specific DOM location */
  insert: (target: string) => void;
  /** DOM API methods for style manipulation */
  domAPI: () => void;
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module export
 * Contains the CSS class name mappings or undefined if no locals exist
 */
declare const cssModule: CSSModuleLocals | undefined;

export default cssModule;
export * from './672876';