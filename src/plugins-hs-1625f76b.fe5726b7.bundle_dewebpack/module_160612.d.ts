/**
 * Style loader module that handles CSS injection and exports style locals.
 * This module configures the style-loader with various transform and insertion strategies.
 */

/**
 * Configuration object for style loader operations.
 * Contains methods for DOM manipulation, style transformation, and insertion.
 */
interface StyleLoaderConfig {
  /** Transforms style tags before insertion */
  styleTagTransform: StyleTagTransformFunction;
  /** Sets attributes on style elements */
  setAttributes: SetAttributesFunction;
  /** Inserts style elements into the DOM */
  insert: InsertFunction;
  /** API for DOM operations */
  domAPI: DOMAPIFunction;
  /** Creates and returns style elements */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Function type for transforming style tags.
 */
type StyleTagTransformFunction = () => void;

/**
 * Function type for setting attributes on elements.
 */
type SetAttributesFunction = () => void;

/**
 * Function type for inserting elements into the DOM.
 * @param target - The target container (e.g., "head")
 * @param element - The element to insert
 */
type InsertFunction = (target: string, element: HTMLElement) => void;

/**
 * Function type for DOM API operations.
 */
type DOMAPIFunction = () => void;

/**
 * Function type for creating style elements.
 */
type InsertStyleElementFunction = () => HTMLStyleElement;

/**
 * CSS module locals interface.
 * Maps class names to their hashed/scoped equivalents.
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style module interface that may contain local class name mappings.
 */
interface StyleModule {
  locals?: CSSModuleLocals;
  [key: string]: unknown;
}

/**
 * Re-exported members from the style module (excluding 'default').
 */
export * from './style-module';

/**
 * Default export: CSS module locals or undefined if not available.
 * Contains the mapping of local class names to their processed values.
 */
declare const locals: CSSModuleLocals | undefined;
export default locals;