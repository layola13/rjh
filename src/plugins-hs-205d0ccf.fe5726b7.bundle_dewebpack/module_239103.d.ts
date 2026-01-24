/**
 * CSS Module Type Definitions
 * 
 * This module provides type definitions for a CSS-in-JS module that uses
 * style-loader to inject styles into the DOM at runtime.
 */

/**
 * Style injection configuration object
 * Contains all necessary functions and settings for injecting styles into the DOM
 */
interface StyleLoaderConfig {
  /** Transform function to process style tags before insertion */
  styleTagTransform: StyleTagTransformFunction;
  
  /** Function to set attributes on style elements */
  setAttributes: SetAttributesFunction;
  
  /** Function to insert style elements into the DOM */
  insert: InsertFunction;
  
  /** DOM API utilities for style manipulation */
  domAPI: DomAPIFunction;
  
  /** Function to create and insert style elements */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Transforms style tag content before insertion
 */
type StyleTagTransformFunction = () => (css: string, styleElement: HTMLStyleElement) => void;

/**
 * Sets attributes on style elements
 */
type SetAttributesFunction = () => (element: HTMLStyleElement) => void;

/**
 * Inserts style elements into a specific location in the DOM
 * @param target - The target selector or element (e.g., "head")
 * @param element - The style element to insert
 */
type InsertFunction = (target: string, element: HTMLStyleElement) => void;

/**
 * Provides DOM manipulation utilities for styles
 */
type DomAPIFunction = () => {
  update: (obj: StyleObject) => void;
  remove: (obj: StyleObject) => void;
};

/**
 * Creates and inserts a style element
 */
type InsertStyleElementFunction = () => HTMLStyleElement;

/**
 * Represents a style object with CSS content and metadata
 */
interface StyleObject {
  /** The CSS content as a string */
  css: string;
  
  /** Media query for the styles */
  media?: string;
  
  /** Source map for debugging */
  sourceMap?: string | object;
}

/**
 * CSS Module locals/exports
 * Contains class name mappings from source to generated names
 */
interface CSSModuleLocals {
  [className: string]: string;
}

/**
 * CSS Module with metadata
 */
interface CSSModule extends Array<StyleObject | string | number> {
  /** CSS module class name mappings */
  locals?: CSSModuleLocals;
  
  /** Module identifier */
  id?: string;
}

/**
 * Default export - CSS module class name mappings or undefined
 */
declare const cssModule: CSSModuleLocals | undefined;

export default cssModule;

/**
 * Re-exported members from the CSS module
 * All named exports from the source CSS module are available here
 */
export * from './styles.module.css';