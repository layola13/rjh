/**
 * CSS Module exports interface
 * Represents the type-safe class name mappings from a CSS module
 */
export interface CSSModuleClasses {
  /** CSS class name mappings */
  [className: string]: string;
}

/**
 * Style injection options configuration
 */
export interface StyleInjectionOptions {
  /** Transform function to apply to style tags before insertion */
  styleTagTransform: () => void;
  
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  
  /** DOM insertion strategy function */
  insert: (target: string) => void;
  
  /** DOM manipulation API interface */
  domAPI: () => void;
  
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module with optional local class mappings
 * Used for CSS/SCSS modules that export typed class names
 */
export interface CSSModule {
  /** Local scoped class name mappings, if available */
  locals?: CSSModuleClasses;
}

/**
 * Default export: CSS module class name mappings
 * Returns undefined if no local class mappings are available
 * 
 * @example
 * import styles from './styles.module.css';
 * const className = styles?.buttonPrimary;
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Re-exported members from the underlying CSS module implementation
 * All named exports except 'default' from the source module
 */
export * from './css-module-implementation';