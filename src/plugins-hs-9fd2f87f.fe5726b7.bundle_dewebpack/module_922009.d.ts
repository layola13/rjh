/**
 * Style loader module configuration and exports
 * Handles CSS-in-JS injection and style management
 */

/**
 * Style loader options configuration
 * Controls how styles are injected and managed in the DOM
 */
interface StyleLoaderOptions {
  /**
   * Transform function applied to style tags before insertion
   */
  styleTagTransform: StyleTagTransformFunction;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: SetAttributesFunction;
  
  /**
   * Function to insert style elements into the DOM
   * @param target - DOM selector or element where styles should be inserted
   */
  insert: InsertFunction;
  
  /**
   * DOM API abstraction for style manipulation
   */
  domAPI: DomAPIInterface;
  
  /**
   * Function to create and configure style elements
   */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Function that transforms style content before injection
 */
type StyleTagTransformFunction = () => void;

/**
 * Function that sets custom attributes on style elements
 */
type SetAttributesFunction = () => void;

/**
 * Function that handles DOM insertion of style elements
 * @param target - Target location in DOM (e.g., 'head', 'body')
 * @param element - The style element to insert
 */
type InsertFunction = (target: string, element?: HTMLElement) => void;

/**
 * Interface for DOM manipulation operations
 */
interface DomAPIInterface {
  // DOM API methods for style manipulation
}

/**
 * Function that creates and inserts style elements
 */
type InsertStyleElementFunction = () => void;

/**
 * CSS module with optional locals (class name mappings)
 */
interface CSSModule {
  /**
   * Local class name mappings for CSS modules
   * Maps original class names to generated scoped names
   */
  locals?: Record<string, string>;
}

/**
 * Re-exported types and utilities from the underlying CSS module
 */
export * from './underlying-css-module';

/**
 * Default export: CSS module locals or undefined
 * Contains the scoped class name mappings if CSS modules are enabled
 */
declare const cssModuleLocals: Record<string, string> | undefined;

export default cssModuleLocals;