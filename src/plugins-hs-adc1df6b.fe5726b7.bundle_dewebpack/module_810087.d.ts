/**
 * CSS Module Loader Type Definition
 * Module ID: 810087
 * 
 * This module exports CSS styles for a property bar input card component.
 * It uses a CSS loader (likely css-loader) to process and inject styles.
 */

/**
 * CSS Module Export Function
 * 
 * @param exports - The module exports object that will contain the CSS content
 * @param require - The require function for loading dependencies (CSS loader module 986380)
 * @param module - The current module object containing id and other metadata
 */
declare module "module_810087" {
  /**
   * CSS Loader Module Interface
   * Represents the CSS loader that processes CSS content
   */
  interface CSSLoader {
    /**
     * Process CSS content and return a CSS module instance
     * 
     * @param sourceMap - Whether to generate source maps for the CSS
     * @returns CSS module instance with push method
     */
    (sourceMap: boolean): CSSModule;
  }

  /**
   * CSS Module Instance Interface
   * Represents a processed CSS module that can be pushed to a collection
   */
  interface CSSModule {
    /**
     * Push CSS content to the module collection
     * 
     * @param entry - Tuple containing module id and CSS content string
     */
    push(entry: [string, string]): void;
  }

  /**
   * Property Bar Input Card CSS Styles
   * 
   * Defines the following CSS classes:
   * - `.property-bar-input-card`: Absolute positioned container with flexbox layout (z-index: 9999)
   * - `.property-bar-input-card-content`: Main content area (200x200px, white background, rounded corners)
   * - `.property-bar-input-card-content-img-large`: Large image variant (330x330px)
   * - `.property-bar-input-card-content-info`: Info section with horizontal flex layout
   * - `.property-bar-input-card-content-info-img`: Image within info section (60x60px)
   * - `.property-bar-input-card-content-info-img-small`: Small image variant (56x56px)
   * - `.property-bar-input-card-content-info-title`: Title text (bold, 12px font)
   */
  const styles: {
    readonly "property-bar-input-card": string;
    readonly "property-bar-input-card-content": string;
    readonly "property-bar-input-card-content-img-large": string;
    readonly "property-bar-input-card-content-info": string;
    readonly "property-bar-input-card-content-info-img": string;
    readonly "property-bar-input-card-content-info-img-small": string;
    readonly "property-bar-input-card-content-info-title": string;
  };

  export default styles;
}