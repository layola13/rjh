/**
 * CSS module loader type definitions
 * This module exports CSS styles for the AI Moodboard page component
 * 
 * @module module_370203
 * @description Webpack CSS loader module that injects styles for the my-ai-moodboard-page component
 * Original Module ID: 370203
 */

/**
 * CSS Module Export Function
 * Pushes CSS content to the webpack CSS loader pipeline
 * 
 * @param exports - The module exports object that will contain the CSS content
 * @param cssLoader - CSS loader function from webpack (module 986380)
 * @param push - Method to add CSS content to the loader queue
 */
declare module 'module_370203' {
  /**
   * CSS content array containing module metadata and styles
   * Format: [moduleId, cssContent, sourceMap?]
   */
  interface CSSModuleContent {
    /** Unique module identifier */
    id: string | number;
    
    /** Raw CSS stylesheet content */
    content: string;
    
    /** Optional source map for debugging */
    sourceMap?: string | null;
  }

  /**
   * CSS Loader export interface
   * Provides methods to manage CSS content in webpack bundle
   */
  interface CSSLoaderExport {
    /**
     * Push CSS module content to the loader
     * @param content - Array containing [moduleId, cssString, sourceMap]
     */
    push(content: [string | number, string, string?]): void;
    
    /** String representation of the CSS content */
    toString(): string;
    
    /** Optional: Iterate over CSS modules */
    [Symbol.iterator]?(): Iterator<CSSModuleContent>;
  }

  /**
   * CSS Loader Factory Function
   * Creates a CSS loader instance with source map support
   * 
   * @param useSourceMap - Whether to enable source map generation
   * @returns CSS loader export object with push method
   */
  type CSSLoaderFactory = (useSourceMap: boolean) => CSSLoaderExport;

  /**
   * Module exports the configured CSS loader with injected styles
   * 
   * Styles included:
   * - .my-ai-moodboard-page: Main container with rounded corners
   * - .my-ai-moodboard-page-header: Header section with title and controls
   * - .my-ai-moodboard-page-content: Content area with loading state overlay
   * - .hsc-hint-view: Hint/tooltip positioning
   * - .refresh-container: Refresh button styling
   * - .is-generating: Loading overlay with semi-transparent background
   */
  const cssModule: CSSLoaderExport;
  
  export default cssModule;
}

/**
 * CSS Classes exported by this module:
 * 
 * @class my-ai-moodboard-page - Root container (border-radius: 10px)
 * @class my-ai-moodboard-page-header - Header bar (height: 40px, padding: 10px 18px)
 * @class my-ai-moodboard-page-header .left - Left section with title
 * @class my-ai-moodboard-page-header .left .title - Title text (font-size: 16px, AlibabaPuHuiTi-Bold)
 * @class my-ai-moodboard-page-header .right - Right section with controls
 * @class my-ai-moodboard-page-header .right .refresh-container - Refresh button wrapper
 * @class my-ai-moodboard-page-header .right .refresh-icon - Refresh icon (30x30px)
 * @class my-ai-moodboard-page-content - Main content area (height: calc(100% - 60px))
 * @class my-ai-moodboard-page-content .is-generating - Loading overlay (rgba(255, 255, 255, 0.6))
 * @class hsc-hint-view - Hint view positioned at center top
 */