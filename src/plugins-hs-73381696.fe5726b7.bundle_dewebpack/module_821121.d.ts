/**
 * CSS Module exports interface
 * Defines the structure of CSS class name mappings exported from a CSS/SCSS module
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style loader configuration options
 * Configuration object for webpack style-loader to inject CSS into the DOM
 */
interface StyleLoaderOptions {
  /**
   * Function to transform and insert style tags into the document
   */
  styleTagTransform: () => void;

  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;

  /**
   * Function to insert style elements into a specific DOM location
   * @param target - The target element selector or element where styles should be inserted
   */
  insert: (target: string) => void;

  /**
   * DOM API methods for style manipulation
   */
  domAPI: () => void;

  /**
   * Function to create and insert style elements
   */
  insertStyleElement: () => void;
}

/**
 * CSS Module export
 * Default export containing the CSS class name mappings (locals)
 * Returns undefined if no local class names are defined
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the original CSS module
 * Includes any named exports from the CSS module (excluding 'default')
 */
export * from './original-css-module';