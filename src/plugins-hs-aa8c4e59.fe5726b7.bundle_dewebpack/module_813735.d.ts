/**
 * CSS module export for autostyler component styles
 * @module module_813735
 * @description Contains styling definitions for autostyler buttons, modals, inputs, selects, and template panels
 */

/**
 * Webpack module factory function type
 * @param exports - The module exports object to be populated
 * @param module - The module metadata object containing id and other properties
 * @param require - The webpack require function for loading dependencies
 */
declare function moduleFactory(
  exports: Record<string, unknown>,
  module: WebpackModule,
  require: WebpackRequire
): void;

/**
 * Webpack module metadata interface
 */
interface WebpackModule {
  /** Unique module identifier */
  id: string | number;
  /** Module exports object */
  exports: Record<string, unknown>;
  /** Whether the module has been loaded */
  loaded?: boolean;
}

/**
 * Webpack require function interface
 */
interface WebpackRequire {
  /** Load a module by ID */
  (moduleId: string | number): unknown;
  /** Cache of loaded modules */
  c?: Record<string, WebpackModule>;
}

/**
 * CSS loader result interface
 */
interface CSSLoaderResult {
  /**
   * Push CSS content to the result array
   * @param content - Array containing module ID and CSS string content
   */
  push(content: [string | number, string]): void;
}

/**
 * CSS module content
 * Contains styles for:
 * - .autostyler .btn - Base button styles with rounded borders and padding
 * - .autostyler .btn.btn-primary - Primary button with blue background (#4d9bd6)
 * - .autostyler .btn.btn-default - Default button with white background and gray border
 * - .autostyler .modalCover - Fixed position modal overlay with semi-transparent background
 * - .autostyler .autostylerWarningShow - Warning state with red border
 * - .autostyler .model-input - Input field with 36px height and 14px font
 * - .autostyler .model-select - Select dropdown with custom styling
 * - .autostyler .editStylerTemplatePanel - Template panel with image buttons and controls
 */
declare const cssContent: string;

export {};