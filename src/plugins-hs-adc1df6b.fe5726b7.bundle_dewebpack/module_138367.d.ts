/**
 * CSS Module: Roofs Drawing Auxiliary 2D Styles
 * 
 * Provides styling definitions for the 2D editor container's roof drawing auxiliary layer.
 * This module exports CSS styles that are injected into the document at runtime.
 * 
 * @module RoofsDrawingAux2DStyles
 */

/**
 * CSS module exports for roofsdrawing-aux2d component styles.
 * The styles define a full-size absolutely positioned container for 2D roof drawing operations.
 */
declare module 'module_138367' {
  /**
   * CSS content array containing style definitions.
   * Format: [moduleId, cssContent, sourceMap]
   */
  const styles: [
    /** Module identifier */
    moduleId: string,
    /** CSS style rules as a string */
    cssContent: string,
    /** Source map data (empty string if not available) */
    sourceMap: string
  ];

  export default styles;
}

/**
 * Style classes available in this CSS module
 */
export interface RoofsDrawingAux2DStyles {
  /** 
   * Container class for the 2D editor 
   * Scopes the roofsdrawing-aux2d styles
   */
  'editor2dContainer': string;
  
  /**
   * Auxiliary 2D drawing layer for roofs
   * - Full width and height (100%)
   * - Absolutely positioned overlay
   */
  'roofsdrawing-aux2d': string;
}

/**
 * CSS class selector constants
 */
export const CSS_CLASSES: Readonly<{
  /** Selector: .editor2dContainer */
  EDITOR_2D_CONTAINER: '.editor2dContainer';
  /** Selector: .roofsdrawing-aux2d */
  ROOFS_DRAWING_AUX_2D: '.roofsdrawing-aux2d';
}>;