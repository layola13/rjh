/**
 * CSS Modules style loader configuration and exports
 * Handles dynamic style injection and CSS module locals
 */

/**
 * Style loader configuration options
 */
interface StyleLoaderOptions {
  /** Transform function for style tags */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** Function to insert style elements into DOM */
  insert: (target: string) => void;
  /** DOM API utilities */
  domAPI: () => void;
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module locals type - represents exported class names and identifiers
 */
type CSSModuleLocals = Record<string, string>;

/**
 * CSS Module export type
 */
interface CSSModuleExport {
  /** Local class name mappings */
  locals?: CSSModuleLocals;
  /** Additional module metadata */
  [key: string]: unknown;
}

/**
 * Default export: CSS Module locals or undefined if no locals exist
 * Contains the mapping of local class names to their hashed/scoped versions
 */
declare const locals: CSSModuleLocals | undefined;

export default locals;

/**
 * Re-export all named exports from the CSS module (excluding 'default')
 */
export * from './styles.css';