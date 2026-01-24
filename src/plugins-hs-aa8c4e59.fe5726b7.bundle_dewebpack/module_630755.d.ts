/**
 * CSS Module Loader Type Definition
 * 
 * This module exports a CSS-in-JS loader function that injects styles into the application.
 * The styles define theming and layout for an "autostyler" component with buttons, modals, 
 * form inputs, and image picker panels.
 */

/**
 * CSS module exports function signature
 * @param moduleExports - The module.exports object to be populated
 * @param moduleId - Unique identifier for this CSS module
 * @param cssLoaderFunction - The webpack CSS loader factory function (module 986380)
 */
type CSSModuleLoader = (
  moduleExports: { exports: CSSModuleExports },
  moduleId: { id: string | number },
  cssLoaderFunction: (sourceMap: boolean) => CSSLoaderInstance
) => void;

/**
 * CSS Loader instance with push method for adding CSS content
 */
interface CSSLoaderInstance {
  /**
   * Adds CSS content to the loader
   * @param content - Tuple containing module ID and CSS string
   */
  push(content: [string | number, string]): void;
}

/**
 * Module exports object containing the CSS loader instance
 */
interface CSSModuleExports {
  id: string | number;
  push(content: [string | number, string]): void;
}

/**
 * CSS content for the autostyler component
 * 
 * Includes styles for:
 * - Button components (.btn, .btn-primary, .btn-default)
 * - Modal overlay (.modalCover)
 * - Form inputs (.model-input, .model-select)
 * - Image picker panel (.pickImagePanel)
 * - Warning states (.autostylerWarningShow)
 */
declare const cssContent: string;

export default CSSModuleLoader;
export { CSSModuleExports, CSSLoaderInstance };