import { FrameSettings } from './FrameSettings';
import { RegularPolygon } from './RegularPolygon';
import { Frame } from './Frame';
import { View } from './View';

/**
 * Settings for regular polygon frames.
 * Extends base FrameSettings to provide polygon-specific configuration.
 */
export declare class RegularFrameSettings extends FrameSettings {
  /**
   * Gets the polygon instance associated with this frame.
   * @returns The regular polygon object
   */
  poly(): RegularPolygon;

  /**
   * Gets or sets the number of edges for the regular polygon.
   * Minimum value is 3. Setting this property triggers frame recreation
   * and view updates.
   */
  edgesCount: number;
}

/**
 * Represents a regular polygon with configurable edge count.
 */
export interface RegularPolygon {
  /**
   * Current number of edges in the polygon.
   */
  edgeCount: number;

  /**
   * Changes the number of edges and returns the updated frame.
   * @param count - New edge count (must be >= 3)
   * @returns The updated frame instance
   */
  changeEdgesCount(count: number): Frame;
}

/**
 * Frame manager responsible for handling frame lifecycle events.
 */
export interface FrameManager {
  /**
   * Notifies that a frame has been recreated.
   * @param frame - The recreated frame
   * @param view - The view containing the frame
   */
  recreated(frame: Frame, view: View): void;
}

/**
 * Frame object containing polygon and management functionality.
 */
export interface Frame {
  /**
   * The polygon shape of this frame.
   */
  polygon: RegularPolygon;

  /**
   * Manager for frame operations.
   */
  frameManager: FrameManager;

  /**
   * Hides assistant/guide elements for this frame.
   */
  hideAssist(): void;
}

/**
 * Layer that can be redrawn in batch mode for performance.
 */
export interface Layer {
  /**
   * Performs a batch redraw of all elements in the layer.
   */
  batchDraw(): void;
}

/**
 * Memento manager for undo/redo functionality.
 */
export interface MomentoManager {
  /**
   * Creates a checkpoint for undo/redo operations.
   */
  checkPoint(): void;
}

/**
 * View containing layers and memento management.
 */
export interface View {
  /**
   * The currently active layer in the view.
   */
  activeLayer: Layer;

  /**
   * Manager for undo/redo checkpoints.
   */
  mometoManager: MomentoManager;
}