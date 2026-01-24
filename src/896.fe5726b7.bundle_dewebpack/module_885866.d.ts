/**
 * CSS module for draggable elements
 * Provides styles for drag-and-drop functionality with cross-browser support
 */

/**
 * CSS class definition for draggable elements
 * 
 * @remarks
 * This module exports CSS styles that enable dragging behavior:
 * - Move cursor on hover
 * - Prevents text selection during drag operations
 * - Absolute positioning for free movement
 * - Cross-browser user-select prevention
 */
declare module '*.css' {
  const styles: string;
  export default styles;
}

/**
 * Draggable element style configuration
 * 
 * @public
 */
export interface DraggableStyles {
  /**
   * CSS cursor style - displays move cursor on hover
   * @default 'move'
   */
  cursor: 'move';
  
  /**
   * Prevents text selection on WebKit browsers (Chrome, Safari)
   * @default 'none'
   */
  WebkitUserSelect: 'none';
  
  /**
   * Prevents text selection on Mozilla browsers (Firefox)
   * @default 'none'
   */
  MozUserSelect: 'none';
  
  /**
   * Standard CSS user-select property
   * @default 'none'
   */
  userSelect: 'none';
  
  /**
   * Positioning context for drag movement
   * @default 'absolute'
   */
  position: 'absolute';
}

/**
 * CSS content exported by this module
 * Contains the compiled .draggable class styles
 */
export const cssContent: string;

/**
 * Class name for draggable elements
 * @constant
 */
export const DRAGGABLE_CLASS = 'draggable';