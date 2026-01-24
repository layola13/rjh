/**
 * CSS Module Export Type Definition
 * 
 * This module exports CSS styles for a channel selection component.
 * It's typically used with CSS-in-JS or CSS module loaders in webpack.
 */

/**
 * CSS Module Loader Function Type
 * 
 * Represents a webpack CSS loader that processes CSS content.
 * 
 * @param sourceMap - Whether to generate source maps for the CSS
 * @returns A loader instance with a push method for adding CSS modules
 */
type CSSModuleLoader = (sourceMap: boolean) => {
  /**
   * Adds a CSS module to the compilation
   * 
   * @param moduleData - Tuple containing module ID and CSS content
   *   - [0]: Module identifier (string or number)
   *   - [1]: CSS content as a string
   */
  push(moduleData: [string | number, string]): void;
};

/**
 * Webpack Module Definition Parameters
 * 
 * @param exports - The module.exports object to be populated
 * @param module - The current module object containing metadata
 * @param require - Webpack's require function for loading dependencies
 */
declare function cssModule(
  exports: {
    /** The exported CSS module content */
    exports?: unknown;
  },
  module: {
    /** Unique identifier for this module */
    id: string | number;
  },
  require: {
    /**
     * Webpack require function to load other modules
     * 
     * @param moduleId - The ID of the module to load
     * @returns The loaded module (CSS loader in this case)
     */
    (moduleId: number): CSSModuleLoader;
  }
): void;

/**
 * CSS Styles Export
 * 
 * Contains styles for a channel selection dropdown component with:
 * - `.select-channel-wrapper`: Main container with relative positioning
 * - `.select-node`: Clickable channel selector with hover effects
 * - `.channel-item`: Individual channel display with image and info
 * - `.select-items`: Dropdown overlay with scrollable channel list
 * - Various nested elements for channel image, title, site info, and pricing
 * 
 * Key features:
 * - Responsive hover states with shadow effects
 * - Fixed dimensions (60px height items, 350px width dropdown)
 * - Smooth transitions (0.25s linear)
 * - High z-index overlay (99999999)
 * - Max height scrollable dropdown (180px)
 */
export default cssModule;

/**
 * CSS Class Names Available in This Module
 */
export interface ChannelSelectorStyles {
  /** Main wrapper container (position: relative) */
  'select-channel-wrapper': string;
  
  /** Clickable selector node with hover effects */
  'select-node': string;
  
  /** Dropdown overlay container (high z-index) */
  'select-channel-overlay': string;
  
  /** Scrollable dropdown list container */
  'select-items': string;
  
  /** Individual channel item wrapper in dropdown */
  'select-channel-item-wrapper': string;
  
  /** Channel display component (image + info) */
  'channel-item': string;
  
  /** Channel thumbnail image (48x48px) */
  'channel-image': string;
  
  /** Channel text information container */
  'channel-info': string;
  
  /** Channel title text */
  'channel-title': string;
  
  /** Shop information container */
  'channel-shop': string;
  
  /** Site information (icon + name) */
  'channel-site': string;
  
  /** Site icon (20x20px circular) */
  'site-icon': string;
  
  /** Site name text */
  'size-name': string;
  
  /** Price display */
  'channel-price': string;
  
  /** Arrow/chevron icon (40px width) */
  'jiantou': string;
  
  /** Visible state modifier */
  'visible': string;
}