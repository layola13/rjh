/**
 * CSS Module type definitions
 * Represents a dynamically imported CSS module with type-safe class name exports
 */

/**
 * CSS Module Locals - Type-safe class name mappings
 * Each key represents a CSS class name from the source stylesheet
 */
interface CSSModuleLocals {
  readonly [className: string]: string;
}

/**
 * Style loader configuration options
 * Defines how CSS styles are injected and managed in the DOM
 */
interface StyleLoaderOptions {
  /** Transform and inject style tags into the DOM */
  styleTagTransform: () => void;
  
  /** Set attributes on style elements */
  setAttributes: () => void;
  
  /** Insert style elements into a specific DOM location */
  insert: (target: string) => void;
  
  /** DOM manipulation API for style injection */
  domAPI: () => void;
  
  /** Create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module Export
 * The default export contains the hashed class name mappings if available
 * Returns undefined if the module has no local class names
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;

/**
 * Re-export all named exports from the original CSS module
 * Includes any additional metadata or class name groups
 */
export * from './original-css-module';