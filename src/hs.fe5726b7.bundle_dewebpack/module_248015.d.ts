/**
 * Style loader module - handles CSS/style injection and management
 * Provides style transformation, DOM insertion, and local class name exports
 */

/**
 * Configuration object for style injection
 */
interface StyleLoaderOptions {
  /** Transform function to apply style tags to the DOM */
  styleTagTransform: StyleTagTransformFunction;
  
  /** Function to set attributes on style elements */
  setAttributes: SetAttributesFunction;
  
  /** Function to insert style elements into the DOM */
  insert: InsertFunction;
  
  /** DOM API utilities for style manipulation */
  domAPI: DOMAPIFunction;
  
  /** Function to create and insert style elements */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Transforms and applies style tags
 */
type StyleTagTransformFunction = () => (css: string, styleElement: HTMLStyleElement) => void;

/**
 * Sets attributes on style elements
 */
type SetAttributesFunction = () => (element: HTMLElement) => void;

/**
 * Inserts elements into a specific DOM location
 * @param target - Target selector (e.g., "head")
 * @param element - Element to insert
 */
type InsertFunction = (target: string, element: HTMLElement) => void;

/**
 * DOM manipulation API for styles
 */
type DOMAPIFunction = () => (options: unknown) => void;

/**
 * Creates and inserts style elements into the DOM
 */
type InsertStyleElementFunction = () => (element: HTMLElement) => void;

/**
 * CSS Modules locals object containing class name mappings
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * Style module with optional CSS Modules locals
 */
interface StyleModule {
  /** CSS Modules class name mappings, if available */
  locals?: CSSModuleLocals;
}

/**
 * Default export - CSS Modules locals or undefined
 * Contains the transformed class names when CSS Modules are enabled
 */
declare const styleLocals: CSSModuleLocals | undefined;

export default styleLocals;

/**
 * Re-exports all named exports from the style module (excluding 'default')
 */
export * from './style-module';