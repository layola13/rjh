/**
 * CSS Module Type Definitions
 * 
 * This module provides type definitions for dynamically imported CSS modules
 * that are processed by style-loader and other CSS processing utilities.
 */

/**
 * Style injection configuration options
 * Defines how CSS styles are injected into the DOM
 */
interface StyleInjectionOptions {
  /**
   * Transform function applied to style tags before insertion
   * Handles style tag manipulation and processing
   */
  styleTagTransform: StyleTagTransformFunction;

  /**
   * Function to set attributes on style elements
   * Configures style tag attributes like data-*, nonce, etc.
   */
  setAttributes: SetAttributesFunction;

  /**
   * Insertion strategy for style elements
   * Typically bound to a specific DOM location (e.g., 'head')
   */
  insert: InsertFunction;

  /**
   * DOM API interface for style manipulation
   * Provides methods for creating and updating style elements
   */
  domAPI: DOMAPIFunction;

  /**
   * Factory function to create style elements
   * Generates the actual <style> or <link> elements
   */
  insertStyleElement: InsertStyleElementFunction;
}

/**
 * Function type for transforming style tags
 */
type StyleTagTransformFunction = () => void;

/**
 * Function type for setting element attributes
 */
type SetAttributesFunction = () => void;

/**
 * Function type for inserting styles into the DOM
 * @param target - The DOM location where styles should be inserted
 */
type InsertFunction = (target: string) => void;

/**
 * Function type for DOM manipulation API
 */
type DOMAPIFunction = () => void;

/**
 * Function type for creating style elements
 */
type InsertStyleElementFunction = () => void;

/**
 * CSS Module exports structure
 * Contains the processed CSS class mappings
 */
interface CSSModuleExports {
  /**
   * Local CSS class name mappings
   * Maps original class names to scoped/hashed class names
   * 
   * @example
   *