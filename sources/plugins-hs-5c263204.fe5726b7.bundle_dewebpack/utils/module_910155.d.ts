/**
 * CSS Module Loader Type Definition
 * 
 * This module exports CSS styles for feedback list row components.
 * It uses a CSS-in-JS loading mechanism that pushes style definitions to a module cache.
 * 
 * @module FeedbackListRowStyles
 */

/**
 * CSS module loader function signature
 * 
 * @param exports - The module exports object to attach the CSS content
 * @param require - The module require function (unused in this context)
 * @param moduleFactory - Factory function that creates a CSS loader instance
 */
declare function loadCSSModule(
  exports: CSSModuleExports,
  require: RequireFunction,
  moduleFactory: CSSLoaderFactory
): void;

/**
 * CSS loader factory function that creates a loader with the given source map setting
 * 
 * @param useSourceMap - Whether to include source maps in the CSS output
 * @returns A CSS loader instance with a push method
 */
type CSSLoaderFactory = (useSourceMap: boolean) => CSSLoader;

/**
 * CSS loader instance that collects style rules
 */
interface CSSLoader {
  /**
   * Adds a CSS rule to the loader
   * 
   * @param rule - Tuple containing module ID and CSS content string
   */
  push(rule: [moduleId: string, cssContent: string]): void;
}

/**
 * Module exports object that will contain the CSS loader
 */
interface CSSModuleExports {
  /** Unique module identifier */
  id: string;
  
  /** The CSS loader instance */
  exports?: CSSLoader;
}

/**
 * Module require function type
 */
type RequireFunction = (moduleId: number) => unknown;

/**
 * CSS class names exported by this module
 */
export interface FeedbackListRowStyles {
  /** Main container for feedback list row content - uses flexbox layout */
  'feedback-list-row-content': string;
  
  /** Text content area - grows to fill available space with ellipsis overflow */
  'feedback-list-row-content-text': string;
  
  /** Container for icon elements in the feedback row */
  'feedback-list-row-content-icons': string;
  
  /** Image icon styling within the icons container */
  'feedback-list-row-content-img-icon': string;
  
  /** Expandable/collapsible icon with pointer cursor */
  'feedback-list-row-content-extend-icon': string;
}

/**
 * CSS styles defined in this module:
 * 
 * - `.feedback-list-row-content`: Flex container spanning full width
 * - `.feedback-list-row-content-text`: Flexible text area with ellipsis truncation
 * - `.feedback-list-row-content-icons .feedback-list-row-content-img-icon`: Small icon (12px) with right margin
 * - `.feedback-list-row-content-icons .feedback-list-row-content-extend-icon`: Clickable mini icon (10px)
 */
declare const styles: FeedbackListRowStyles;

export default styles;