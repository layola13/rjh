/**
 * CSS Module Exports Type Definition
 * Module ID: 595302
 * 
 * This module exports CSS styles for a hint/tooltip view component.
 * The styles define a centered flex container with icon, text, and button elements.
 */

/**
 * CSS Module Export Function Type
 * 
 * @param exports - The module exports object
 * @param require - The require function for loading dependencies
 * @param module - The webpack module loader function (ID: 986380)
 * 
 * @description
 * Exports a CSS string containing styles for:
 * - `.hint-view`: Main container with centered flex layout
 * - `.hint-view .tooltipstext`: Tooltip text container (80% width, 12px font)
 * - `.hint-view .tooltipstext .questionIcon`: Question icon with vertical alignment
 * - `.hint-view .icon`: Display block for 140x140px icons with opacity
 * - `.hint-view .btn-style`: Button styling with hover effects
 * - `.hint-view a`: Link styling with hover effects
 * - `.hint-view.min-hight`: Minimal height variant with adjusted spacing
 */
declare module '595302' {
  /**
   * CSS content string containing all style rules for the hint view component
   */
  export const cssContent: string;

  /**
   * CSS class names available in this module
   */
  export interface HintViewClasses {
    /** Main container class for the hint/tooltip view */
    'hint-view': string;
    
    /** Tooltip text content wrapper */
    'tooltipstext': string;
    
    /** Question icon element */
    'questionIcon': string;
    
    /** Icon display container (140x140px) */
    'icon': string;
    
    /** Button style with border and hover effects */
    'btn-style': string;
    
    /** Minimal height variant modifier */
    'min-hight': string;
  }

  export default cssContent;
}

/**
 * CSS Module Loader Function Signature
 * 
 * @param moduleExports - The exports object to be populated
 * @param cssLoaderModule - The CSS loader module instance
 * @param cssLoaderFunction - Factory function that creates CSS loader (returns false for non-HMR mode)
 */
type CSSModuleLoader = (
  moduleExports: { id: string | number; exports: unknown },
  cssLoaderModule: unknown,
  cssLoaderFunction: (hmrEnabled: boolean) => {
    push: (entry: [string | number, string, string?]) => void;
  }
) => void;

export default CSSModuleLoader;