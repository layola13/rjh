/**
 * CSS module exports for feature user guide component styles
 * @module FeatureUserGuideStyles
 */

/**
 * Webpack CSS loader module function signature
 * @param exports - The module exports object
 * @param require - The webpack require function for loading dependencies
 * @param module - The current module metadata object
 */
declare module 'module_4870' {
  /**
   * CSS Module Export Function
   * Pushes CSS content to the webpack CSS loader
   * 
   * @remarks
   * This module contains styles for:
   * - Image placeholder utilities
   * - Flex centering utilities
   * - Save confirmation guide window
   * - Feature user guide component with carousel navigation
   * - Responsive guide container with icon, tip text, and state indicators
   * - Navigation arrows and footer action buttons
   */
  export default function(
    exports: {
      /** The module's unique identifier */
      id: string | number;
      /** The exports object where CSS will be attached */
      exports: unknown;
    },
    require: (moduleId: number) => CSSLoaderFunction,
    module: {
      /** The module's unique identifier */
      id: string | number;
      /** The module's exports */
      exports: unknown;
    }
  ): void;

  /**
   * CSS Loader function interface
   * @param sourceMap - Whether to include source maps (false in this case)
   * @returns Object with push method for adding CSS rules
   */
  interface CSSLoaderFunction {
    (sourceMap: boolean): CSSLoaderResult;
  }

  /**
   * CSS Loader result object
   */
  interface CSSLoaderResult {
    /**
     * Pushes a CSS module entry
     * @param entry - Tuple of [moduleId, cssContent, sourceMap?]
     */
    push(entry: [string | number, string, string?]): void;
  }

  /**
   * CSS classes exported by this module
   */
  export interface FeatureUserGuideStyleClasses {
    /** Utility class for image placeholders with centered background */
    imgplaceholder: string;
    
    /** Utility class for flex centering (content, items, justify) */
    flexCenter: string;
    
    /** Container for save confirmation guide window popup */
    saveConfirmGuideWindow: string;
    
    /** Main feature user guide component wrapper */
    featureUserGuide: string;
    
    /** Guide carousel container with navigation arrows */
    guideContainer: string;
    
    /** Individual guide slide with icon, tip, and state indicators */
    guide: string;
    
    /** Space holder for guide content alignment */
    spaceHolder: string;
    
    /** Icon/image area for guide visual content (210x400px) */
    icon: string;
    
    /** Tip text area below the icon */
    tip: string;
    
    /** State indicator dots group for carousel position */
    stateGroup: string;
    
    /** Navigation arrow for carousel (37x37px) */
    arrow: string;
    
    /** Footer container for action buttons */
    footer: string;
    
    /** Action button in footer (140px width, centered text) */
    actionButton: string;
  }
}