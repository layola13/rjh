/**
 * CSS Module exports type definition
 * Handles CSS module imports with style injection and class name mappings
 */

/**
 * Style injection configuration object
 * Contains all necessary functions and settings for injecting CSS into the DOM
 */
interface StyleInjectionConfig {
  /** Transform function applied to style tags before injection */
  styleTagTransform: StyleTagTransformFunction;
  
  /** Function to set attributes on style elements */
  setAttributes: SetAttributesFunction;
  
  /** Function to insert style elements into the DOM */
  insert: InsertFunction;
  
  /** DOM manipulation API for style operations */
  domAPI: DOMAPIFunction;
  
  /** Function to create and insert style elements */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Function that transforms style content before injection
 */
type StyleTagTransformFunction = () => void;

/**
 * Function that sets attributes on style elements
 */
type SetAttributesFunction = () => void;

/**
 * Function that inserts style elements into a specific DOM location
 * @param target - The DOM location where styles should be inserted (e.g., "head")
 */
type InsertFunction = (target: string) => void;

/**
 * DOM API function for style manipulation
 */
type DOMAPIFunction = () => void;

/**
 * Function that creates and inserts style elements into the DOM
 */
type InsertStyleElementFunction = () => void;

/**
 * CSS Module locals object
 * Maps CSS class names to their hashed/scoped equivalents
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS Module export object
 * Contains both the style content and the class name mappings
 */
interface CSSModuleExport {
  /** Mapped CSS class names for this module */
  locals?: CSSModuleLocals;
  
  /** Additional module properties */
  [key: string]: unknown;
}

/**
 * Default export from the CSS module
 * Returns the locals (class name mappings) if available, otherwise undefined
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;

/**
 * Re-exported members from the CSS module
 * All named exports from the original module are re-exported here
 */
export * from 'original-css-module';