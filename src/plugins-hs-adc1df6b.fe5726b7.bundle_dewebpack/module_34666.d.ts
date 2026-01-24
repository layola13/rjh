/**
 * CSS Module Loader Type Definition
 * 
 * This module exports CSS styles for the property bar stair types component.
 * The styles are processed through a CSS loader and injected into the application.
 */

/**
 * CSS Module Export Function Type
 * 
 * Represents a webpack module that exports CSS content through a CSS loader.
 * 
 * @param exports - The module exports object that will contain the processed CSS
 * @param require - The webpack require function for loading dependencies
 * @param moduleId - The unique identifier for this webpack module
 */
declare module 'module_34666' {
  /**
   * CSS Loader Push Array
   * 
   * An array containing the module ID and CSS content string to be injected.
   * Format: [moduleId: string, cssContent: string]
   */
  type CSSLoaderPushArray = [string, string];

  /**
   * CSS Loader Export Interface
   * 
   * Represents the return value from the CSS loader, which provides a push method
   * for adding CSS content to the style injection queue.
   */
  interface CSSLoaderExport {
    /**
     * Push CSS content to the style injection queue
     * 
     * @param content - Tuple containing module ID and CSS string
     */
    push(content: CSSLoaderPushArray): void;
  }

  /**
   * Module Exports
   * 
   * The default export is the result of calling the CSS loader (module 986380)
   * with source maps disabled (false parameter).
   */
  const moduleExports: CSSLoaderExport;
  
  export = moduleExports;
}

/**
 * CSS Class Names Type Definition
 * 
 * Defines the available CSS class names exported by this module for type-safe usage.
 */
declare module 'module_34666/classes' {
  /**
   * Available CSS Classes
   */
  export interface StairTypesStyles {
    /** Main wrapper container for stair types with scrolling */
    'property-bar-stairtypes-wrapper': string;
    
    /** Flex container for stair type items */
    'property-bar-stairtypes-container': string;
    
    /** Image container for individual stair type */
    'stair-img': string;
    
    /** Active state class for selected stair type */
    active: string;
    
    /** Text label for stair type name */
    'stair-name': string;
    
    /** Masked/disabled state for stair name */
    'stair-name-mask': string;
    
    /** Text overflow ellipsis utility class */
    'text-ellipsis': string;
    
    /** Overlay mask for disabled stair types */
    mask: string;
    
    /** VIP badge indicator */
    'stair-vip': string;
    
    /** "Show more" stair type item */
    'stair-more': string;
    
    /** Tooltip wrapper with max-width 220px */
    'stair-type-tip-txt-warp-2': string;
    
    /** Tooltip wrapper with max-width 130px */
    'stair-type-tip-txt-warp-0': string;
    
    /** Popover component for step edge light band */
    'step-edge-light-band-popover': string;
  }

  const styles: StairTypesStyles;
  export default styles;
}