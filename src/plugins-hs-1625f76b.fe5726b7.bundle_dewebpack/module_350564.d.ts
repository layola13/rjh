/**
 * CSS Module Type Definitions
 * 
 * This module exports CSS styles for catalog popup panels, report modals, and related UI components.
 * It includes styles for masks, dialog boxes, forms, and interactive elements.
 */

/**
 * CSS loader function signature
 * @param insertIntoDocument - Whether to insert styles into the document
 * @returns Array containing module id and CSS content
 */
type CSSLoaderFunction = (insertIntoDocument: boolean) => Array<[string, string]>;

/**
 * CSS Module Export Interface
 * Represents a webpack CSS module that can be loaded and applied to the DOM
 */
interface CSSModuleExport {
  /**
   * Module identifier used by webpack
   */
  id: string;

  /**
   * Push method to register CSS content with the loader
   * @param entry - Tuple containing module id and CSS string
   */
  push(entry: [string, string]): void;
}

/**
 * CSS Loader Module Interface
 * Factory function that creates a CSS loader with specified behavior
 * 
 * @param insertIntoDocument - If true, automatically inserts CSS into document head
 * @returns CSSModuleExport instance with push method for registering styles
 */
declare function cssLoader(insertIntoDocument: boolean): CSSModuleExport;

/**
 * CSS Module Exports
 * Contains all stylesheet rules for:
 * - List reset styles (ul li)
 * - Common mask overlay (.common_mask)
 * - Catalog popup panel (.catalog_popup_panel_collection_body)
 * - Report panel modal (#catalog_popup_panel_collection #report_panel_mask)
 * - Form controls, buttons, and interactive elements
 * - Responsive and localized styles (.global-en variants)
 */
declare module '*.css' {
  const content: CSSModuleExport;
  export default content;
}

/**
 * Webpack Module Interface
 * Represents the webpack module wrapper structure
 */
interface WebpackModule {
  /**
   * Module exports object
   */
  exports: CSSModuleExport;

  /**
   * Module identifier
   */
  id: string;
}

/**
 * Module Factory Function
 * Webpack's internal module factory signature
 * 
 * @param module - The module object to populate
 * @param exports - Direct reference to module.exports
 * @param require - Webpack's require function for loading dependencies
 */
type ModuleFactory = (
  module: WebpackModule,
  exports: CSSModuleExport,
  require: (moduleId: number) => CSSLoaderFunction
) => void;

export { CSSModuleExport, CSSLoaderFunction, ModuleFactory, WebpackModule };