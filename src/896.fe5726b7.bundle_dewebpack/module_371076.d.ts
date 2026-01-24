/**
 * CSS module exports type definition
 * Module: module_371076
 * Original ID: 371076
 */

/**
 * Represents the CSS loader API interface
 */
interface CSSLoaderAPI {
  /**
   * Pushes CSS content to the loader
   * @param content - Array containing module id and CSS string
   */
  push(content: [string | number, string]): void;
}

/**
 * CSS Module Factory Function
 * Creates a CSS loader instance and registers stylesheet content
 * 
 * @param moduleExports - The module.exports object to be populated
 * @param __unused_webpack_module - Unused webpack module parameter
 * @param requireFunction - Module require function for loading css-loader API
 */
declare function cssModuleFactory(
  moduleExports: { exports: CSSLoaderAPI },
  __unused_webpack_module: unknown,
  requireFunction: (moduleId: number) => (sourceMap: boolean) => CSSLoaderAPI
): void;

/**
 * CSS Module Exports
 * Contains styles for the autostyler component's edit view selector
 */
declare module 'module_371076' {
  /**
   * Exported CSS content for .autostyler .styleSelectViewForEdit selector
   * 
   * Styles include:
   * - Absolute positioning (top: 169px, centered horizontally)
   * - Fixed dimensions (276px × 36px)
   * - Typography settings (14px font size, 20px line height)
   * - Border and padding configuration
   * - User selection disabled
   * - 2px border radius
   */
  const content: CSSLoaderAPI;
  export = content;
}

/**
 * CSS Class Names
 */
declare namespace AutostylerStyles {
  /**
   * Style selector for edit view in autostyler component
   * Applied to dropdown/select elements in edit mode
   */
  export const styleSelectViewForEdit: string;
}

export { AutostylerStyles, cssModuleFactory };