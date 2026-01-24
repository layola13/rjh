/**
 * CSS Module for AI Moodboard Page Styles
 * 
 * This module exports CSS styles for the AI moodboard component including:
 * - Loading/generating states
 * - Image grid layout
 * - Hover effects and masks
 * - Processing and failed state indicators
 */

/**
 * Webpack CSS loader module function signature
 * 
 * @param exports - The module exports object to be populated
 * @param require - Webpack require function for loading dependencies
 * @param module - The current module metadata object
 */
declare module "module_989670" {
  /**
   * CSS Module Loader Function
   * Loads and registers CSS content through webpack's css-loader
   */
  export default function (
    exports: CSSModuleExports,
    require: WebpackRequire,
    module: WebpackModule
  ): void;

  /**
   * Webpack module exports interface for CSS modules
   */
  interface CSSModuleExports {
    /** Module ID identifier */
    id: string | number;
    
    /** Array of CSS content and metadata */
    exports: unknown;
    
    /**
     * Push method to add CSS content to the exports
     * @param content - Tuple of [moduleId, cssString, sourceMap?]
     */
    push(content: [string | number, string, string?]): void;
  }

  /**
   * Webpack require function type
   */
  interface WebpackRequire {
    /**
     * Load a module by ID
     * @param moduleId - The numeric or string module identifier
     * @returns The loaded module's exports
     */
    (moduleId: number | string): unknown;
  }

  /**
   * Webpack module metadata
   */
  interface WebpackModule {
    /** Unique module identifier */
    id: string | number;
    
    /** Module exports object */
    exports: unknown;
    
    /** Whether the module has been loaded */
    loaded?: boolean;
  }

  /**
   * CSS Class Names exported by this module
   * 
   * Available classes:
   * - `.ai-moodboard-page` - Main container
   * - `.is-generating` - Loading overlay (absolute positioned, semi-transparent)
   * - `.ai-moodboard-item` - Individual moodboard item wrapper
   * - `.ai-moodboard-img-block` - Image container (244x164px)
   * - `.ai-moodboard-img` - Actual image element
   * - `.ai-moodboard-item-mask` - Hover mask overlay
   * - `.ai-moodboard-processing-item` - Processing state indicator
   * - `.ai-moodboard-failed-item` - Failed state indicator
   * - `.processing-percent` - Percentage text during processing
   * - `.processing-text` - Processing status text
   * - `.failed-text` - Failure status text
   * - `.ai-moodboard-item-name` - Item name label
   */
  export const cssContent: string;
}