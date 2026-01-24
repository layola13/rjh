/**
 * CSS Module exports type definition
 * Represents the local class names exported from a CSS/SCSS module
 */
declare module 'module_392356' {
  /**
   * CSS module class name mappings
   * Maps original class names to their scoped equivalents
   */
  interface CSSModuleClasses {
    [className: string]: string;
  }

  /**
   * Default export containing the CSS module's local class names
   * Returns undefined if no locals are defined
   */
  const locals: CSSModuleClasses | undefined;
  
  export default locals;
  
  /**
   * Re-exported named exports from the underlying CSS module
   * Allows direct import of individual class names
   */
  export * from './base-css-module';
}

/**
 * Style loader configuration interface
 * Defines the structure for CSS injection runtime configuration
 */
interface StyleLoaderOptions {
  /**
   * Function to transform and inject style tags into the DOM
   */
  styleTagTransform: () => void;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: () => void;
  
  /**
   * Function to insert style elements into a specific DOM location
   * Bound to target container (e.g., "head")
   */
  insert: (element: HTMLElement) => void;
  
  /**
   * DOM manipulation API for style injection
   */
  domAPI: () => void;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: (element: HTMLStyleElement) => void;
}