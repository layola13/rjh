/**
 * CSS Module type definitions
 * This module provides CSS Modules functionality with style injection capabilities
 */

/**
 * Style loader API interface for managing CSS injection
 */
interface StyleLoaderAPI {
  /** Transform and inject style tags into the document */
  styleTagTransform: StyleTagTransformFunction;
  /** Set attributes on style elements */
  setAttributes: SetAttributesFunction;
  /** Insert styles into specified DOM location */
  insert: InsertFunction;
  /** DOM manipulation API */
  domAPI: DOMAPIFunction;
  /** Create and insert style elements */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Function to transform style content before injection
 */
type StyleTagTransformFunction = (css: string, style: HTMLStyleElement) => void;

/**
 * Function to set attributes on style elements
 */
type SetAttributesFunction = (element: HTMLStyleElement, attributes: Record<string, string>) => void;

/**
 * Function to insert style elements into the DOM
 * @param target - DOM insertion point (e.g., "head")
 * @param element - Style element to insert
 */
type InsertFunction = (target: string, element: HTMLStyleElement) => void;

/**
 * DOM API for style manipulation
 */
type DOMAPIFunction = (element: HTMLStyleElement, options: StyleOptions) => void;

/**
 * Function to create and insert style elements
 */
type InsertStyleElementFunction = (options: StyleOptions) => HTMLStyleElement;

/**
 * Options for style element creation and manipulation
 */
interface StyleOptions {
  /** Style element attributes */
  attributes?: Record<string, string>;
  /** Custom insertion logic */
  insert?: InsertFunction;
}

/**
 * CSS Module exports - maps class names to hashed identifiers
 * @example
 *