/**
 * Style loader module type definitions
 * Handles CSS module imports and style injection
 */

/**
 * CSS Module exports interface
 * Contains locally scoped class names from the imported stylesheet
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style loader options configuration
 */
export interface StyleLoaderOptions {
  /**
   * Transform function to apply to style tags before insertion
   */
  styleTagTransform: () => (css: string, styleElement: HTMLStyleElement) => void;
  
  /**
   * Function to set custom attributes on style elements
   */
  setAttributes: () => (element: HTMLElement) => void;
  
  /**
   * Insertion function to specify where style elements should be injected
   * @param target - Target selector (e.g., "head", "body")
   */
  insert: (target: string) => (element: HTMLElement) => void;
  
  /**
   * DOM API implementation for style manipulation
   */
  domAPI: () => {
    update: (obj: unknown) => void;
    remove: (obj: unknown) => void;
  };
  
  /**
   * Function to create and insert style elements into the DOM
   */
  insertStyleElement: () => (options: unknown) => HTMLStyleElement;
}

/**
 * CSS Module with locals (scoped class names)
 * Default export contains the locally scoped class name mappings
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;

/**
 * Re-exported members from the base CSS module
 * Allows access to all named exports except 'default'
 */
export * from './base-css-module';