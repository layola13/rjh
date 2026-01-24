/**
 * CSS Module loader type definitions
 * This module handles dynamic stylesheet injection and exports CSS module class names
 */

/**
 * CSS Module class name mappings
 * Maps CSS class names to their scoped equivalents
 */
type CSSModuleClasses = Record<string, string>;

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
   * Function to insert style elements into a specified DOM location
   * @param target - The DOM location to insert styles (e.g., "head")
   */
  insert: (target: string) => void;

  /**
   * DOM API interface for style manipulation
   */
  domAPI: () => void;

  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module exports containing scoped class names
 */
interface CSSModuleExports {
  /**
   * Scoped CSS class name mappings for this module
   */
  locals?: CSSModuleClasses;
}

/**
 * Default export: scoped CSS class names from the imported stylesheet
 * Returns undefined if no local class names are defined
 */
declare const cssModuleClassNames: CSSModuleClasses | undefined;

export default cssModuleClassNames;

/**
 * Re-exported members from the CSS module (excluding 'default')
 * Allows direct access to any named exports from the stylesheet
 */
export * from './stylesheet-module';