/**
 * CSS Module Loader Type Definitions
 * 
 * This module exports CSS styles for feedback block components.
 * The styles are processed through a CSS loader and injected into the application.
 */

/**
 * CSS loader function signature
 * @param sourceMap - Whether to include source maps in the CSS output
 * @returns CSS loader instance with push method for adding style rules
 */
type CSSLoaderFunction = (sourceMap: boolean) => CSSLoader;

/**
 * CSS Loader instance interface
 */
interface CSSLoader {
  /**
   * Adds a CSS module to the loader queue
   * @param rule - Tuple containing module ID, CSS content, and optional source map
   */
  push(rule: [string, string, string?]): void;
}

/**
 * Webpack module exports interface
 */
interface ModuleExports {
  /** The CSS loader instance with queued styles */
  exports: CSSLoader;
  /** Unique module identifier */
  id: string;
}

/**
 * CSS Module Export
 * 
 * Exports feedback block styles including:
 * - `.feedback-block-label`: Base label styling (14px, #33353B, font-weight 600)
 * - `.feedback-block-label-required`: Required field indicator (red asterisk)
 * - `.feedback-block-label.feedback-black`: Dark theme variant (white text)
 * 
 * @param moduleExports - Webpack module exports object
 * @param _exports - Module exports (unused)
 * @param require - Webpack require function to load CSS loader (module 986380)
 */
declare function loadFeedbackBlockStyles(
  moduleExports: ModuleExports,
  _exports: unknown,
  require: (moduleId: number) => CSSLoaderFunction
): void;

export default loadFeedbackBlockStyles;

/**
 * CSS Class Names exported by this module
 */
export interface FeedbackBlockStyles {
  /** Base label styling for feedback blocks */
  'feedback-block-label': string;
  /** Required field indicator styling */
  'feedback-block-label-required': string;
  /** Dark theme label variant */
  'feedback-black': string;
}