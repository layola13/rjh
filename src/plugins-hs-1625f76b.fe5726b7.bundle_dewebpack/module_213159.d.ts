/**
 * CSS module exports type definition
 * Module: module_213159
 * Original ID: 213159
 * 
 * This module exports CSS styles for dialog toolbar tips component.
 * Includes styles for tooltip positioning, item layout, and visibility controls.
 */

/**
 * CSS-in-JS module loader function signature
 * @param exports - Module exports object to be populated with CSS content
 * @param cssLoader - CSS loader utility function imported from module 986380
 * @param push - Array push method for adding CSS rules to the style collection
 */
declare module 'module_213159' {
  /**
   * CSS Module Export Interface
   * Contains stylesheet data and metadata for the dialog toolbar tips component
   */
  interface CSSModuleExport {
    /** Unique identifier for this CSS module */
    id: string | number;
    
    /**
     * Push CSS rules to the style collection
     * @param data - Tuple containing module ID and CSS content string
     */
    push(data: [string | number, string]): void;
  }

  /**
   * CSS Class Names exported by this module
   */
  export interface DialogToolbarTipsStyles {
    /** Main container for dialog toolbar tips (fixed position, centered) */
    dialogToolbarTips: string;
    
    /** Individual toolbar tip item container */
    itemToolbarTip: string;
    
    /** SVG icon wrapper element */
    svgItem: string;
    
    /** Text content wrapper */
    itemTxt: string;
    
    /** Bold text style for emphasized content */
    boldItemFont: string;
    
    /** Utility class to hide elements */
    hide: string;
    
    /** Checkbox component with scale lock feature (v2) */
    checkbox_lock_scale_v2: string;
  }

  /**
   * CSS Loader Factory Function
   * @param sourceMap - Enable/disable source map generation for debugging
   * @returns CSS module export object with push method
   */
  type CSSLoaderFactory = (sourceMap: boolean) => CSSModuleExport;

  const styles: DialogToolbarTipsStyles;
  export default styles;
}