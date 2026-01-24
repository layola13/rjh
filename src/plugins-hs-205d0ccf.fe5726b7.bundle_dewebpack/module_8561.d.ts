/**
 * CSS module definition for right-click context menu component
 * Defines styles for context menu, menu items, masks, and submenu layouts
 */

/**
 * Webpack CSS loader module factory function
 * @param exports - Module exports object
 * @param require - Webpack require function for loading dependencies
 * @param __webpack_require__ - Internal webpack require function (aliased as 'n')
 */
declare module 'module_8561' {
  /**
   * CSS module export type
   * Returns an array containing module ID and CSS content string
   */
  export type CSSModuleExport = [id: string, css: string];

  /**
   * CSS loader API interface
   * Provides methods for handling CSS modules in webpack
   */
  interface CSSLoaderAPI {
    /**
     * Push CSS content to the loader
     * @param content - Tuple of [moduleId, cssString]
     */
    push(content: CSSModuleExport): void;
  }

  /**
   * CSS Loader factory function
   * @param sourceMap - Whether to include source maps (false for production)
   * @returns CSS loader API instance
   */
  type CSSLoaderFactory = (sourceMap: boolean) => CSSLoaderAPI;

  /**
   * Right-click context menu CSS class definitions
   */
  export interface RightMenuStyles {
    /** Root container for context menu with fixed positioning */
    rightmenu: string;
    
    /** Semi-transparent overlay mask behind the menu */
    rightmenumask: string;
    
    /** Utility class to hide elements */
    hide: string;
    
    /** Main menu content container with border and shadow */
    mainland: string;
    
    /** Individual menu item with hover effects */
    rightitem: string;
    
    /** Disabled state for menu items (non-interactive, reduced opacity) */
    'rightitem.disable': string;
    
    /** Label text within menu item with ellipsis overflow */
    rightlabel: string;
    
    /** Horizontal divider line between menu sections */
    rightdive: string;
    
    /** Icon positioned at the left of menu items */
    righticon: string;
    
    /** Arrow indicator for submenu expansion */
    rightadd: string;
    
    /** Floating toolbar container positioned above menu */
    mintoolbarcontainer: string;
    
    /** Dropdown for room type selection within context menu */
    roomTypeDropdownRightMenu: string;
    
    /** Input field for room name in readonly state */
    'roomNameInput.readonly': string;
    
    /** Editable input field for room name */
    roomNameInput: string;
    
    /** Button styles within the toolbar */
    button: string;
    
    /** Title text styling */
    wtitle: string;
    
    /** Submenu container with left offset positioning */
    'sub-menu': string;
  }

  /**
   * CSS content string for right-click context menu
   * Includes all styles for menu layout, items, masks, and interactions
   */
  const cssContent: string;

  export default cssContent;
}