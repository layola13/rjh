/**
 * CSS Module Type Definitions
 * Module: module_153525
 * 
 * This module provides CSS-in-JS functionality with style injection capabilities.
 */

/**
 * Style injection configuration options
 * Defines how styles are inserted and managed in the DOM
 */
export interface StyleLoaderOptions {
  /**
   * Function to transform and apply style tags to the DOM
   */
  styleTagTransform: StyleTagTransformFunction;
  
  /**
   * Function to set attributes on style elements
   */
  setAttributes: SetAttributesFunction;
  
  /**
   * Function to insert style elements into specified container
   */
  insert: InsertFunction;
  
  /**
   * DOM manipulation API interface
   */
  domAPI: DOMAPIFunction;
  
  /**
   * Function to create and insert style elements
   */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Transforms and injects CSS content into style tags
 */
export type StyleTagTransformFunction = () => (css: string, styleElement: HTMLStyleElement) => void;

/**
 * Sets custom attributes on style elements
 */
export type SetAttributesFunction = () => (element: HTMLElement, attributes?: Record<string, string>) => void;

/**
 * Inserts a style element into a specified DOM location
 * @param target - Target container selector or element (e.g., "head", "body")
 * @param element - The style element to insert
 */
export type InsertFunction = (target: string, element: HTMLStyleElement) => void;

/**
 * Provides DOM manipulation utilities for style management
 */
export type DOMAPIFunction = () => {
  update: (element: HTMLStyleElement) => void;
  remove: (element: HTMLStyleElement) => void;
};

/**
 * Creates and returns a new style element
 */
export type InsertStyleElementFunction = () => (options: { target: string }) => HTMLStyleElement;

/**
 * CSS Module locals object
 * Contains class name mappings from source to hashed names
 */
export interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS Module with metadata
 * Standard structure returned by css-loader
 */
export interface CSSModule {
  /**
   * Scoped class name mappings
   */
  locals?: CSSModuleLocals;
  
  /**
   * CSS content as string or array
   */
  toString(): string;
  
  /**
   * Module identifier
   */
  i?: (modules: unknown[], mediaQuery?: string, dedupe?: boolean) => void;
}

/**
 * Default export: CSS module locals or undefined
 * When CSS modules are enabled, exports the class name mappings.
 * Otherwise, exports undefined.
 */
declare const cssModuleExport: CSSModuleLocals | undefined;

export default cssModuleExport;

/**
 * Re-exported utilities from the base CSS module
 * Allows consumers to access underlying CSS module functionality
 */
export * from './base-css-module';