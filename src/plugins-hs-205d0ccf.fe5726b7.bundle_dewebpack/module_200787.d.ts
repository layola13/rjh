/**
 * CSS Module type definitions
 * This module handles CSS-in-JS style injection and exports CSS module class names
 */

/**
 * CSS module class names mapping
 * Maps semantic class names to their hashed/scoped equivalents
 */
declare const cssModuleClasses: Record<string, string> | undefined;

export default cssModuleClasses;

/**
 * Re-exported members from the style loader module
 * These are typically internal style-loader utilities that may be exposed
 */
export * from './style-loader-module';

/**
 * Configuration for style injection into the DOM
 */
interface StyleInjectionConfig {
  /**
   * Transform function applied to style tags before insertion
   */
  styleTagTransform: StyleTagTransform;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: SetAttributesFunction;
  
  /**
   * Function to insert style elements into the DOM
   * Bound to insert into the document head
   */
  insert: InsertFunction;
  
  /**
   * DOM API utilities for style manipulation
   */
  domAPI: DOMAPIUtilities;
  
  /**
   * Function to create and configure style elements
   */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Transforms style content before injection
 */
type StyleTagTransform = (css: string, styleElement: HTMLStyleElement) => void;

/**
 * Sets custom attributes on style elements
 */
type SetAttributesFunction = (element: HTMLStyleElement, options?: Record<string, string>) => void;

/**
 * Inserts style elements into a target container
 */
type InsertFunction = (element: HTMLStyleElement) => void;

/**
 * DOM manipulation utilities for style handling
 */
interface DOMAPIUtilities {
  update: (element: HTMLStyleElement, css: string) => void;
  remove: (element: HTMLStyleElement) => void;
}

/**
 * Creates and inserts a style element with given CSS
 */
type InsertStyleElementFunction = (options: { css: string }) => HTMLStyleElement;