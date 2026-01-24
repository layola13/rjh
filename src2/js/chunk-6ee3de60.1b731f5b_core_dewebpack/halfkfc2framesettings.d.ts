/**
 * Half KFC2 Frame Settings Module
 * Extends FrameSettings to provide specialized frame configuration for half KFC2 style frames
 */

import { FrameSettings } from './FrameSettings';
import { Polygon } from './Polygon';
import { View } from './View';
import { FrameManager } from './FrameManager';
import { Layer } from './Layer';
import { MomentoManager } from './MomentoManager';

/**
 * Frame interface representing a frame entity with polygon and management capabilities
 */
interface Frame {
  /** The polygon shape of the frame */
  polygon: Polygon;
  /** Manager handling frame operations */
  frameManager: FrameManager;
  /** Hide assistance UI elements */
  hideAssist(): void;
}

/**
 * Polygon interface representing the geometric shape with flip capabilities
 */
interface Polygon {
  /** Whether the polygon is flipped horizontally */
  xFlip: boolean;
  /** Flip the polygon horizontally and return affected elements */
  flipX(): unknown;
  /** Set the profile size based on edge width */
  setProfileSize(edgeWidth: number): unknown;
}

/**
 * View interface representing the rendering context
 */
interface View {
  /** The currently active drawing layer */
  activeLayer: Layer;
  /** Manager for undo/redo operations */
  mometoManager: MomentoManager;
}

/**
 * Layer interface for drawing operations
 */
interface Layer {
  /** Redraw the layer in batch mode for performance */
  batchDraw(): void;
}

/**
 * Manager for momento pattern (undo/redo state management)
 */
interface MomentoManager {
  /** Save current state as a checkpoint for undo/redo */
  checkPoint(): void;
}

/**
 * Frame Manager interface for managing frame operations
 */
interface FrameManager {
  /** Get the width of a specific edge by index */
  getEdgeWidth(edgeIndex: number): number;
  /** Notify that frame has been recreated with new data */
  recreated(data: unknown, view: View): void;
}

/**
 * HalfKfc2FrameSettings class
 * Provides specialized settings and operations for half KFC2 style frames
 * including flip operations and dimension adjustments
 */
declare class HalfKfc2FrameSettings extends FrameSettings {
  /** The frame instance being configured */
  protected frame: Frame;
  /** The view context for rendering */
  protected view: View;

  /**
   * Get the polygon associated with this frame
   * @returns The frame's polygon shape
   */
  get poly(): Polygon;

  /**
   * Get the horizontal flip state of the frame's polygon
   * @returns True if the polygon is flipped horizontally
   */
  get xFlip(): boolean;

  /**
   * Set the horizontal flip state of the frame's polygon
   * When changed, triggers frame recreation, hides assists, redraws layer, and saves checkpoint
   * @param value - The new flip state
   */
  set xFlip(value: boolean);

  /**
   * Fix the inner dimensions of the frame based on edge profile size
   * Recalculates profile size using edge width at index 0
   * Triggers frame recreation, hides assists, redraws layer, and saves checkpoint
   */
  fixInnerDim(): void;
}

export { HalfKfc2FrameSettings };