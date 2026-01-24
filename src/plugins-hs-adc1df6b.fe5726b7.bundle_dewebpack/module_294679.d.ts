/**
 * CSS Module exports type definition
 * Represents the type-safe interface for imported CSS module classes
 */

/**
 * CSS Module class name mappings
 * Contains the locally scoped class names exported by the CSS module
 */
export type CSSModuleClasses = Record<string, string> | undefined;

/**
 * Style loader configuration options
 * Defines the configuration for injecting and managing CSS styles in the DOM
 */
interface StyleLoaderOptions {
  /**
   * Transform function applied to style tags before insertion
   */
  styleTagTransform: () => void;

  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;

  /**
   * Function to insert style elements into the DOM
   * @param target - The DOM node where styles should be inserted (e.g., "head")
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
 * CSS Module metadata
 * Contains both the style content and locally scoped class name mappings
 */
interface CSSModule {
  /**
   * Locally scoped class name mappings
   * Maps original class names to their scoped equivalents
   */
  locals?: Record<string, string>;
}

/**
 * Default export of the CSS module
 * Provides access to the locally scoped class names defined in the stylesheet
 */
declare const cssModuleExports: CSSModuleClasses;

export default cssModuleExports;

/**
 * Re-exported members from the CSS module
 * All named exports from the original CSS module are available here
 */
export * from './css-module-source';