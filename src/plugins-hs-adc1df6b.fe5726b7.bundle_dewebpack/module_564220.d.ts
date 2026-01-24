/**
 * CSS module loader type definition
 * Module: module_564220
 * Original ID: 564220
 * 
 * This module exports CSS styles for property bar roof components including:
 * - Normal input fields with custom width
 * - Number input components with alignment
 * - Button styling with icon spacing
 * - Thickness input container padding
 */

/**
 * CSS Module Loader Function Type
 * Represents a webpack-style CSS loader that processes and injects styles
 * 
 * @param exports - The module exports object to attach the CSS content
 * @param require - Module require function (unused in this context)
 * @param cssLoader - CSS loader utility function from webpack
 */
declare module 'module_564220' {
  /**
   * CSS Loader Utility Function
   * Processes CSS content and returns an array with module metadata
   * 
   * @param sourceMap - Whether to include source maps (false in this case)
   * @returns CSS loader instance with push method
   */
  interface CSSLoader {
    (sourceMap: boolean): CSSLoaderInstance;
  }

  /**
   * CSS Loader Instance
   * Provides methods to register CSS content with module information
   */
  interface CSSLoaderInstance {
    /**
     * Registers CSS content with module ID
     * @param entry - Tuple containing module ID and CSS string
     */
    push(entry: [string, string]): void;
  }

  /**
   * Module Exports Interface
   * Contains the processed CSS content and module metadata
   */
  interface ModuleExports {
    /** Module identifier */
    id: string;
    /** Processed CSS content as string */
    toString(): string;
  }

  /**
   * CSS Content
   * Styles for property bar roof components:
   * 
   * .property-bar-roof-normal-input.property-bar-length-input-wrapper .property-bar-length-input .length-input
   *   - width: 100px
   * 
   * .property-bar-roof-normal-input .homestyler-numberinput.homestyler-ui-components .homestyler-numberinput-wrap .homestyler-numberinput-input
   *   - padding-left: 10px
   *   - text-align: start
   * 
   * .property-bar-roof-button .homestyler-ui-components.ant-btn
   *   - line-height: 30px
   *   - height: 30px
   * 
   * .property-bar-roof-button .homestyler-ui-components.ant-btn .hs-iconfont-view
   *   - margin-right: 0.34em
   * 
   * .property-bar-roof-button .hs-iconfont-view .hover-icon-bg .anticon
   *   - transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1)
   * 
   * .property-bar-roof-thickness-input .tp-select-container-value
   *   - padding-left: 5px
   */
  const cssContent: ModuleExports;
  
  export = cssContent;
}