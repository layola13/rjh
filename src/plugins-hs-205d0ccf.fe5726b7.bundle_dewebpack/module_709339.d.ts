/**
 * CSS Module type definitions
 * Provides type-safe access to CSS class names and module configuration
 */

/**
 * CSS Modules class name mapping
 * Maps CSS class identifiers to their generated hash names
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style loader options for runtime CSS injection
 */
export interface StyleLoaderOptions {
  /** Transform function to inject style tags into DOM */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** Function to insert style elements into specified location */
  insert: (target: string) => void;
  /** DOM manipulation API adapter */
  domAPI: () => void;
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module export structure
 * Contains both the locals (class names) and module metadata
 */
export interface CSSModuleExport {
  /** Generated CSS class name mappings */
  locals?: CSSModuleClasses;
  /** Module identifier */
  id?: string;
  /** Whether to use source maps */
  sourceMap?: boolean;
}

/**
 * Default export: CSS Module class names or undefined
 * Use this to access type-safe CSS class names in your components
 * 
 * @example
 * import styles from './styles.module.css';
 * const className = styles?.buttonPrimary;
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * Re-exported members from the underlying CSS module
 * Allows direct access to module properties beyond just class names
 */
export * from './css-module-source';