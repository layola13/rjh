/**
 * CSS Modules Type Definitions
 * 
 * This module provides type definitions for a CSS module loader configuration.
 * It handles style injection, DOM manipulation, and CSS module class name mappings.
 */

/**
 * Configuration object for style loading options
 */
export interface StyleLoaderOptions {
  /**
   * Function to transform and inject style tags into the DOM
   */
  styleTagTransform: StyleTagTransformFunction;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: SetAttributesFunction;
  
  /**
   * Function to insert style elements into a specific DOM location
   */
  insert: InsertFunction;
  
  /**
   * DOM API interface for style manipulation
   */
  domAPI: DomAPIFunction;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Transform function that processes style content before injection
 */
export type StyleTagTransformFunction = () => (css: string, style: HTMLStyleElement) => void;

/**
 * Function that sets custom attributes on style elements
 */
export type SetAttributesFunction = () => (element: HTMLElement) => void;

/**
 * Function that inserts style elements at a specific target location
 * @param target - The target selector (e.g., "head", "body")
 * @param element - The style element to insert
 */
export type InsertFunction = (target: string, element: HTMLElement) => void;

/**
 * DOM manipulation API function
 */
export type DomAPIFunction = () => {
  update: (obj: StyleObject) => void;
  remove: () => void;
};

/**
 * Function that creates and returns a style element
 */
export type InsertStyleElementFunction = () => HTMLStyleElement;

/**
 * Style object containing CSS content and metadata
 */
export interface StyleObject {
  css: string;
  media?: string;
  sourceMap?: unknown;
}

/**
 * CSS Modules class name mapping
 * Maps local class names to their hashed/scoped equivalents
 */
export interface CSSModuleClasses {
  readonly [key: string]: string;
}

/**
 * Default export - CSS module class name mappings
 * Returns undefined if no locals are defined
 */
declare const cssModuleLocals: CSSModuleClasses | undefined;

export default cssModuleLocals;

/**
 * Re-exported members from the style loader module (h/851732)
 * All named exports except 'default' are re-exported
 */
export * from './style-loader-module';