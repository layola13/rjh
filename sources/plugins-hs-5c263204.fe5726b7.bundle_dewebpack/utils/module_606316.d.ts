/**
 * CSS module exports type definition
 * @module NewGuideStyles
 * @description Type definitions for the new guide component CSS module
 */

/**
 * CSS module loader function signature
 * @param useSourceMap - Whether to include source maps in the CSS output
 * @returns CSS loader instance with push method
 */
type CSSModuleLoader = (useSourceMap: boolean) => {
  /**
   * Pushes CSS content to the module
   * @param content - Tuple containing module ID and CSS string content
   */
  push(content: [string, string]): void;
};

/**
 * Webpack module parameters
 * @param exports - Module exports object
 * @param require - Webpack require function for loading dependencies
 * @param module - Current module metadata
 */
declare module 'module_606316' {
  /**
   * Module export function
   * @param exports - The exports object to be populated
   * @param _require - Webpack require function (unused in this module)
   * @param module - Module metadata containing id and other properties
   */
  export default function(
    exports: { exports?: unknown },
    _require: unknown,
    module: { id: string }
  ): void;
}

/**
 * CSS class names available in this module
 * @interface NewGuideClassNames
 */
interface NewGuideClassNames {
  /** Main wrapper container for the new guide component */
  'new-guide-wrapper': string;
  
  /** Semi-transparent overlay mask */
  mask: string;
  
  /** Highlighted frame around the target element */
  frame: string;
  
  /** Popup tooltip container */
  popup: string;
  
  /** Popup positioned at right-top of the target */
  RightTop: string;
  
  /** Popup positioned at top-left of the target */
  TopLeft: string;
  
  /** Popup positioned at bottom-right of the target */
  BottomRight: string;
  
  /** Wrapper for mask items */
  'mask-wrapper': string;
  
  /** Individual mask item element */
  'mask-item': string;
}

/**
 * CSS Module exports
 */
declare const styles: NewGuideClassNames;
export default styles;

/**
 * Raw CSS content for the new guide component
 * @constant
 */
export const cssContent: string;

/**
 * Position variants for popup placement
 */
export type PopupPosition = 'RightTop' | 'TopLeft' | 'BottomRight';

/**
 * Z-index constant used throughout the component
 */
export const GUIDE_Z_INDEX: 8888;