/**
 * CSS Module with dynamic style injection
 * Provides CSS class name mappings and style loading functionality
 */

/** CSS module class name mappings */
export interface CSSModuleLocals {
  readonly [className: string]: string;
}

/** Style loader configuration options */
export interface StyleLoaderOptions {
  /** Transform and inject style tag into DOM */
  styleTagTransform: () => void;
  
  /** Set attributes on style elements */
  setAttributes: () => void;
  
  /** Insert style element into specified DOM location */
  insert: (target: string) => void;
  
  /** DOM manipulation API */
  domAPI: () => void;
  
  /** Create and insert style element */
  insertStyleElement: () => void;
}

/**
 * CSS module exports
 * Contains class name mappings for imported CSS
 */
declare const cssModuleExports: CSSModuleLocals | undefined;

export default cssModuleExports;

/** Re-export all named exports from the underlying CSS module */
export * from './underlying-css-module';