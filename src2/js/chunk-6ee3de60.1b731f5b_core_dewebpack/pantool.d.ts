/**
 * Pan tool for canvas manipulation
 * Enables dragging functionality on the canvas view
 */

import { Tool, ToolType } from './Tool';
import type { View } from './View';

/**
 * PanTool class - Provides pan/drag functionality for canvas views
 * @extends Tool
 */
export declare class PanTool extends Tool {
  /**
   * The view instance associated with this pan tool
   */
  readonly view: View;

  /**
   * Creates a new PanTool instance
   * @param view - The view to enable panning on
   */
  constructor(view: View);
}

/**
 * Tool base class interface
 */
declare class Tool {
  /**
   * Tool type identifier
   */
  readonly type: ToolType;

  /**
   * Creates a new Tool instance
   * @param type - The type of tool
   * @param view - The view associated with this tool
   */
  constructor(type: ToolType, view: View);
}

/**
 * Enumeration of available tool types
 */
declare enum ToolType {
  pan = 'pan',
  // ... other tool types
}

/**
 * View interface - Represents a canvas view with dragging capabilities
 */
interface View {
  /**
   * Canvas element with dragging functionality
   */
  canvas: {
    /**
     * Enables or disables dragging on the canvas
     * @param enabled - Whether dragging should be enabled
     */
    draggable(enabled: boolean): void;
  };
}