/**
 * CSS module exports for property bar dropdown list component
 * @module PropertyBarDropdownListStyles
 */

/**
 * Webpack CSS loader module function type
 * This module exports CSS styles for the property bar dropdown list component
 * 
 * @param exports - The module exports object
 * @param module - The current module object
 * @param require - The webpack require function for loading dependencies
 */
declare module 'module_325384' {
  /**
   * Module exports containing CSS content array
   * The array format follows css-loader conventions: [moduleId, cssContent, sourceMap?]
   */
  export default function(
    exports: CSSModuleExports,
    module: WebpackModule,
    require: WebpackRequire
  ): void;

  /**
   * CSS module exports structure from css-loader
   */
  interface CSSModuleExports {
    /** CSS content as an array of [id, css, sourceMap?] tuples */
    default: Array<[string, string, string?]>;
    /** Array push method for adding CSS entries */
    push: (entry: [string, string, string?]) => void;
  }

  /**
   * Webpack module object
   */
  interface WebpackModule {
    /** Unique module identifier */
    id: string | number;
    /** Module exports object */
    exports: unknown;
    /** Whether the module has been loaded */
    loaded?: boolean;
    /** Parent modules that required this module */
    parents?: Array<string | number>;
  }

  /**
   * Webpack require function for loading modules
   */
  interface WebpackRequire {
    /** Load a module by ID and return its exports */
    (moduleId: string | number): unknown;
    /** Cache of loaded modules */
    c?: Record<string | number, WebpackModule>;
    /** Module resolution function */
    resolve?: (moduleId: string | number) => string | number;
  }

  /**
   * CSS class names defined in this module:
   * 
   * Main component classes:
   * - `.property-bar-dropdownlist` - Main container with flexbox layout
   * - `.property-bar-dropdownlist-title__icon` - Icon in title area (15px)
   * - `.property-bar-dropdownlist-title__icon-left` - Left-positioned icon with 5px right margin
   * - `.property-bar-dropdownlist-title__icon-right` - Right-positioned icon with 5px left margin
   * 
   * Label classes:
   * - `.dropdownlist-label` - Label with 8px right margin, max-width 80px, color #888888
   * - `.dropdownlist-label-tooltip` - Tooltip icon, red on hover
   * - `.dropdownlist-label__text` - Text content with 100px width
   * - `.dropdownlist-label__text__hasicon` - Text with icon, 65px width
   * - `.dropdownlist-label__hasicon` - Label container when icon present
   * 
   * Size variant label classes:
   * - `.dropdownlist-label-large__text` - Large label text
   * - `.dropdownlist-label-large__text__hasicon` - Large label text with icon (65px)
   * - `.dropdownlist-label-large__icon` - Large label icon (35x15px)
   * - `.dropdownlist-label-middle__text` - Medium label text
   * - `.dropdownlist-label-middle__text__hasicon` - Medium label text with icon (35px)
   * - `.dropdownlist-label-middle__icon` - Medium label icon (35x15px)
   * - `.dropdownlist-label-small__text` - Small label text
   * - `.dropdownlist-label-small__text__hasicon` - Small label text with icon (15px)
   * - `.dropdownlist-label-small__icon` - Small label icon (35x15px)
   * 
   * Component size classes:
   * - `.dropdownlist-comp` - Base component wrapper (24px height, border-radius 4px)
   * - `.dropdownlist-comp-large` - Large variant (130px width)
   * - `.dropdownlist-comp-middle` - Medium variant (100px width)
   * - `.dropdownlist-comp-small` - Small variant (64px width)
   * 
   * Popup/dropdown classes (`.dropdownlist-popdom` context):
   * - Icon variants: 20% width, 15px height
   * - Text variants: 100% width (80% when icon present)
   */
}