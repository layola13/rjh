/**
 * CSS module export type definition
 * @module module_645243
 * @description Defines the structure for a CSS-in-JS module that exports stylesheet content
 */

/**
 * Webpack CSS loader module factory function
 * @param exports - The module exports object
 * @param module - The current module object
 * @param require - The webpack require function for loading dependencies
 */
declare module 'module_645243' {
  /**
   * Module exports interface
   */
  interface ModuleExports {
    /** Module unique identifier */
    id: string | number;
    
    /** 
     * Push method to add CSS content to the stylesheet collection
     * @param content - Array containing module ID and CSS string
     */
    push(content: [string | number, string]): void;
  }

  /**
   * Webpack require function type
   * @param moduleId - The ID of the module to require
   * @returns Module exports with push method
   */
  type WebpackRequire = (moduleId: number) => (api: boolean) => ModuleExports;

  /**
   * Float button CSS styles
   * @description Contains all styling rules for a floating action button component with hover/expand states
   */
  interface FloatButtonStyles {
    /** Base float button container styles */
    '.float-button': {
      display: 'flex';
      height: '30px';
      alignItems: 'center';
      maxWidth: '30px';
      overflow: 'hidden';
      transition: 'all 0.3s ease';
      borderRadius: '30px';
      color: '#fff';
      cursor: 'pointer';
    };
    
    /** Hover state - expands button to show full content */
    '.float-button:hover': {
      maxWidth: '500px';
    };
    
    /** Expanded state class - programmatically expanded button */
    '.float-button.expand': {
      maxWidth: '500px';
    };
    
    /** Icon element - main button icon with drag capability */
    '.float-button .icon': {
      height: '20px';
      width: '20px';
      marginLeft: '5px';
      flex: 'none';
      cursor: 'move';
    };
    
    /** Text label element */
    '.float-button .text': {
      marginLeft: '5px';
      fontFamily: 'AlibabaPuHuiTi-Bold';
      fontSize: '12px';
      lineHeight: '16px';
      flex: 'none';
    };
    
    /** Right-side action icon with circular background */
    '.float-button .right-icon': {
      marginLeft: '14px';
      marginRight: '8px';
      width: '14px';
      height: '14px';
      borderRadius: '7px';
      backgroundColor: '#fff';
      display: 'flex';
      alignItems: 'center';
      justifyContent: 'center';
      flex: 'none';
    };
  }

  /**
   * CSS module content as string
   */
  const cssContent: string;

  export default cssContent;
  export type { FloatButtonStyles, ModuleExports, WebpackRequire };
}