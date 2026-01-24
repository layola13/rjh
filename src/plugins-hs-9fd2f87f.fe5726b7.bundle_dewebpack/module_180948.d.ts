/**
 * CSS Module Type Definitions
 * Module ID: 180948
 * 
 * This module exports CSS styles for an SVG export dialog component.
 * The styles define a modal dialog with export options and action buttons.
 */

/**
 * CSS Module Export Function Type
 * Represents a webpack css-loader module that pushes CSS content to a style array
 */
declare module 'module_180948' {
  /**
   * CSS content tuple structure
   * [moduleId, cssContent, sourceMap?]
   */
  type CSSModuleTuple = [string, string, string?];

  /**
   * CSS Loader API interface
   * Provides methods to manage CSS module content
   */
  interface CSSLoaderAPI {
    /**
     * Push CSS content to the module
     * @param content - Tuple containing module ID, CSS string, and optional source map
     */
    push(content: CSSModuleTuple): void;
    
    /**
     * Convert the module to a string representation
     * @returns CSS content as string
     */
    toString(): string;
    
    /**
     * Module identifier
     */
    id: string;
  }

  /**
   * Module factory function signature
   * @param module - The module object with exports property
   * @param exports - The exports object (alias for module.exports)
   * @param require - The require function to load dependencies
   */
  export default function(
    module: { exports: CSSLoaderAPI; id: string },
    exports: CSSLoaderAPI,
    require: (moduleId: number) => (sourceMap: boolean) => CSSLoaderAPI
  ): void;
}

/**
 * CSS Class Names Interface
 * Describes the structure of CSS classes available in this module
 */
export interface ExportSVGDialogStyles {
  /** Main container wrapper for the export SVG dialog */
  'export-svg-dialog-wrapper': string;
  
  /** Export SVG dialog content container */
  'export-svg-dialog': string;
  
  /** Dialog title section */
  'export-svg-dialog-tit': string;
  
  /** Dialog content section */
  'export-svg-dialog-con': string;
  
  /** Left column of the dialog content */
  'export-svg-con-left': string;
  
  /** Right column of the dialog content */
  'export-svg-con-right': string;
  
  /** SVG image preview container */
  'svg-img': string;
  
  /** SVG description text */
  'svg-txt': string;
  
  /** Bottom action buttons section */
  'export-svg-dialog-bottom': string;
  
  /** Left action button container */
  'export-svg-bot-left': string;
  
  /** Right action button container */
  'export-svg-bot-right': string;
  
  /** Export action button */
  'export-btn': string;
  
  /** Clearfix utility class */
  'clearfix': string;
  
  /** Container root class */
  'container': string;
}

/**
 * CSS Module Exports
 * The actual CSS content exported by this module
 */
export const styles: ExportSVGDialogStyles;