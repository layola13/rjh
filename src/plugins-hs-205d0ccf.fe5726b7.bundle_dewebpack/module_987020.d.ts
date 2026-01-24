/**
 * CSS module definition for zoom view component
 * Contains styles for zoom controls including buttons and slider
 */

/**
 * Webpack CSS loader module function signature
 * @param exports - Module exports object
 * @param require - Webpack require function for loading dependencies
 * @param module - Webpack module metadata object
 */
declare module 'module_987020' {
  /**
   * Module exports interface
   */
  interface ModuleExports {
    /** Module identifier */
    id: string | number;
    
    /** CSS content array */
    exports: CSSModuleExport;
  }

  /**
   * CSS module export structure
   */
  interface CSSModuleExport extends Array<CSSRule> {
    /**
     * Push CSS rules to the module
     * @param rule - CSS rule tuple containing module ID and CSS content
     */
    push(rule: CSSRule): void;
  }

  /**
   * CSS rule tuple format
   * [moduleId, cssContent, sourceMap?]
   */
  type CSSRule = [string | number, string, string?];

  /**
   * CSS loader factory function type
   * @param sourceMap - Whether to include source maps
   * @returns CSS module export object
   */
  type CSSLoaderFactory = (sourceMap: boolean) => CSSModuleExport;

  /**
   * Webpack require function type
   * @param moduleId - Module identifier to require
   * @returns Loaded module (CSS loader factory in this case)
   */
  type WebpackRequire = (moduleId: number) => CSSLoaderFactory;

  /**
   * Main module function signature
   * @param module - Webpack module object with exports
   * @param exports - Direct exports object (unused in this module)
   * @param require - Webpack require function
   */
  export default function (
    module: { id: string | number; exports: CSSModuleExport },
    exports: unknown,
    require: WebpackRequire
  ): void;
}

/**
 * CSS class names exported by this module
 */
declare module 'module_987020/classes' {
  export interface ZoomViewStyles {
    /** Main wrapper container for zoom view (152px × 30px) */
    'zoom-view-wrapper': string;
    
    /** Content container with flexbox layout */
    'zoom-view-content': string;
    
    /** Image button wrapper with fixed width and margins */
    'imagebutton-wrapper': string;
    
    /** Right-side zoom-in button with left margin */
    'right-zoomin-button': string;
    
    /** Slider bar wrapper container */
    'slider-bar-wrapper': string;
    
    /** Slider bar component */
    'slider-bar': string;
    
    /** Slider wrapper with 84px width */
    'slider-wrapper': string;
  }

  const styles: ZoomViewStyles;
  export default styles;
}