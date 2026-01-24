/**
 * Module: IsoscelesTriangleFrameSettings
 * Original ID: 498
 * Exports: IsoscelesTriangleFrameSettings
 */

import { FrameSettings } from './FrameSettings';
import type { Frame } from './Frame';
import type { View } from './View';
import type { Polygon } from './Polygon';

/**
 * Settings class for isosceles triangle shaped frames.
 * Extends the base FrameSettings to provide triangle-specific properties and behaviors.
 */
export declare class IsoscelesTriangleFrameSettings extends FrameSettings {
  /**
   * Gets the polygon geometry associated with this frame.
   * @returns The polygon instance representing the triangle shape
   */
  get poly(): Polygon;

  /**
   * Gets the height of the isosceles triangle in pixels (rounded to nearest integer).
   * @returns The current height of the triangle
   */
  get height(): number;

  /**
   * Sets the height of the isosceles triangle and triggers necessary updates.
   * 
   * When the height changes:
   * - Recreates the frame with new dimensions
   * - Hides assistance guides
   * - Refreshes the total height of the shape manager
   * - Redraws the active layer
   * - Creates a checkpoint in the memento manager for undo/redo
   * 
   * @param value - The new height value in pixels
   */
  set height(value: number);

  /**
   * Reference to the frame instance this settings object manages.
   */
  frame: Frame;

  /**
   * Reference to the view instance associated with this frame.
   */
  view: View;
}

/**
 * Polygon interface representing the geometric shape.
 */
export interface Polygon {
  /**
   * Current height of the polygon in pixels.
   */
  height: number;

  /**
   * Creates a new polygon with the specified height.
   * @param newHeight - The desired height for the new polygon
   * @returns A new polygon instance with the updated height
   */
  heightTo(newHeight: number): Polygon;
}

/**
 * Frame interface representing a frame container.
 */
export interface Frame {
  /**
   * The polygon geometry of this frame.
   */
  polygon: Polygon;

  /**
   * Manager responsible for frame lifecycle operations.
   */
  frameManager: FrameManager;

  /**
   * Hides any assistance guides or overlays associated with this frame.
   */
  hideAssist(): void;
}

/**
 * FrameManager interface for managing frame lifecycle.
 */
export interface FrameManager {
  /**
   * Notifies the manager that a frame has been recreated with new geometry.
   * @param newPolygon - The newly created polygon
   * @param view - The view context for the operation
   */
  recreated(newPolygon: Polygon, view: View): void;
}

/**
 * View interface representing the canvas/viewport context.
 */
export interface View {
  /**
   * Manager for handling shapes within the view.
   */
  shapeManager: ShapeManager;

  /**
   * The currently active layer for drawing operations.
   */
  activeLayer: Layer;

  /**
   * Manager for handling undo/redo operations (memento pattern).
   */
  mometoManager: MomentoManager;
}

/**
 * ShapeManager interface for managing shapes in the view.
 */
export interface ShapeManager {
  /**
   * Recalculates and updates the total height of all shapes.
   */
  refreshTotalHeight(): void;
}

/**
 * Layer interface representing a drawing layer.
 */
export interface Layer {
  /**
   * Performs a batch redraw of all elements in this layer for better performance.
   */
  batchDraw(): void;
}

/**
 * MomentoManager interface for undo/redo functionality.
 */
export interface MomentoManager {
  /**
   * Creates a checkpoint/snapshot of the current state for undo/redo operations.
   */
  checkPoint(): void;
}