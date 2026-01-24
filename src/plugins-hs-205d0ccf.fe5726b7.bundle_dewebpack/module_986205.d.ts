/**
 * CSS Module exports for module_986205
 * Provides typed access to CSS class names and module configuration
 */

/**
 * CSS Module class name mappings
 * Maps semantic class names to their generated/hashed counterparts
 */
export interface CSSModuleClasses {
  [className: string]: string;
}

/**
 * Style injection configuration options
 */
export interface StyleLoaderOptions {
  /**
   * Transform function applied to style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Sets attributes on the generated style element
   */
  setAttributes: () => void;
  
  /**
   * Inserts the style element into the specified DOM location
   * @param target - DOM insertion target (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM manipulation API adapter
   */
  domAPI: () => void;
  
  /**
   * Creates and configures the style element
   */
  insertStyleElement: () => void;
}

/**
 * Default export: CSS module class name mappings
 * Returns undefined if no local class names are defined
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;