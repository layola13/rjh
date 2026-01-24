/**
 * CSS-in-JS module declaration for float input container styles
 * 
 * This module exports CSS styles for a floating input component with positioning,
 * styling, and responsive behavior.
 * 
 * @module FloatInputContainerStyles
 */

/**
 * CSS module loader function type
 * Represents a webpack css-loader that processes CSS and returns an array
 * 
 * @param sourceMap - Whether to include source maps (false in this case)
 * @returns Array containing module metadata and CSS content
 */
type CSSLoaderFunction = (sourceMap: boolean) => {
  push: (entry: [string, string, string]) => void;
};

/**
 * Webpack module exports interface
 */
interface WebpackModule {
  /** Module unique identifier */
  id: string;
  /** Exported content (CSS loader result) */
  exports: unknown;
}

/**
 * CSS Module Export
 * 
 * Styles for a floating input container component with:
 * - Fixed positioning with z-index layering
 * - White background with rounded corners
 * - Box shadow for elevation effect
 * - Nested length input wrappers with horizontal spacing
 * - Hide utility class for display toggling
 */
declare module 'float-input-container-styles' {
  /**
   * CSS class definitions for float input container
   */
  export interface FloatInputContainerStyles {
    /** 
     * Main container class - fixed positioned floating input
     * - position: fixed
     * - padding: 10px
     * - background: white
     * - border-radius: 4px
     * - box-shadow: 0px 0px 16px 0px rgba(25, 25, 50, 0.25)
     * - z-index: 1005
     */
    'float-input-container': string;
    
    /**
     * Length input wrapper within container
     * - margin-left: 10px (except first child)
     */
    'length-input-wrapper': string;
    
    /**
     * Hide utility class
     * - display: none
     */
    hide: string;
  }

  /**
   * CSS content exported by this module
   * Contains styles for floating input container component
   */
  const styles: FloatInputContainerStyles;
  export default styles;
}

/**
 * Raw CSS content constant
 * Complete stylesheet for float-input-container component
 */
export const CSS_CONTENT: string;

/**
 * Module identifier constant
 */
export const MODULE_ID = '459794';