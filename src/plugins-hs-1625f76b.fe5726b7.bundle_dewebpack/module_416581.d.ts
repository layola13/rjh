/**
 * CSS Module exports interface
 * Represents the type definition for a CSS module that exports class names
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
 * CSS Module with optional locals (class name mappings)
 */
interface CSSModule {
  locals?: CSSModuleLocals;
}

/**
 * Default export: CSS class name mappings from the imported stylesheet
 * Returns undefined if no local class names are defined
 */
declare const cssModuleExports: CSSModuleLocals | undefined;

export default cssModuleExports;

/**
 * Re-exported members from the CSS module (excluding 'default')
 * May include additional module-specific exports
 */
export * from './css-module-types';