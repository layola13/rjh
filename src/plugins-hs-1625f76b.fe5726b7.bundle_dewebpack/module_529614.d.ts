/**
 * CSS Module Export Type Definition
 * Module ID: 529614
 * 
 * This module exports CSS styles for an upload cloud component.
 * The styles are processed through a CSS loader (module 986380).
 */

/**
 * CSS Loader Module Interface
 * Represents the CSS loader that processes style content
 */
interface CSSLoaderModule {
  /**
   * Creates a CSS module array
   * @param sourceMap - Whether to include source maps
   * @returns CSS module array with push method
   */
  (sourceMap: boolean): CSSModuleArray;
}

/**
 * CSS Module Array Interface
 * Extends Array to include CSS content with module metadata
 */
interface CSSModuleArray extends Array<[string, string]> {
  /**
   * Adds CSS content to the module
   * @param content - Tuple containing module ID and CSS string
   */
  push(content: [string, string]): void;
}

/**
 * Webpack Module Context
 * Standard webpack module parameters
 */
interface WebpackModuleContext {
  /** Module exports object */
  exports: unknown;
  /** Module ID */
  id: string;
}

/**
 * Module require function type
 * @param moduleId - The ID of the module to require
 * @returns The required module
 */
type RequireFunction = (moduleId: number) => CSSLoaderModule;

/**
 * Upload Cloud Component Styles Module
 * 
 * Exports CSS styles for a drag-and-drop cloud upload interface with:
 * - Hover effects with background color transitions
 * - Centered flex layout for upload icon and text
 * - Responsive styling for upload icon, title, and description
 * - Hidden file input element
 * 
 * @param module - Webpack module context containing exports and ID
 * @param exports - Module exports object (unused, accessed via module.exports)
 * @param require - Webpack require function for loading dependencies
 */
declare function uploadCloudStylesModule(
  module: WebpackModuleContext,
  exports: unknown,
  require: RequireFunction
): void;

export default uploadCloudStylesModule;

/**
 * CSS Classes exported by this module:
 * 
 * @property {string} upload-cloud - Main container with border, padding, and hover effects
 * @property {string} upload-cloud:hover - Hover state with background color change
 * @property {string} icon - Upload icon styling (80x80px)
 * @property {string} upload-file-type - File type title text (16px, bold, dark color)
 * @property {string} upload-file-desc - File description text (12px, light weight, gray color)
 * @property {string} upload-file-input - Hidden file input element
 */
export interface UploadCloudStyles {
  'upload-cloud': string;
  icon: string;
  'upload-file-type': string;
  'upload-file-desc': string;
  'upload-file-input': string;
}