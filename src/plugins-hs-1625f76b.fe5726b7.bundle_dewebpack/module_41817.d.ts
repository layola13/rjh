/**
 * CSS Module Export Type Definition
 * 
 * This module exports CSS styles for the material edit card component.
 * It uses a CSS loader to process and inject styles into the application.
 * 
 * @module MaterialEditCardStyles
 */

/**
 * CSS Module Loader Function Type
 * Represents a function that can load and process CSS modules.
 * 
 * @param sourceMap - Whether to include source maps for the CSS
 * @returns A CSS loader instance with a push method for adding style rules
 */
type CSSModuleLoader = (sourceMap: boolean) => {
  /**
   * Adds a CSS rule to the loader
   * 
   * @param rule - A tuple containing the module ID and the CSS content string
   */
  push(rule: [string, string]): void;
};

/**
 * Module Exports Interface
 * Defines the structure of the exported module containing CSS styles.
 */
interface ModuleExports {
  /** The unique identifier for this CSS module */
  id: string;
  
  /** The exports object that will be populated by the CSS loader */
  exports: ReturnType<CSSModuleLoader>;
}

/**
 * CSS Module Factory Function
 * 
 * Factory function that initializes and exports CSS styles for the material edit card component.
 * The styles include:
 * - Zoom box with vertical scrolling
 * - Zoom title styling with custom padding and colors
 * - Material edit card property container with absolute positioning
 * - Edit item titles with flexbox layout
 * - Reset button styling with hover effects
 * - Property bar image button padding
 * 
 * @param moduleExports - The module exports object to populate
 * @param __unused_t - Unused parameter (typically module context)
 * @param cssLoaderFactory - Factory function to create CSS loader instance
 */
declare function cssModuleFactory(
  moduleExports: ModuleExports,
  __unused_t: unknown,
  cssLoaderFactory: CSSModuleLoader
): void;

export default cssModuleFactory;

/**
 * CSS Class Names Available in this Module
 * 
 * The following CSS classes are defined:
 * - `.materialeditcard-container` - Main container for the material edit card
 * - `.zoom-box` - Scrollable zoom container
 * - `.zoom-title` - Title section with custom styling
 * - `.material-edit-card-property` - Absolute positioned property panel
 * - `.material-edit-item` - Individual edit item container
 * - `.title` - Item title with flex layout
 * - `.text` - Text content within title
 * - `.reset` - Reset button container
 * - `.reset-text` - Reset button text with hover effect
 * - `.arrow-img` - Arrow icon for reset button
 * - `.property-bar-image-button` - Image button in property bar
 */
export interface MaterialEditCardStyles {
  'materialeditcard-container': string;
  'zoom-box': string;
  'zoom-title': string;
  'material-edit-card-property': string;
  'material-edit-item': string;
  title: string;
  text: string;
  reset: string;
  'reset-text': string;
  'arrow-img': string;
  'property-bar-image-button': string;
}