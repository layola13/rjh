/**
 * CSS Module loader type definitions
 * Represents a Webpack CSS module with style injection capabilities
 */

/**
 * CSS Modules class name mapping
 * Maps CSS class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [key: string]: string;
}

/**
 * Style loader configuration options
 * Controls how CSS is injected and managed in the DOM
 */
export interface StyleLoaderOptions {
  /**
   * Transform function applied to style tags before insertion
   */
  styleTagTransform: () => void;
  
  /**
   * Sets attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Inserts style elements into a specific DOM location
   * @param target - The DOM element selector (e.g., "head")
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
 * CSS Module export structure
 * Contains both the style content and local class name mappings
 */
export interface CSSModule {
  /**
   * Local CSS class name mappings (may be undefined if no classes exported)
   */
  locals?: CSSModuleClasses;
}

/**
 * Default export: CSS module class name mappings
 * Returns undefined if the module has no exported classes
 */
declare const cssModuleExport: CSSModuleClasses | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the CSS module
 * All named exports from the original module are available here
 */
export * from './original-css-module';