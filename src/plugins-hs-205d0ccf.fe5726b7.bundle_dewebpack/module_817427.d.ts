/**
 * CSS module type definitions for imagebutton component
 * Generated from module 817427
 */

/**
 * CSS Module export function signature
 * @param useSourceMap - Whether to include source maps in the CSS output
 * @returns Array containing module metadata and CSS content
 */
type CSSModuleExport = (useSourceMap: boolean) => CSSModuleResult;

/**
 * CSS Module result structure
 */
interface CSSModuleResult {
  /**
   * Pushes CSS content to the module
   * @param content - Tuple containing module ID and CSS string
   */
  push(content: [moduleId: string, css: string]): void;
}

/**
 * CSS class names available in this module
 */
interface ImageButtonStyles {
  /** Main wrapper container for the image button */
  'imagebutton-wrapper': string;
  
  /** Center element containing the button icon */
  'imagebutton-center': string;
  
  /** New feature indicator dot displayed on the status bar */
  'statusbar-new-func-dot': string;
  
  /** Triangle decorator element for the image button */
  'imagebutton-triangle': string;
}

/**
 * Module exports interface
 */
declare module '*/imagebutton.module.css' {
  const styles: ImageButtonStyles;
  export default styles;
}

/**
 * Webpack module definition
 * @param exports - Module exports object
 * @param module - Module metadata
 * @param require - Webpack require function for dependencies
 */
declare function defineModule(
  exports: Record<string, unknown>,
  module: { id: string; exports: unknown },
  require: (moduleId: number) => CSSModuleExport
): void;

export { ImageButtonStyles, CSSModuleExport, CSSModuleResult, defineModule };
export default ImageButtonStyles;