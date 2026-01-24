/**
 * CSS Modules loader configuration and style injection setup.
 * This module handles the injection of CSS styles into the document head
 * and exports the CSS module's local class name mappings.
 */

/**
 * Configuration object for style loading operations.
 * Contains methods for DOM manipulation, style transformation, and element insertion.
 */
interface StyleLoaderConfig {
  /** Transforms and applies style tags to the document */
  styleTagTransform: StyleTagTransformFunction;
  
  /** Sets attributes on style elements */
  setAttributes: SetAttributesFunction;
  
  /** Inserts style elements into a specified DOM location */
  insert: InsertFunction;
  
  /** Provides DOM manipulation APIs */
  domAPI: DOMAPIFunction;
  
  /** Creates and inserts style elements into the document */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Function that transforms and applies styles to the document.
 */
type StyleTagTransformFunction = () => void;

/**
 * Function that sets attributes on style elements.
 */
type SetAttributesFunction = () => void;

/**
 * Function that inserts elements into the DOM at a specified location.
 * @param target - The target location for insertion (e.g., "head")
 */
type InsertFunction = (target: string) => void;

/**
 * Function providing DOM manipulation APIs.
 */
type DOMAPIFunction = () => void;

/**
 * Function that creates and inserts style elements.
 */
type InsertStyleElementFunction = () => void;

/**
 * CSS Module locals object containing class name mappings.
 * Maps original class names to their scoped/hashed versions.
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS Module export object that may contain local class name mappings.
 */
interface CSSModuleExport {
  /** Local class name mappings for CSS modules */
  locals?: CSSModuleLocals;
  
  [key: string]: unknown;
}

/**
 * Re-exported members from the CSS module (excluding 'default').
 * Contains all named exports from the imported style module.
 */
export * from './styles.module.css';

/**
 * Default export: CSS Module locals or undefined.
 * Returns the local class name mappings if available, otherwise undefined.
 */
declare const cssModuleLocals: CSSModuleLocals | undefined;

export default cssModuleLocals;