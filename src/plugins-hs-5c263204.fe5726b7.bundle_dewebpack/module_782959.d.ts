/**
 * CSS Module type definition
 * Webpack style-loader pattern for CSS Modules with side effects
 */

/**
 * CSS Modules class name mapping
 * Maps CSS class names to their hashed equivalents
 */
export interface CSSModuleClasses {
  readonly [className: string]: string;
}

/**
 * Style loader configuration options
 */
interface StyleLoaderOptions {
  /**
   * Function to transform and inject style tags into the DOM
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Function to insert style elements into a specific DOM location
   * Bound to insert into document head
   */
  insert: (target: string) => void;
  
  /**
   * DOM API handler for style manipulation
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module with metadata
 */
interface CSSModule {
  /**
   * Local class name mappings (CSS Modules)
   */
  locals?: CSSModuleClasses;
  
  /**
   * Raw CSS content or module identifier
   */
  [key: string]: unknown;
}

/**
 * Default export: CSS Module class names
 * Returns the local class name mappings if available, otherwise undefined
 */
declare const cssModuleExports: CSSModuleClasses | undefined;

export default cssModuleExports;

/**
 * Re-exported members from the CSS module (excluding 'default')
 * Allows named imports of any exported CSS module properties
 */
export * from './module_260989';