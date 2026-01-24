/**
 * CSS Module type definitions
 * Module: module_455644
 * Original ID: 455644
 */

/**
 * CSS Module exports interface
 * Represents the CSS class names exported by the module
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style loader options configuration
 */
interface StyleLoaderOptions {
  /** Transform function to apply styles to the DOM */
  styleTagTransform: () => void;
  /** Function to set attributes on style elements */
  setAttributes: () => void;
  /** Function to insert style elements into the DOM */
  insert: (target: string) => void;
  /** DOM API utilities for style manipulation */
  domAPI: () => void;
  /** Function to create and insert style elements */
  insertStyleElement: () => void;
}

/**
 * CSS Module definition
 * Contains both the module content and local class name mappings
 */
interface CSSModule {
  /** Local CSS class name mappings */
  locals?: CSSModuleLocals;
  /** Raw CSS content or style loader function */
  (): void;
}

/**
 * Default export: CSS class name mappings or undefined if no locals exist
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the CSS module (excluding 'default')
 */
export * from './css-module';