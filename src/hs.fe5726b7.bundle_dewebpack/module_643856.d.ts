/**
 * CSS Module type definitions
 * Represents a dynamically imported CSS module with local class names
 */

/**
 * CSS module locals interface
 * Maps CSS class names to their scoped equivalents
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style loader configuration options
 */
export interface StyleLoaderOptions {
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
   * @param target - The target DOM element selector (e.g., "head")
   */
  insert: (target: string) => void;
  
  /**
   * DOM manipulation API for style injection
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS module export interface
 * Contains both the raw CSS content and the scoped local class names
 */
export interface CSSModuleExport {
  /**
   * Raw CSS content or CSS-in-JS representation
   */
  (): void;
  
  /**
   * Scoped local class name mappings
   */
  locals?: CSSModuleLocals;
}

/**
 * Default export: CSS module locals or undefined if no locals exist
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;

/**
 * Re-exported types from the original CSS module
 */
export * from './css-module';